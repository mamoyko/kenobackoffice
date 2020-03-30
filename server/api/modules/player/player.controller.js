import passport from 'passport'
import PlayerModel from './player.model';
import UserModel from '../user/user.model';
import { getJWTFunc } from '../../utils/jwt'
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

    _addPlayer = async (req,res,next) => {
        let data = req.body.player;
        let player = await PlayerModel.create(data);
        res.json(player);
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

    _signInPlayers = async (req,res,next) => {
        let player = req.body.player;
        console.log(player)
        if (player) {
            let newPlayer = await PlayerModel.findOne({
                username : player.username
            });
            if (!newPlayer) {
                res.json({message:'player not found', success: false})
            } else {
                let isMatch = await bcrypt.compare(player.password,newPlayer.password);
                if (isMatch){
                    res.json({
                        data : newPlayer,
                        success: true
                    })
                } else {
                    res.json({
                        message: 'invalid password',
                        success: false
                    })
                }
            }
        }
    }

}


export default new PlayerController();