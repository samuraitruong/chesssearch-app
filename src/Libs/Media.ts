import type { Move } from 'chess.js';

export const playSound = (move: Move) => {
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
