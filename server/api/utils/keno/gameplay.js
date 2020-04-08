import { pick10, getMatches, getWinAmount } from './math';
import PlayerModel from '../../../api/modules/player/player.model';
var uniqid = require('uniqid');

const getResponseObj = async (data) => {
    const arrDrawn = await pick10();
    const matchedNumbers = await getMatches(arrDrawn, data.ballSelected);
    const reward = await getWinAmount(data.ballSelected.length, matchedNumbers.length, data.betAmount);
    const player = await PlayerModel.findById(data.id);
    if (reward > 0){
      player.balance = player.balance + data.betAmount;
    } else{
      player.balance = player.balance - data.betAmount;
    }
    let newPlayer = await PlayerModel.findOneAndUpdate({_id : data.id}, player);
    return { 
        data: {
          draw: {
            hit_count: matchedNumbers.length,
            reward,
            keno_count: data.ballSelected.length,
            keno_drawn: arrDrawn,
            keno_played: data.ballSelected
          },
          betAmount: data.betAmount,
          balance: newPlayer.balance,
          winner: reward > 0,
          player: data.id,
          transaction_id: uniqid()
        },
      };
}

export default getResponseObj;
