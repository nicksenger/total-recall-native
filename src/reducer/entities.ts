import _ from 'lodash';

import {
  DELETE_CARD_SUCCESS,
  DELETE_DECK_SUCCESS,
  DELETE_SET_SUCCESS,
  GET_CARDS_SUCCESS,
  GET_DECKS_SUCCESS,
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
  deck: number;
  owner: string;
}

export interface EntitiesState {
  cards: { [id: number]: Card };
  decks: { [id: number]: Deck };
  sets: { [id: number]: Set };
}

export const initialState: EntitiesState = {
  cards: {},
  decks: {},
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

      return {
        ...state,
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
      };

    case DELETE_SET_SUCCESS:
      return {
        ...state,
        sets: _.omit(state.sets, action.payload.setId),
      };

    case RATE_CARD_SUCCESS:
      const { cardId, rating } = action.payload;

      return {
        ...state,
        cards: {
          ...state.cards,
          [cardId]: state.cards[cardId] ? {
            ...state.cards[cardId],
            score: state.cards[cardId].score.split(',').concat([`${rating}`]).join(','),
          } : undefined,
        },
      };

    default:
      return state;
  }
};
