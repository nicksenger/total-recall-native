import { LanguageCode } from '_constants/languages';
import { Deck } from 'reducer/entities';
import { ActionsUnion, createAction } from './_utils';

export const ADD_DECK = 'ADD_DECK';
export const ADD_DECK_SUCCESS = 'ADD_DECK_SUCCESS';
export const ADD_DECK_FAILED = 'ADD_DECK_FAILED';
export const DELETE_DECK = 'DELETE_DECK';
export const DELETE_DECK_SUCCESS = 'DELETE_DECK_SUCCESS';
export const DELETE_DECK_FAILED = 'DELETE_DECK_FAILED';
export const GET_DECKS = 'GET_DECKS';
export const GET_DECKS_SUCCESS = 'GET_DECKS_SUCCESS';
export const GET_DECKS_FAILED = 'GET_DECKS_FAILED';
export const VIEW_DECK = 'VIEW_DECK';

export const DecksActions = {
  addDeck: (name: string, language: LanguageCode, username: string) =>
    createAction(ADD_DECK, { name, language, username }),
  addDeckFailed: (message: string) =>
    createAction(ADD_DECK_FAILED, { message }),
  addDeckSuccess: (deck: Deck) => createAction(ADD_DECK_SUCCESS, { deck }),
  deleteDeck: (deckId: number) => createAction(DELETE_DECK, { deckId }),
  deleteDeckFailed: (message: string) => createAction(DELETE_DECK_FAILED, { message }),
  deleteDeckSuccess: () => createAction(DELETE_DECK_SUCCESS),
  getDecks: (username: string) => createAction(GET_DECKS, { username }),
  getDecksFailed: (message: string) =>
    createAction(GET_DECKS_FAILED, { message }),
  getDecksSuccess: (decks: Deck[]) =>
    createAction(GET_DECKS_SUCCESS, { decks }),
  viewDeck: (deck: Deck) => createAction(VIEW_DECK, { deck }),
};

export type DecksActions = ActionsUnion<typeof DecksActions>;
