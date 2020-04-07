const getRandomIntInclusive = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const payTable = [
  [0, 1],
  [0, 1, 2],
  [0, 1, 2, 3],
  [0, 1, 2, 3, 6],
  [0, 1, 2, 3, 6, 9],
  [0, 1, 2, 3, 6, 9, 12],
  [0, 1, 2, 3, 6, 9, 12, 15],
  [0, 1, 2, 3, 6, 9, 12, 15, 18],
  [0, 1, 2, 3, 6, 9, 12, 15, 18, 21],
  [0, 1, 2, 3, 6, 9, 12, 15, 18, 21, 24],
  [0, 1, 2, 3, 6, 9, 12, 15, 18, 21, 24, 28]
];

const pick10 = () => {
  return new Promise((resolve, reject) => {
    const picks = [];
    while (picks.length < 20) {
      const pick = getRandomIntInclusive(1, 80);
      if (!picks.includes(pick)) picks.push(pick);
    }
    resolve(picks);
  })
};

const getMatches = (pick10s, spots) => {
  return new Promise((resolve, reject) => {
    const matched = [];
    spots.forEach(spot => {
      if (pick10s.includes(spot)) matched.push(spot);
    });
    resolve(matched);
  })
};

const getWinAmount = (numPicked, numMatched, wager) => payTable[numPicked][numMatched] * wager;

module.exports = { pick10, getMatches, getWinAmount };