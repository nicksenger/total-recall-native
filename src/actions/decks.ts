import { Deck, Language } from 'reducer/entities';
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
export const GET_LANGUAGES = 'GET_LANGUAGES';
export const GET_LANGUAGES_SUCCESS = 'GET_LANGUAGES_SUCCESS';
export const GET_LANGUAGES_FAILURE = 'GET_LANGUAGES_FAILURE';
export const VIEW_DECK_DETAILS = 'VIEW_DECK_DETAILS';
export const VIEW_DECK_ITEMS = 'VIEW_DECK_ITEMS';

export const DecksActions = {
  addDeck: (name: string, language: number, username: string) =>
    createAction(ADD_DECK, { name, language, username }),
  addDeckFailed: (message: string) =>
    createAction(ADD_DECK_FAILED, { message }),
  addDeckSuccess: (deck: Deck, username: string) =>
    createAction(ADD_DECK_SUCCESS, { deck, username }),
  deleteDeck: (deckId: number) => createAction(DELETE_DECK, { deckId }),
  deleteDeckFailed: (message: string) => createAction(DELETE_DECK_FAILED, { message }),
  deleteDeckSuccess: (deckId: number) => createAction(DELETE_DECK_SUCCESS, { deckId }),
  getDecks: (username: string) => createAction(GET_DECKS, { username }),
  getDecksFailed: (message: string) =>
    createAction(GET_DECKS_FAILED, { message }),
  getDecksSuccess: (decks: Deck[]) =>
    createAction(GET_DECKS_SUCCESS, { decks }),
  getLanguages: () => createAction(GET_LANGUAGES),
  getLanguagesFailure: (message: string) => createAction(GET_LANGUAGES_FAILURE, { message }),
  getLanguagesSuccess: (languages: Language[]) =>
    createAction(GET_LANGUAGES_SUCCESS, { languages }),
  viewDeckDetails: (deck: Deck) => createAction(VIEW_DECK_DETAILS, { deck }),
  viewDeckItems: (deck: Deck) => createAction(VIEW_DECK_ITEMS, { deck }),
};

export type DecksActions = ActionsUnion<typeof DecksActions>;
