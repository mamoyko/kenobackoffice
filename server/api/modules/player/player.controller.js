import passport from 'passport'
import PlayerModel from './player.model';
import BetModel from '../bet/bet.model'
import UserModel from '../user/user.model';
import { getJWTFunc, decode } from '../../utils/jwt'
import bcrypt from "bcrypt";
import { payout } from '../../utils/keno/payout';

class PlayerController {
    
    _getPlayer = async (req,res,next) => {
        let data = await PlayerModel.find({});
        res.json({
            data:data
        })
    }

    _getPlayerById = async (req,res,next) => {
        let data = await PlayerModel.findById(req.params.id);
        res.json({data:data})
    }

    _getPlayerByAffiliate = async (req,res,next) => {
        let data = await PlayerModel.find({affiliate:req.params.id});
        res.json({data:data})
    }

    _updatePlayer = async (req,res,next) => {
        try {

            let newPlayer = await PlayerModel.findOneAndUpdate({_id : req.body.player._id}, req.body.player);
            res.json(newPlayer);

        } catch(err){
            res.json({
                err: 'error',
                message: err
            })
        }
    }

    _deletePlayer = async (req,res,next) => {
        let player = await PlayerModel.findById(req.params.id);
        player.active = false;
        let newPlayer = await player.save();
        res.json({deleted : true})
    }

    _adminAddPlayer = async (req,res,next) => {
        let data = req.body.player;
        let player = await PlayerModel.create(data);
        res.status(200).json({
            player
        })
    }


    //open client api

    _addPlayer = async (req,res,next) => {
        let data = req.body.player;
        let player = await PlayerModel.create(data);
        let token = getJWTFunc(player)
        res.status(200).json({
            accessToken : token,
            success: true
        })
    }

    _signInPlayers = async (req,res,next) => {
        let player = req.body.player;
        if (player) {
            let newPlayer = await PlayerModel.findOne({
                email : player.email
            });
            if (!newPlayer) {
                res.status(403).json({message:'player not found', success: false})
            } else {
                let isMatch = await bcrypt.compare(player.password,newPlayer.password);
                if (isMatch){
                    let token = getJWTFunc(newPlayer)
                    res.status(200).json({
                        accessToken : token,
                        success: true
                    })
                } else {
                    res.status(403).json({
                        message: 'invalid password',
                        success: false
                    })
                }
            }
        }
    }

    _verifyPlayer = async (req,res,next) => {
        try {
            let authorization =  req.headers.authorization;
            let jwt = authorization.split('Bearer ')[1]
            let decodeData = await decode(jwt);
            let player = await PlayerModel.findOne({_id:decodeData._id}).select("-address -password -affiliate -phone -date_created");
            if (player){
               res.json({
                player: player,
                payout: payout,
                maintainance: 0
               })
            } else {
                res.status(403).json({
                    message: 'Invalid data',
                    id: 103,
                    success: false,
                });
            }
        } catch(err){
            res.status(403).json({
                message: 'Invalid data',
                id: 100,
                success: false,
            });
        }
    }

    _dashboardDetails = async (req,res,next) => {
        try {
            let poolNumber = parseInt(req.query.pool);
            let betAmount = parseFloat(req.query.bet);
            let query = {"draw.keno_count": poolNumber - 1, betAmount:betAmount};
            console.log(query)
            BetModel.aggregate([
                { $match : query },
                {
                    $group: {
                        _id: "$player", 
                        totalBet: { $sum: "$betAmount" }
                    } 
                },
                {
                    $lookup:
                       {
                          from: "players",
                          localField: "_id",
                          foreignField: "_id",
                          as: "info"
                      }
                 }
            ])
            .then((result) => {
                res.json(result);
            })
        } catch(err){
            console.log(err)
            res.status.json({err:'error'});
        }
    }


}


export default new PlayerController();