import { Card } from 'reducer/entities';
import { ActionsUnion, createAction } from './_utils';

export const GET_CARDS = 'GET_CARDS';
export const GET_CARDS_SUCCESS = 'GET_CARDS_SUCCESS';
export const GET_CARDS_FAILED = 'GET_CARDS_FAILED';
export const ADD_CARD = 'ADD_CARD';
export const ADD_CARD_SUCCESS = 'ADD_CARD_SUCCESS';
export const ADD_CARD_FAILED = 'ADD_CARD_FAILED';
export const DELETE_CARD = 'DELETE_CARD';
export const DELETE_CARD_SUCCESS = 'DELETE_CARD_SUCCESS';
export const DELETE_CARD_FAILED = 'DELETE_CARD_FAILED';
export const VIEW_CARD_DETAILS = 'VIEW_CARD_DETAILS';

export const CardsActions = {
  addCard: (deckId: number, front: string, back: string) =>
  createAction(ADD_CARD, { deckId, front, back }),
  addCardFailed: (message: string) =>
    createAction(ADD_CARD_FAILED, { message }),
  addCardSuccess: (deckId: number) =>
    createAction(ADD_CARD_SUCCESS, { deckId }),
  deleteCard: (cardId: number) => createAction(DELETE_CARD, { cardId }),
  deleteCardFailed: (message: string) =>
    createAction(DELETE_CARD_FAILED, { message }),
  deleteCardSuccess: (cardId: number) => createAction(DELETE_CARD_SUCCESS, { cardId }),
  getCards: (deckId: number) => createAction(GET_CARDS, { deckId }),
  getCardsFailed: (message: string) =>
    createAction(GET_CARDS_FAILED, { message }),
  getCardsSuccess: (cards: Card[]) =>
    createAction(GET_CARDS_SUCCESS, { cards }),
  viewCardDetails: (card: Card) => createAction(VIEW_CARD_DETAILS, { card }),
};

export type CardsActions = ActionsUnion<typeof CardsActions>;
