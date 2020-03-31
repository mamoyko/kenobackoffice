import betModel from './bet.model';
import PlayerModel from '../player/player.model';

class BetController {

    _getBets = async(req,res,next) => {
        try {
            let bet = await betModel.find({}).populate('player')
            res.json({data:bet});
        } catch(err){
            console.log({err:true,message: err})
        }
    }

    _getBetsById = async (req,res,next) => {
        try {
            let bet = await betModel.find({player:req.params.id}).populate('player')
            res.json(bet);
        } catch(err){
            console.log({err:true,message: err})
        }
    }

    _addBet = async (req,res,next) => {
        try {
            let bet = req.body;
            let player = await PlayerModel.findById(req.body.player);
            bet.playerBalance = player.balance;
            let newPlayer = await betModel.create(bet);
            res.json(newPlayer)
        } catch(err){
            console.log({err:true,message: err})
        }
    }
    

}


export default new BetController();