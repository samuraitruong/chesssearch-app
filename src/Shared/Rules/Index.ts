import { ReviewedMove } from '../Model';
import { freeMaterialRule } from './freeMaterialRule';
import { inaccuracyTradeRule } from './InaccuracyTradeRule';
import { continueMateRule } from './continueMateRule';
import { forceCheckMateRule } from './forceCheckmateRule';
import { greatWinMaterial } from './greatWinMaterial';
import { hugeMaterialMiss } from './hugeMaterialMiss';
import { missMateRule } from './missMateRule';
import { winMoreMaterialAfterTrade } from './winMoreMaterial';
import { blunderQueenRule } from './blunderQueen';

export function applyReviewRules(
  input: ReviewedMove,
  previousMove: ReviewedMove
) {
  // rule will run by priority below
  return (
    blunderQueenRule(input) ||
    continueMateRule(input, previousMove) ||
    forceCheckMateRule(input) ||
    missMateRule(input) ||
    hugeMaterialMiss(input) ||
    greatWinMaterial(input) ||
    freeMaterialRule(input) ||
    inaccuracyTradeRule(input) ||
    winMoreMaterialAfterTrade(input) ||
    input
  );
}
