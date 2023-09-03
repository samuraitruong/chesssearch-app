import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import { LuChevronFirst, LuDownload, LuChevronLast } from 'react-icons/lu';
import { BsPlayFill, BsStopFill } from 'react-icons/bs';
import { GrPrevious, GrNext } from 'react-icons/gr';
import { PiSpeakerHigh, PiSpeakerX } from 'react-icons/pi';
import { useStockfish } from '../Hooks/useStockfish';
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
  };
}
function partitionListIntoPairs(arr) {
  return arr.reduce((result, current, index) => {
    if (index % 2 === 0) {
      result.push([current]);
    } else {
      result[Math.floor(index / 2)].push(current);
    }
    return result;
  }, []);
}

const playSound = (move) => {
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
  const [moveList, setMoveList] = useState<any[]>([]);
  const { findBestMove } = useStockfish();
  const [currentMoveIndex, setCurrentMoveIndex] = useState(
    data.Moves.length - 1
  );
  const [fen, setFen] = useState(data.LastPosition);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMute, setMute] = useState(false);

  function moveTo(index) {
    if (index < 0) {
      return;
    }
    setCurrentMoveIndex(index);
  }

  useEffect(() => {
    const item = moveList[currentMoveIndex];
    if (item) {
      if (!isMute) {
        playSound(item);
      }
      console.log('findBestMove call');
      // findBestMove(item.before);
      setFen(item.after);
    }
    if (currentMoveIndex >= moveList.length) {
      setIsPlaying(false);
    }
  }, [currentMoveIndex]);

  useEffect(() => {
    let intervalId;

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
      clearInterval(intervalId);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [isPlaying]);

  useEffect(() => {
    const simulateGame = new Chess();
    for (let move of data.Moves) {
      simulateGame.move(move);
    }
    setMoveList(simulateGame.history({ verbose: true }) as any);
  }, [data.Moves]);

  useEffect(() => {
    const handleKeyPress = (e) => {
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
  return (
    <div>
      <div className="replay-header">
        {data.White} ({data.WhiteElo}) vs {data.Black} ({data.BlackElo}) -{' '}
        {data.Result} in {data.Event} - {data.Year}
      </div>
      <div className="flex">
        <div className="board">
          <Chessboard position={fen} boardWidth={600} />
        </div>
        <div className="move-panel" style={{ maxHeight: 575 }}>
          {pairMoves?.map(([white, black], index) => (
            <div className="move-container" key={index}>
              <span className="left">{index + 1}.</span>
              <a
                className={`right ${
                  index * 2 === currentMoveIndex ? 'active' : ''
                }`}
                onClick={() => moveTo(index * 2)}
              >
                {white?.san}
              </a>
              <a
                className={`right ${
                  index * 2 + 1 === currentMoveIndex ? 'active' : ''
                }`}
                onClick={() => moveTo(index * 2 + 1)}
              >
                {black?.san}
              </a>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="control-bar">
          <button onClick={() => moveTo(0)}>
            <LuChevronFirst />
          </button>
          <button onClick={() => moveTo(currentMoveIndex - 1)}>
            <GrPrevious />
          </button>
          <button onClick={togglePlay}>
            {isPlaying ? (
              <BsStopFill color="red" />
            ) : (
              <BsPlayFill color="green" />
            )}
          </button>
          <button onClick={() => moveTo(currentMoveIndex + 1)}>
            <GrNext />
          </button>
          <button onClick={() => moveTo(moveList.length - 1)}>
            <LuChevronLast />
          </button>
          <button onClick={toggleSpeaker}>
            {isMute ? (
              <PiSpeakerX color="red" />
            ) : (
              <PiSpeakerHigh color="green" />
            )}
          </button>
          <button onClick={handleDownload}>
            <LuDownload />
          </button>
        </div>
      </div>
    </div>
  );
}
