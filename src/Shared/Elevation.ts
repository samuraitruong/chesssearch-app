import _ from 'lodash';
const round = (n: number, digit = 2) => {
  return +n.toFixed(digit);
};
export function calculateWinChange(centipawns: number) {
  const chance = Math.max(
    0,
    Math.min(100, 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * centipawns)) - 1))
  );
  return round(chance);
}

export function calculateAccuracy(
  winPercentBefore: number,
  winPercentAfter: number
) {
  const accuracy = Math.max(
    0,
    Math.min(
      100,
      103.1668 * Math.exp(-0.04354 * (winPercentBefore - winPercentAfter)) -
        3.1669
    )
  );
  return round(accuracy);
}

// export function estimatePlayPerfomance(lines: any[]) {
//   const totalCP = _.sumlines.filter(x =>x.score.type === 'cp')
// }
