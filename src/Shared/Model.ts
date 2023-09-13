import type { Move } from 'chess.js';

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

export interface BestMoveOutput {
  bestmove: string;
  ponder: string;
  lines: StockfishLine[];
  bestLine: StockfishLine | undefined;
  position?: string;
}

export interface ReviewedMoveOutput extends BestMoveOutput {
  accuracy?: number;
  classification?: string;
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
  captured_pieces: any;
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
    accuracy: number[];
    mistake: number[];
    inaccuracy: number[];
    best: number[];
    good: number[];
    blunder: number[];
  };
}
