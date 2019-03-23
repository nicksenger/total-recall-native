import {
  GET_DECKS,
  GET_DECKS_FAILED,
  GET_DECKS_SUCCESS,
  TRActions,
} from 'actions';

export interface DecksScreenState {
  decks: number[];
  loading: boolean;
}

const initialState: DecksScreenState = {
  decks: [],
  loading: false,
};

export default (
  state: DecksScreenState = initialState,
  action: TRActions,
): DecksScreenState => {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        loading: true,
      };

    case GET_DECKS_SUCCESS:
      return {
        ...state,
        decks: action.payload.decks.map(({ id }) => id),
        loading: false,
      };

    case GET_DECKS_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
