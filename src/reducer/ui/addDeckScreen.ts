import {
  ADD_DECK,
  ADD_DECK_FAILED,
  ADD_DECK_SUCCESS,
  TRActions,
} from 'actions';

export interface AddDeckScreenState {
  loading: boolean;
}

export const initialState = {
  loading: false,
};

export default (
  state: AddDeckScreenState = initialState,
  action: TRActions,
): AddDeckScreenState => {
  switch (action.type) {
    case ADD_DECK:
      return {
        ...state,
        loading: true,
      };

    case ADD_DECK_FAILED:
      return {
        ...state,
        loading: false,
      };

    case ADD_DECK_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
