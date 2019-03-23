import {
  ADD_CARD,
  ADD_CARD_FAILED,
  ADD_CARD_SUCCESS,
  TRActions,
} from 'actions';

export interface AddCardScreenState {
  loading: boolean;
}

const initialState: AddCardScreenState = {
  loading: false,
};

export default (
  state: AddCardScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        loading: true,
      };

    case ADD_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_CARD_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
