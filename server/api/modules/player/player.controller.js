import passport from 'passport'
import PlayerModel from './player.model';
import UserModel from '../user/user.model';
import { getJWTFunc, decode } from '../../utils/jwt'
import bcrypt from "bcrypt";

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
            let player = await PlayerModel.findOne({_id:decodeData._id});
            res.json(player)
        } catch(err){
            res.status(403).json({
                message: 'invalid player details',
                success: false
            })
        }
    }


}


export default new PlayerController();