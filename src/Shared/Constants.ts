/// <reference types="vite-svg-loader" />

import good from '../Components/icons/Good.svg?url';
import great from '../Components/icons/Great.svg?url';
import best from '../Components/icons/Best.svg?url';
import excellent from '../Components/icons/Excellent.svg?url';
import briliant from '../Components/icons/Briliant.svg?url';
import mistake from '../Components/icons/Mistake.svg?url';
import inaccuracy from '../Components/icons/Inaccuracy.svg?url';
import miss from '../Components/icons/Miss.svg?url';
import blunder from '../Components/icons/Blunder.svg?url';
import book from '../Components/icons/Book.svg?url';

export enum MoveClassification {
  good = 'good',
  best = 'best',
  miss = 'miss',
  blunder = 'blunder',
  great = 'great',
  excellent = 'excellent',
  mistake = 'mistake',
  inaccuracy = 'inaccuracy',
  briliant = 'briliant',
  book = 'book',
}

export const MoveClassificationIcons = {
  [MoveClassification.good]: good,
  [MoveClassification.best]: best,
  [MoveClassification.miss]: miss,
  [MoveClassification.great]: great,
  [MoveClassification.blunder]: blunder,
  [MoveClassification.mistake]: mistake,
  [MoveClassification.inaccuracy]: inaccuracy,
  [MoveClassification.briliant]: briliant,
  [MoveClassification.book]: book,
  [MoveClassification.excellent]: excellent,
};

export const MoveClassificationColors = {
  [MoveClassification.good]: '#96af8b',
  [MoveClassification.best]: '#95bb4a',
  [MoveClassification.miss]: '#ee6b55',
  [MoveClassification.great]: '#5c8bb0',
  [MoveClassification.blunder]: '#ca3431',
  [MoveClassification.mistake]: '#e58f2a',
  [MoveClassification.inaccuracy]: '#f0c15c',
  [MoveClassification.briliant]: '#1baca6',
  [MoveClassification.book]: '#a88865',
  [MoveClassification.excellent]: '#96bc4b',
};
