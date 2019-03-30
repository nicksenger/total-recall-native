import {
  DELETE_DECK,
  DELETE_DECK_FAILED,
  DELETE_DECK_SUCCESS,
  TRActions,
  VIEW_DECK,
} from 'actions';
import { Deck } from 'reducer/entities';

export interface DeckDetailsScreenState {
  loading: boolean;
  selectedDeck?: Deck;
}

export const initialState: DeckDetailsScreenState = {
  loading: false,
};

export default (
  state: DeckDetailsScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case DELETE_DECK:
      return {
        ...state,
        loading: true,
      };

    case DELETE_DECK_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_DECK_FAILED:
      return {
        ...state,
        loading: false,
      };

    case VIEW_DECK:
      return {
        ...state,
        selectedDeck: action.payload.deck,
      };

    default:
      return state;
  }
};
