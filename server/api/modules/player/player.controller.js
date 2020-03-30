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

    _addPlayer = async (req,res,next) => {
        let data = req.body.player;
        let player = await PlayerModel.create(data);
        res.json(player);
    }

    _updatePlayer = async (req,res,next) => {
        
        let data = req.body.player;
        let player = await PlayerModel.findById(data._id);

        player.name = data.name;
        player.email = data.email;
        player.username = data.username;
        player.password = data.password;
        player.phone = data.phone;
        player.balance = data.balance;
        player.currency = data.currency;
        player.provider = data.provider;

        let newPlayer = await player.save();
        res.json(newPlayer)
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