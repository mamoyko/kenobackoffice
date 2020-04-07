import betModel from './bet.model';
import PlayerModel from '../player/player.model';
import getResponseObj from '../../utils/keno/gameplay';

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
            let bet = await betModel.find({player:req.params.id})
                .populate('player')
            res.json(bet);
        } catch(err){
            console.log({err:true,message: err})
        }
    }

    _addBet = async (req,res,next) => {
        try {
            let player = await PlayerModel.findById(req.body.id);
            if (req.body.betAmount > player.balance) {
                res.status(403).json({
                    message: 'Not Enough Balance',
                    id: 101,
                    success: false,
                });
            } else {
                if(player){
                    let data = await getResponseObj(req.body);
                    let newBet = await betModel.create(data.data);
                    res.json(newBet);
                }
            }
        } catch(err){
            console.log(err)
            res.status(403).json({
                message: 'Invalid data',
                id: 100,
                success: false,
            });
        }
    }
}


export default new BetController();