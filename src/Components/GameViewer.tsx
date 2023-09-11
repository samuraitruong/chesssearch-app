import { useEffect, useState, useRef, useMemo } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess, Move, Square } from 'chess.js';
import { LuChevronFirst, LuDownload, LuChevronLast } from 'react-icons/lu';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { PiSpeakerHigh, PiSpeakerX } from 'react-icons/pi';
import { useStockfish } from '../Hooks/useStockfish';
import useViewport from '../Hooks/useViewport';
import { ReviewedMove, StockfishLine } from '../Hooks/StockfishEngine';
import ReviewLoading from './ReviewLoading';
import { MdReviews } from 'react-icons/md';
import ReviewSummary from './ReviewSummary';
import { partitionListIntoPairs } from '../Libs/Utils';

const SF_DEPTH = 18;

interface IReplayProps {
  data: {
    Game: string;
    White: string;
    Black: string;
    WhiteElo: string;
    BlackElo: string;
    Event: string;
    Site: string;
    Pgn: string;
    Moves: string[];
    LastPosition: string;
    Year: string;
    Result: string;
    ECO: string;
    fen?: string;
  };
}

const playSound = (move: Move) => {
  let audioType = move.color === 'w' ? 'move-self' : 'move-opponent';
  if (move.san.includes('x')) {
    audioType = 'capture';
  }

  if (move.san.includes('+')) {
    audioType = 'move-check';
  }
  if (move.san.includes('=')) {
    audioType = 'promote';
  }
  if (move.san.includes('-')) {
    audioType = 'castle';
  }

  if (move.san.includes('#')) {
    audioType = 'game-end';
  }

  const fileCDN =
    'https://images.chesscomfiles.com/chess-themes/sounds/_MP3_/default';
  new Audio(`${fileCDN}/${audioType}.mp3`).play();
};
export function GameViewer({ data }: IReplayProps) {
  const blackElo = useRef<HTMLDivElement>();
  const whiteElo = useRef<HTMLDivElement>();
  const [eloText, setEloText] = useState('0.0');
  const [arrow, setArrow] = useState<Square[][]>([]);
  const [moveList, setMoveList] = useState<ReviewedMove[]>([]);
  const { engine, gameData, reviewData, reviewStatus } = useStockfish();
  const { height, width } = useViewport();

  const [currentMoveIndex, setCurrentMoveIndex] = useState(
    data.Moves.length - 1
  );
  const [fen, setFen] = useState(data.fen || data.LastPosition);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setMute] = useState(false);

  const boardSize = useMemo(
    () => Math.min(height - 200, width - 400),
    [width, height]
  );
  function moveTo(index: number) {
    if (index < 0) {
      return;
    }
    if (index > moveList.length - 1) {
      return;
    }
    setCurrentMoveIndex(index);
  }

  useEffect(() => {
    if (reviewData) {
      setMoveList(reviewData.moves);
    }
  }, [reviewData]);
  useEffect(() => {
    engine?.findBestMove(data.fen || data.LastPosition, SF_DEPTH);
  }, [engine, data.LastPosition, data.fen]);

  useEffect(() => {
    const item: any = moveList[currentMoveIndex];
    if (item) {
      if (!isMute) {
        playSound(item);
      }
      engine?.findBestMove(item.after, SF_DEPTH);
      if (item.best) {
        const bestmove: string = item.best.bestmove.bestmove || '';
        setArrow([
          [
            bestmove.substring(0, 2) as Square,
            bestmove.substring(2, 4) as Square,
          ],
        ]);
      }
      setFen(item.after);
    }
    if (currentMoveIndex >= moveList.length) {
      setIsPlaying(false);
    }
  }, [currentMoveIndex, isMute, moveList]);
  useEffect(() => {
    if (gameData && gameData.bestmove && gameData.position) {
      // console.log('Update Elo bar', gameData);
      const [, player] = gameData.position.split(' ');
      const bestMove = gameData.lines.find((x: StockfishLine) =>
        x.pv.startsWith(gameData.bestmove.bestmove)
      );
      if (!bestMove) {
        return;
      }
      const score = bestMove.score.value / 100;
      // console.log('player', bestMove, player, score);

      let p = Math.min(50, (score / 8) * 50);
      p = Math.max(-50, p);
      p = bestMove.winChance;
      if (bestMove.score.type === 'mate') {
        p = (100 * bestMove.score.value) / Math.abs(bestMove.score.value);
        setEloText(`M${bestMove.score.value.toFixed(0)}`);
      } else {
        setEloText(Math.abs(score).toFixed(1));
      }
      if (whiteElo.current && blackElo.current) {
        if (player === 'w') {
          whiteElo.current.style.height = p + '%';
          blackElo.current.style.height = 100 - p + '%';
        } else {
          whiteElo.current.style.height = 100 - p + '%';
          blackElo.current.style.height = p + '%';
        }
      }
    }
  }, [gameData]);

  useEffect(() => {
    let intervalId: number = 0;

    if (isPlaying) {
      intervalId = setInterval(() => {
        if (currentMoveIndex < moveList.length) {
          setCurrentMoveIndex((previousCount) => previousCount + 1);
        }

        if (currentMoveIndex === moveList.length) {
          clearInterval(intervalId);
          setIsPlaying(false);
        }
      }, 1000);
    } else {
      if (intervalId) clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying, moveList.length, currentMoveIndex]);

  useEffect(() => {
    const simulateGame = new Chess();
    // const mockedMoves = `1. e4 e5 2. Nf3 Bc5 $6 3. d4 $9 exd4 4. Nxd4 Nf6 5. Nf5 $6 g6 $2 6. Ng7+ Kf8 $1 7. Bh6 $1
    // Kg8 $1 8. Bc4 $2 d5 $1 9. exd5 $6 Ng4 10. Qd2 Nxh6 11. Qxh6 Qe7+ $6 12. Kf1 $2 Bd4 $6 13.
    // d6 $6 Qf6 14. Ne8 $2 Qxf2# 0-1`;

    // const mockedMove = mockedMoves
    //   .replace(/\r/, '')
    //   .split(' ')
    //   .filter((x) => x.trim())
    //   .filter(
    //     (x) =>
    //       !x.includes('$') &&
    //       !x.includes('.') &&
    //       !['1-0', '0-1', '*', '1/2-1/2'].includes(x)
    //   );
    // console.log(mockedMove);
    for (const move of data.Moves) {
      simulateGame.move(move.replace('#', ''));
    }
    setMoveList(simulateGame.history({ verbose: true }) as any);
  }, [data.Moves]);
  useEffect(() => {
    const handleKeyPress = (e: any) => {
      if (e.key === 'ArrowRight') {
        moveTo(currentMoveIndex + 1);
      }
      if (e.key === 'ArrowLeft') {
        moveTo(currentMoveIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [currentMoveIndex]);
  const togglePlay = () => {
    if (!isPlaying && currentMoveIndex >= data.Moves.length - 1) {
      setCurrentMoveIndex(0);
    }
    setIsPlaying(!isPlaying);
  };
  const toggleSpeaker = () => {
    setMute(!isMute);
  };
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([data.Pgn], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = data.Game.trim() + '.pgn'; // Change the filename as needed
    document.body.appendChild(element);
    element.click();
  };

  const pairMoves = partitionListIntoPairs(moveList);

  const getClassName = (m: ReviewedMove) => {
    return 'move-classification-' + m.playedMove?.classification || '';
  };

  return (
    <div>
      <div className="pt-3 text-center font-semibold">
        {data.White} ({data.WhiteElo}) vs {data.Black} ({data.BlackElo}) -{' '}
        {data.Result} in {data.Event} - {data.Year}
      </div>
      <div className="pt-1 text-center mb-3">{data.ECO}</div>

      <div className="flex">
        <div className="elo-bar" style={{ height: boardSize }}>
          <span className="absolute text-xs p-1 text-white">{eloText}</span>
          <div
            className="w-full h-[50%] bg-black-100 transition-height duration-300 ease-linear"
            ref={blackElo as any}
          ></div>
          <div
            className="w-full h-[50%] bg-green-500 transition-height duration-300 ease-linear"
            ref={whiteElo as any}
          ></div>
        </div>

        <div className="flex flex-col">
          <Chessboard
            position={fen}
            boardWidth={boardSize}
            customArrows={arrow}
            customArrowColor="#11d954"
          />
          <div className="flex w-full justify-center mt-3 items-center">
            <button onClick={() => moveTo(0)} className="p-3 cursor-pointer">
              <LuChevronFirst />
            </button>
            <button
              onClick={() => moveTo(currentMoveIndex - 1)}
              className="p-3 cursor-pointer"
            >
              <GrPrevious />
            </button>
            <button onClick={togglePlay} className="p-3 cursor-pointer">
              {isPlaying ? (
                <BsStopFill color="red" />
              ) : (
                <BsPlayFill color="green" />
              )}
            </button>
            <button
              onClick={() => moveTo(currentMoveIndex + 1)}
              className="p-3 cursor-pointer"
            >
              <GrNext />
            </button>
            <button onClick={() => moveTo(moveList.length - 1)}>
              <LuChevronLast />
            </button>
            <button
              onClick={toggleSpeaker}
              className="ml-10 p-3 cursor-pointer"
            >
              {isMute ? (
                <PiSpeakerX color="red" />
              ) : (
                <PiSpeakerHigh color="green" />
              )}
            </button>
            <button onClick={handleDownload} className="p-3 cursor-pointer">
              <LuDownload />
            </button>

            <button
              onClick={() => engine?.reviewGame(moveList, SF_DEPTH)}
              className="p-3 cursor-pointer"
            >
              <MdReviews />
            </button>
          </div>
        </div>
        <div
          className="ml-3 flex flex-col pl-2 w-[320px] overflow-y-scroll overflow-x-hidden"
          style={{ maxHeight: height - 200 }}
        >
          {reviewData && reviewData.summary && (
            <ReviewSummary data={reviewData.summary} result={data.Result} />
          )}
          {pairMoves?.map(([white, black], index) => (
            <div
              className="flex w-full items-center border-b border-dashed border-gray-300 mb-1"
              key={index}
            >
              <span className="text-right w-[25px] block mr-2">
                {index + 1}.
              </span>
              <a
                className={`cursor-pointer  pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
                  index * 2 === currentMoveIndex
                    ? 'bg-blue-500 font-medium text-white'
                    : ''
                } ${getClassName(white)}`}
                onClick={() => moveTo(index * 2)}
              >
                {white?.san}
                {/* |{' '}
                {`${white.playedMove?.accuracy || ''} - ${
                  white.best?.accuracy || ''
                }`} */}
              </a>
              <a
                className={`cursor-pointer pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
                  index * 2 + 1 === currentMoveIndex
                    ? 'bg-blue-500 font-medium text-white'
                    : ''
                } ${getClassName(white)}`}
                onClick={() => moveTo(index * 2 + 1)}
              >
                {black?.san}
              </a>
            </div>
          ))}
        </div>
      </div>
      {reviewStatus && !reviewStatus.done && (
        <ReviewLoading data={reviewStatus} />
      )}
    </div>
  );
}
