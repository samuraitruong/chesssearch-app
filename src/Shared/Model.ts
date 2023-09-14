import type { Move } from 'chess.js';
import { MoveClassification } from './Constants';

export interface GameData {
  Game: string;
  White: string;
  Black: string;
  WhiteElo: string;
  BlackElo: string;
  Event: string;
  Site: string;
  Pgn: string;
  pgn?: string;
  Moves: string[];
  moves?: string[];
  LastPosition: string;
  Year: string;
  Result: string;
  ECO: string;
  fen?: string;
  result?: string;
  year?: string;
  game?: string;
}
export interface ReviewedLine extends StockfishLine {
  elo?: number;
  description: string;
  marterial: number;
  moves: Move[];
}
export interface PieceCaptureAccumulate {
  w: string[];
  b: string[];
  wPoint: number;
  bPoint: number;
}
export interface BestMoveOutput {
  bestmove: string;
  ponder: string;
  lines: StockfishLine[];
  bestLine?: ReviewedLine;
  position?: string;
}

export interface ReviewedMoveOutput extends BestMoveOutput {
  accuracy?: number;
  classification?: MoveClassification;
}
export interface StockfishLine {
  winChance?: number;
  pv: string;
  depth: number;
  multipv: number;
  nodes: number;
  score: {
    value: number;
    type: string;
  };
}

export interface ReviewedMove extends Move {
  best: ReviewedMoveOutput;
  playedMove: ReviewedMoveOutput;
  captured_pieces: PieceCaptureAccumulate;
  index: number;
}
// https://lichess.org/page/accuracy

export interface ReviewStatus {
  done: boolean;
  total: number;
  current: number;
  depth: number;
}
export interface GameReview {
  moves: ReviewedMove[];
  summary: {
    elo: number[];
    accuracy: number[];
    mistake: number[];
    inaccuracy: number[];
    best: number[];
    good: number[];
    blunder: number[];
  };
}
