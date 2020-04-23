import { ScoreValue } from '../generated';

export const SCORE = 'SCORE';
export const PROMPT = 'PROMPT';

export const NUMBER_TO_SCORE = {
  0: ScoreValue.Zero,
  1: ScoreValue.One,
  2: ScoreValue.Two,
  3: ScoreValue.Three,
  4: ScoreValue.Four,
  5: ScoreValue.Five,
};

export const SCORE_TO_NUMBER = {
  [ScoreValue.Zero]: 0,
  [ScoreValue.One]: 1,
  [ScoreValue.Two]: 2,
  [ScoreValue.Three]: 3,
  [ScoreValue.Four]: 4,
  [ScoreValue.Five]: 5,
};
