import { useEffect, useState } from 'react';
import { BestMoveOutput } from '../Shared/Model';

interface EloBarProps {
  bestMoveResult: BestMoveOutput;
  height: number;
}
export function EloBar({ bestMoveResult, height }: EloBarProps) {
  const [whiteElo, setWhiteElo] = useState(50);
  const [blackElo, setBlackElo] = useState(50);
  const [eloText, setEloText] = useState('0.0');

  useEffect(() => {
    if (bestMoveResult && bestMoveResult.bestmove && bestMoveResult.position) {
      const [, player] = bestMoveResult.position.split(' ');
      const bestMove = bestMoveResult.lines.find((x) =>
        x.pv.startsWith(bestMoveResult.bestmove)
      );
      if (!bestMove) {
        return;
      }
      const score = bestMove.score.value / 100;

      const p = bestMove.winChance;
      if (bestMove.score.type === 'mate') {
        setEloText(`M${Math.abs(bestMove.score.value).toFixed(0)}`);
      } else {
        setEloText(Math.abs(score).toFixed(1));
      }

      if (player === 'w') {
        setWhiteElo(p);
        setBlackElo(100 - p);
      } else {
        setWhiteElo(100 - p);
        setBlackElo(p);
      }
    }
  }, [bestMoveResult]);

  return (
    <div className="elo-bar my-10 relative" style={{ height }}>
      <div className="absolute text-xs w-full pt-1 text-white text-center">
        {eloText}
      </div>
      <div
        className="w-full h-[50%] bg-black-100 transition-height duration-300 ease-linear"
        style={{ height: blackElo + '%' }}
      ></div>
      <div
        className="w-full h-[50%] bg-green-500 transition-height duration-300 ease-linear"
        style={{ height: whiteElo + '%' }}
      ></div>
    </div>
  );
}
