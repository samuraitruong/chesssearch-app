import { Chess } from 'chess.js';

export function parsePGN(pgn: string) {
  try {
    const gameData: any = {};
    const tagsRegex = /\[([A-Za-z]+)\s+"([^"]+)"\]/g;

    const tagsMatches = [...pgn.matchAll(tagsRegex)];
    tagsMatches.forEach((match) => {
      const key = match[1];
      const value = match[2];
      gameData[key] = value;
    });

    const lastLine = pgn
      .trim()
      .split('\n')
      .filter((x) => !x.startsWith('['))
      .join(' ');
    console.log(lastLine);
    if (lastLine) {
      const moves = lastLine
        .split(' ')
        .map((x) => x.split('.').pop())
        .filter(
          (x) =>
            x &&
            x !== '' &&
            !x.includes('.') &&
            !['1-0', '0-1', '1/2-1/2'].includes(x)
        )
        .filter(Boolean);

      gameData.moves = moves;
      const game = new Chess();
      for (const move of moves) {
        try {
          if (move) {
            game.move(move.replace('#', ''));
          }
        } catch (err) {
          console.log('Error parsing game', pgn);
          console.log(moves);
          // throw err;
          break;
        }
      }
      gameData.fen = game.fen();
    }
    if (gameData.Date) {
      gameData.EventDate = gameData.Date;
      gameData.Year = gameData.Date.split('.')[0];
    }
    return gameData;
  } catch (err) {
    return {
      error: true,
    };
  }
}
