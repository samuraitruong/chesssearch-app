import { useEffect, useState, useRef, useMemo, useCallback } from 'react';
import { Chessboard } from 'react-chessboard';
import { Square } from 'chess.js';
import { LuChevronFirst, LuDownload, LuChevronLast } from 'react-icons/lu';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { PiSpeakerHigh, PiSpeakerX } from 'react-icons/pi';
import { MdReviews } from 'react-icons/md';
import { useStockfish } from '../Hooks/useStockfish';
import useViewport from '../Hooks/useViewport';
import ReviewLoading from './ReviewLoading';
import ReviewSummary from './ReviewSummary';
import { partitionListIntoPairs, findPiecePosition } from '../Shared/Utils';
import CapturedPieces from './CapaturedPieces';
import { playSound } from '../Shared/Media';
import { CustomSquareRenderer } from './CustomSquareRenderer';
import { MoveClassification } from '../Shared/Constants';
import { GameData, ReviewedMove, StockfishLine } from '../Shared/Model';
import EloSummary from './EloSummary';
import { simulateGame } from '../Shared/Game';
import { LineReview } from './LineReview';
import MoveChart from './MoveChart';
const SF_DEPTH = import.meta.env.VITE_SF_DEPTH || 18;

interface GameViewerProps {
  data: GameData;
}

export function GameViewer({ data }: GameViewerProps) {
  const lineRefs = useRef<any>([]);
  const [currentMove, setCurrentMove] = useState<ReviewedMove>();
  const blackElo = useRef() as React.MutableRefObject<HTMLDivElement>;
  const whiteElo = useRef() as React.MutableRefObject<HTMLDivElement>;
  const [eloText, setEloText] = useState('0.0');
  const [arrow, setArrow] = useState<Square[][]>([]);
  const [moveList, setMoveList] = useState<ReviewedMove[]>([]);
  const { engine, bestMoveResult, reviewData, reviewStatus } = useStockfish();
  const { height, width } = useViewport();
  const [currentMoveIndex, setCurrentMoveIndex] = useState(
    data.Moves.length - 1
  );
  const [fen, setFen] = useState(data.fen || data.LastPosition);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setMute] = useState(false);
  const boardSize = useMemo(
    () => Math.min(height - 300, width - 400),
    [width, height]
  );

  const moveTo = useCallback(
    (index: number) => {
      if (index < 0) {
        return;
      }
      if (index > moveList.length - 1) {
        return;
      }
      setCurrentMoveIndex(index);
    },
    [moveList.length]
  );

  useEffect(() => {
    if (reviewData) {
      setMoveList(reviewData.moves);
    }
  }, [reviewData]);

  useEffect(() => {
    engine?.findBestMove(data.fen || data.LastPosition, SF_DEPTH);
  }, [engine, data.LastPosition, data.fen]);

  useEffect(() => {
    const item: ReviewedMove = moveList[currentMoveIndex];

    if (item) {
      console.log(item);
      // scrolling
      const itemRef = lineRefs.current[
        Math.floor(currentMoveIndex / 2)
      ] as HTMLDivElement;
      const rect = itemRef.getBoundingClientRect();
      if (rect.y > height - 200) {
        itemRef.scrollIntoView();
      }
      if (!isMute) {
        playSound(item);
      }
      engine?.findBestMove(item.after, SF_DEPTH);
      if (item.best) {
        const bestmove: string = item.best?.bestmove || '';
        setArrow([
          [
            bestmove.substring(0, 2) as Square,
            bestmove.substring(2, 4) as Square,
          ],
        ]);
      }
      setFen(item.after);
      setCurrentMove(item);
    }
    if (currentMoveIndex >= moveList.length) {
      setIsPlaying(false);
    }
  }, [currentMoveIndex, isMute, moveList]);

  useEffect(() => {
    if (bestMoveResult && bestMoveResult.bestmove && bestMoveResult.position) {
      const [, player] = bestMoveResult.position.split(' ');
      const bestMove = bestMoveResult.lines.find((x: StockfishLine) =>
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
  }, [bestMoveResult]);

  useEffect(() => {
    let intervalId: number = 0;

    if (isPlaying) {
      intervalId = window.setInterval(() => {
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
    const lines = simulateGame(data.Moves) as ReviewedMove[];
    setMoveList(lines);
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
  }, [currentMoveIndex, moveTo]);

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
    const file = new Blob([data.pgn || data.Pgn], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = (data.game || data.Game).trim() + '.pgn'; // Change the filename as needed
    document.body.appendChild(element);
    element.click();
  };

  const clickOnSummaryItem = (type: 'w' | 'b', cl: MoveClassification) => {
    const indexOfMove = moveList.findIndex(
      (x) => x.color === type && x.playedMove?.classification === cl
    );
    if (indexOfMove >= 0) {
      moveTo(indexOfMove);
    }
  };
  const pairMoves = partitionListIntoPairs(moveList);

  const getClassName = (m: ReviewedMove) => {
    if (!m) return '';
    return 'move-classification-' + m.playedMove?.classification || '';
  };

  const memoCustomerRender = useMemo(
    () => CustomSquareRenderer(currentMove),
    [currentMove]
  );
  const customSquare = useMemo(() => {
    const styles = {
      [currentMove?.from as Square]: { backgroundColor: '#FFA50077' },
      [currentMove?.to as Square]: { backgroundColor: '#FFA500EE' },
    };
    if (currentMove?.san.includes('+')) {
      // find the target king square
      const [checkedKing] = findPiecePosition(
        currentMove.after,
        currentMove.color === 'w' ? 'b' : 'w',
        'k'
      );
      if (checkedKing) {
        styles[checkedKing.square] = { backgroundColor: '#CC0000CC' };
      }
    }
    return styles;
  }, [currentMove]);

  return (
    <div>
      <div className="pt-1 text-center font-semibold">
        {data.Event} - {data.Site} - {data.Year || data.year}
      </div>
      <div className="pt-1 text-center">{data.ECO}</div>

      <div className="flex">
        <div className="elo-bar my-10 relative" style={{ height: boardSize }}>
          <div className="absolute text-xs w-full pt-1 text-white text-center">
            {eloText}
          </div>
          <div
            className="w-full h-[50%] bg-black-100 transition-height duration-300 ease-linear"
            ref={blackElo}
          ></div>
          <div
            className="w-full h-[50%] bg-green-500 transition-height duration-300 ease-linear"
            ref={whiteElo}
          ></div>
        </div>

        <div className="flex flex-col">
          <div
            className="text-xs font-semibold justify-center height-[38px]"
            style={{ height: 40 }}
          >
            {data.Black} ({data.BlackElo})
            <CapturedPieces
              capturedPieces={currentMove?.captured_pieces.b}
              color="w"
              point={
                (currentMove?.captured_pieces?.bPoint || 0) -
                (currentMove?.captured_pieces?.wPoint || 0)
              }
            />
          </div>
          <Chessboard
            position={fen}
            boardWidth={boardSize}
            customArrows={arrow}
            customArrowColor="#11d954"
            customSquare={currentMove?.playedMove && memoCustomerRender}
            customSquareStyles={customSquare}
          />
          <div
            className="text-xs font-semibold height-[38px] mt-1"
            style={{ height: 38 }}
          >
            {data.White} ({data.WhiteElo})
            <CapturedPieces
              capturedPieces={currentMove?.captured_pieces.w}
              color="b"
              point={
                (currentMove?.captured_pieces?.wPoint || 0) -
                (currentMove?.captured_pieces?.bPoint || 0)
              }
            />
          </div>

          <div className="flex w-full justify-center mt-3 items-center ">
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
          className="ml-3 flex flex-col pl-2 w-[400px] overflow-y-scroll overflow-x-hidden mt-5"
          style={{ maxHeight: boardSize + 100 }}
        >
          {reviewData && reviewData.summary ? (
            <>
              <MoveChart reviewData={reviewData} />

              <ReviewSummary
                data={reviewData.summary}
                result={data.Result}
                clickOnSummaryItem={clickOnSummaryItem}
              />
            </>
          ) : (
            <div className="p-3 text-3xl text-center font-bold border border-solid mb-4">
              {data.Result || data.result}
            </div>
          )}
          {pairMoves?.map(([white, black], index) => (
            <div key={index} ref={(ref) => (lineRefs.current[index] = ref)}>
              <div
                className="flex w-full items-center border-b border-dashed border-gray-300 mb-1"
                key={index}
                data-move-index={Math.round(index / 2)}
              >
                <span className="font-semibold text-right w-[25px] block mr-2">
                  {index + 1}.
                </span>
                <a
                  className={`font-semibold  cursor-pointer  pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
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
                  className={`font-semibold cursor-pointer pl-3 flex-1 hover:bg-slate-600 hover:text-white ${
                    index * 2 + 1 === currentMoveIndex
                      ? 'bg-blue-500 font-medium text-white'
                      : ''
                  } ${getClassName(black)}`}
                  onClick={() => moveTo(index * 2 + 1)}
                >
                  {black?.san}
                </a>
              </div>
              {(currentMoveIndex == index * 2 ||
                index * 2 + 1 === currentMoveIndex) &&
                currentMove?.playedMove?.bestLine && (
                  <LineReview move={currentMove} />
                )}
            </div>
          ))}

          {reviewData && reviewData.summary && (
            <EloSummary data={reviewData.summary} />
          )}
        </div>
      </div>
      {reviewStatus && !reviewStatus.done && (
        <ReviewLoading data={reviewStatus} />
      )}
    </div>
  );
}
