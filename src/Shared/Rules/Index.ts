import { ReviewedMove } from '../Model';
import { freeMaterialRule } from './FreeMaterialRule';
import { inaccuracyTradeRule } from './InaccuracyTradeRule';
import { continueMateRule } from './continueMateRule';
import { forceCheckMateRule } from './forceCheckmateRule';
import { hugeMaterialMiss } from './hugeMaterialMiss';
import { missMateRule } from './missMateRule';
import { winMoreMaterialAfterTrade } from './winMoreMaterial';

export function applyReviewRules(
  input: ReviewedMove,
  previousMove: ReviewedMove
) {
  // rule will run by priority below
  return (
    continueMateRule(input, previousMove) ||
    forceCheckMateRule(input) ||
    missMateRule(input) ||
    hugeMaterialMiss(input) ||
    freeMaterialRule(input) ||
    inaccuracyTradeRule(input) ||
    winMoreMaterialAfterTrade(input) ||
    input
  );
}
