import _ from 'lodash';

import { SCORE_TO_NUMBER } from '_constants/session';
import {
  DELETE_CARD_SUCCESS,
  DELETE_DECK_SUCCESS,
  DELETE_SET_SUCCESS,
  EDIT_CARD_LINK_SUCCESS,
  GET_CARDS_SUCCESS,
  GET_DECKS_SUCCESS,
  GET_LANGUAGES_SUCCESS,
  GET_SETS_SUCCESS,
  RATE_CARD_SUCCESS,
  TRActions,
} from 'actions';

export interface Set {
  deck: number;
  id: number;
  name: string;
  owner: string;
  card_ids: string;
}

export interface Deck {
  created: string;
  id: number;
  language: string;
  name: string;
  owner: string;
}

export interface Card {
  id: number;
  created: string;
  last_seen: string;
  front: string;
  back: string;
  score: string;
  audio: string;
  image: string;
  link: null | string;
}

export interface Language {
  id: number;
  abbrebiation: string;
  name: string;
}

export interface EntitiesState {
  cards: { [id: number]: Card };
  deckCards: { [deckId: number]: number[] };
  deckSets: { [deckId: number]: number[] };
  decks: { [id: number]: Deck };
  setCards: { [setId: number]: number[] };
  sets: { [id: number]: Set };
  languages: { [id: number]: Language };
}

export const initialState: EntitiesState = {
  cards: {},
  deckCards: {},
  deckSets: {},
  decks: {},
  languages: {},
  setCards: {},
  sets: {},
};

export default (state: EntitiesState = initialState, action: TRActions) => {
  switch (action.type) {
    case GET_CARDS_SUCCESS:
      const cardMap = action.payload.cards.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: cur }),
        {},
      );

      return {
        ...state,
        cards: {
          ...state.cards,
          ...cardMap,
        },
        deckCards: {
          ...state.deckCards,
          [action.payload.deckId]: action.payload.cards.map(({ id }) => id),
        },
      };

    case GET_DECKS_SUCCESS:
      const deckMap = action.payload.decks.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: cur }),
        {},
      );

      return {
        ...state,
        decks: {
          ...state.decks,
          ...deckMap,
        },
      };

    case GET_SETS_SUCCESS:
      const setMap = action.payload.sets.reduce(
        (acc, cur) => ({ ...acc, [cur.id]: cur }),
        {},
      );

      const setCardsMap = action.payload.sets.reduce(
        (acc, cur) => ({
          ...acc,
          [cur.id]: cur.card_ids.split(',')
            .map(id => parseInt(id, 10))
            .filter(id => Boolean(state.cards[id])),
        }),
        {},
      );

      return {
        ...state,
        deckSets: {
          ...state.deckSets,
          [action.payload.deckId]: action.payload.sets.map(({ id }) => id),
        },
        setCards: {
          ...state.setCards,
          ...setCardsMap,
        },
        sets: {
          ...state.sets,
          ...setMap,
        },
      };

    case DELETE_DECK_SUCCESS:
      return {
        ...state,
        decks: _.omit(state.decks, action.payload.deckId),
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: _.omit(state.cards, action.payload.cardId),
        deckCards: Object.keys(state.deckCards).map(key => parseInt(key, 10)).reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: state.deckCards[cur].filter(id => id !== action.payload.cardId),
          }),
          {},
        ),
        setCards: Object.keys(state.setCards).map(key => parseInt(key, 10)).reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: state.setCards[cur].filter(id => id !== action.payload.cardId),
          }),
          {},
        ),
      };

    case DELETE_SET_SUCCESS:
      return {
        ...state,
        deckSets: Object.keys(state.deckSets).map(key => parseInt(key, 10)).reduce(
          (acc, cur) => ({
            ...acc,
            [cur]: state.deckSets[cur].filter(id => id !== action.payload.setId),
          }),
          {},
        ),
        sets: _.omit(state.sets, action.payload.setId),
      };

    case EDIT_CARD_LINK_SUCCESS: {
      const { cardId, link } = action.payload;
      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: state.cards[cardId] ? {
            ...state.cards[cardId],
            link,
          } : undefined,
        },
      };
    }

    case RATE_CARD_SUCCESS: {
      const { cardId, rating } = action.payload;

      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: state.cards[cardId] ? {
            ...state.cards[cardId],
            score: state.cards[cardId].score.split(',').concat(
              [`${SCORE_TO_NUMBER[rating]}`],
            ).join(','),
          } : undefined,
        },
      };
    }

    case GET_LANGUAGES_SUCCESS:
      return {
        ...state,
        languages: action.payload.languages.reduce(
          (acc, cur) => ({
            ...acc,
            [cur.id]: cur,
          }),
          {} as { [key: number]: Language },
        ),
      };

    default:
      return state;
  }
};
