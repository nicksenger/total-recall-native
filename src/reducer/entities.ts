import {
  GET_CARDS_SUCCESS,
  GET_DECKS_SUCCESS,
  GET_SETS_SUCCESS,
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

    default:
      return state;
  }
};
