import {
  DELETE_SET,
  DELETE_SET_FAILED,
  DELETE_SET_SUCCESS,
  TRActions,
} from 'actions';

export interface SetDetailsScreenState {
  loading: boolean;
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

    default:
      return state;
  }
};
