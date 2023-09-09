export function calculateWinChange(centipawns: number) {
  const chance = 50 + 50 * (2 / (1 + Math.exp(-0.00368208 * centipawns)) - 1);
  return chance;
}
