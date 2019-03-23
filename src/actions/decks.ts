import { LanguageCode } from '_constants/languages';
import { Deck } from 'reducer/entities';
import { ActionsUnion, createAction } from './_utils';

export const ADD_DECK = 'ADD_DECK';
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const ADD_DECK_FAILED = 'ADD_DECK_FAILED';
export const GET_DECKS = 'GET_DECKS';
export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const GET_DECKS_FAILED = 'GET_DECKS_FAILED';

export const DecksActions = {
  addDeck: (name: string, language: LanguageCode, username: string) =>
    createAction(ADD_DECK, { name, language, username }),
  addDeckFailed: (message: string) =>
    createAction(ADD_DECK_FAILED, { message }),
  addDeckSuccess: (deck: Deck) => createAction(ADD_DECK_SUCCESS, { deck }),
  getDecks: (username: string) => createAction(GET_DECKS, { username }),
  getDecksFailed: (message: string) =>
    createAction(GET_DECKS_FAILED, { message }),
  getDecksSuccess: (decks: Deck[]) =>
    createAction(GET_DECKS_SUCCESS, { decks }),
};

export type DecksActions = ActionsUnion<typeof DecksActions>;
