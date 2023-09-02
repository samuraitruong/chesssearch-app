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
  const [currentMoveIndex, setCurrentMoveIndex] = useState(
    data.Moves.length - 1
  );
  const [fen, setFen] = useState(data.LastPosition);
  const [isPlaying, setIsPlaying] = useState(false);

  function moveTo(index) {
    setCurrentMoveIndex(index);
    // const item = moveList[index];
    // //play sound
    // // https://www.chess.com/forum/view/general/chessboard-sound-files

    // setFen(item.after);
  }

  useEffect(() => {
    const item = moveList[currentMoveIndex];
    if (item) {
      playSound(item);
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
      <div className="replay-container">
        <div className="board">
          <Chessboard position={fen} boardWidth={600} />
        </div>
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
          <button onClick={() => moveTo(0)}> Move First</button>
          <button onClick={() => moveTo(currentMoveIndex - 1)}>
            Move Previous
          </button>
          <button onClick={togglePlay}>{`${
            isPlaying ? 'Stop' : 'Play'
          }`}</button>
          <button onClick={() => moveTo(currentMoveIndex + 1)}>
            Move Next
          </button>
          <button onClick={() => moveTo(moveList.length - 1)}>Move Last</button>

          <button onClick={handleDownload}>Download PGN</button>
        </div>
      </div>
    </div>
  );
}
