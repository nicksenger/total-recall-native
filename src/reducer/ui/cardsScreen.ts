import {
  DELETE_CARD_SUCCESS,
  GET_CARDS,
  GET_CARDS_FAILED,
  GET_CARDS_SUCCESS,
  TRActions,
} from 'actions';

export interface CardsScreenState {
  cards: number[];
  loading: boolean;
}

export const initialState: CardsScreenState = {
  cards: [],
  loading: false,
};

export default (
  state: CardsScreenState = initialState,
  action: TRActions,
): CardsScreenState => {
  switch (action.type) {
    case GET_CARDS:
      return {
        ...state,
        loading: true,
      };

    case GET_CARDS_SUCCESS:
      return {
        ...state,
        cards: action.payload.cards.map(({ id }) => id),
        loading: false,
      };

    case GET_CARDS_FAILED:
      return {
        ...state,
        loading: false,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter(id => id !== action.payload.cardId),
      };

    default:
      return state;
  }
};
