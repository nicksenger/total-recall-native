import {
  ADD_SET,
  ADD_SET_FAILED,
  ADD_SET_SUCCESS,
  GOTO_ADD_SET,
  TRActions,
} from 'actions';
import { Card } from 'reducer/entities';

export interface AddSetScreenState {
  cards: Card[];
  loading: boolean;
}

export const initialState: AddSetScreenState = {
  cards: [],
  loading: false,
};

export default (state: AddSetScreenState = initialState, action: TRActions) => {
  switch (action.type) {
    case ADD_SET:
      return {
        ...state,
        loading: true,
      };

    case ADD_SET_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case ADD_SET_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GOTO_ADD_SET:
      return {
        ...state,
        cards: action.payload.cards,
      };

    default:
      return state;
  }
};
