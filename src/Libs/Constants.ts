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
