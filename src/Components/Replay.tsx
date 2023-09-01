import React, { useEffect, useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
interface IReplayProps {
  data: any;
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

export function Replay({ data }: IReplayProps) {
  const [moveList, setMoveList] = useState<any[]>([]);
  const [currentMoveIndex, setCurrentMoveIndex] = useState(0);
  const [fen, setFen] = useState(data.LastPosition);
  const [isPlaying, setIsPlaying] = useState(false);

  function moveTo(index) {
    setCurrentMoveIndex(index);
    const item = moveList[index];
    setFen(item.after);
  }

  useEffect(() => {
    const item = moveList[currentMoveIndex];
    if (item) {
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
    setIsPlaying(!isPlaying);
  };
  const pairMoves = partitionListIntoPairs(moveList);
  return (
    <div>
      <div className="replay-header">
        {data.White} ({data.WhiteElo}) vs {data.Black} ({data.BlackElo}) -{' '}
        {data.Result}
      </div>
      <div className="replay-container">
        <Chessboard position={fen} boardWidth={550} />
        <div className="move-panel" style={{ maxHeight: 500 }}>
          {pairMoves?.map(([white, black], index) => (
            <div className="move-container" key={index}>
              <span className="left">{index + 1}.</span>
              <span
                className={`right ${
                  index * 2 === currentMoveIndex ? 'active' : ''
                }`}
                onClick={() => moveTo(index * 2)}
              >
                {white?.san}
              </span>
              <span
                className={`right ${
                  index * 2 + 1 === currentMoveIndex ? 'active' : ''
                }`}
                onClick={() => moveTo(index * 2 + 1)}
              >
                {black?.san}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="control-bar">
          <button onClick={() => moveTo(0)}>Move First</button>
          <button onClick={() => moveTo(currentMoveIndex - 1)}>
            Move Previous
          </button>
          <button onClick={togglePlay}>Play|Stop</button>
          <button onClick={() => moveTo(currentMoveIndex + 1)}>
            Move Next
          </button>
          <button>Move Last</button>
        </div>
      </div>
    </div>
  );
}
