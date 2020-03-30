import betModel from './bet.model';

class BetController {

    _getBets = async(req,res,next) => {
        let bet = await betModel.find({}).populate('player')
        res.json({data:bet});
    }

    _addBet = async(req,res,next) => {
        let bet = await betModel.create(req.body)
        res.json(bet)
    }

}


export default new BetController();