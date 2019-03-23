import {
  DELETE_CARD,
  DELETE_CARD_FAILED,
  DELETE_CARD_SUCCESS,
  TRActions,
} from 'actions';

export interface CardDetailsScreenState {
  loading: boolean;
}

const initialState: CardDetailsScreenState = {
  loading: false,
};

export default (
  state: CardDetailsScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case DELETE_CARD:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_CARD_FAILED:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
