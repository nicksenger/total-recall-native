import { Card } from 'reducer/entities';
import { ActionsUnion, createAction } from './_utils';

import { ScoreValue } from 'generated';
export const RATE_CARD = 'RATE_CARD';
export const RATE_CARD_SUCCESS = 'RATE_CARD_SUCCESS';
export const RATE_CARD_FAILED = 'RATE_CARD_FAILED';
export const REVEAL_CARD = 'REVEAL_CARD';
export const REVIEW_CARD = 'REVIEW_CARD';
export const STUDY = 'STUDY';

export const SessionActions = {
  rateCard: (cardId: number, rating: ScoreValue) =>
    createAction(RATE_CARD, { cardId, rating }),
  rateCardFailed: (message: string) =>
    createAction(RATE_CARD_FAILED, { message }),
  rateCardSuccess: (cardId: number, rating: ScoreValue) =>
    createAction(RATE_CARD_SUCCESS, { cardId, rating }),
  revealCard: (card: Card) => createAction(REVEAL_CARD, { card }),
  reviewCard: (rating: ScoreValue) => createAction(REVIEW_CARD, { rating }),
  study: (cards: Card[]) => createAction(STUDY, { cards }),
};

export type SessionActions = ActionsUnion<typeof SessionActions>;
