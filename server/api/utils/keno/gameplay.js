import { pick10, getMatches, getWinAmount } from './math';
var uniqid = require('uniqid');

const getResponseObj = async (data) => {
    const arrDrawn = await pick10();
    const matchedNumbers = await getMatches(arrDrawn, data.ballSelected);
    const reward = await getWinAmount(data.ballSelected.length, matchedNumbers.length, data.betAmount);
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
          winner: reward > 0,
          player: data.id,
          transaction_id: uniqid()
        },
      };
}

export default getResponseObj;
