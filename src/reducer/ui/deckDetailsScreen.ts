import {
  DELETE_DECK,
  DELETE_DECK_FAILED,
  DELETE_DECK_SUCCESS,
  TRActions,
} from 'actions';

export interface DeckDetailsScreenState {
  loading: boolean;
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

    default:
      return state;
  }
};
