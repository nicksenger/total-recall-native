import {
  DELETE_SET,
  DELETE_SET_FAILED,
  DELETE_SET_SUCCESS,
  TRActions,
  VIEW_SET_DETAILS,
} from 'actions';
import { Set } from 'reducer/entities';

export interface SetDetailsScreenState {
  loading: boolean;
  selectedSet?: Set;
}

export const initialState: SetDetailsScreenState = {
  loading: false,
};

export default (
  state: SetDetailsScreenState = initialState,
  action: TRActions,
): SetDetailsScreenState => {
  switch (action.type) {
    case DELETE_SET:
      return {
        ...state,
        loading: true,
      };

    case DELETE_SET_FAILED:
      return {
        ...state,
        loading: false,
      };

    case DELETE_SET_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case VIEW_SET_DETAILS:
      return {
        ...state,
        selectedSet: action.payload.set,
      };

    default:
      return state;
  }
};
