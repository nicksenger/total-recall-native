import {
  ADD_SET,
  ADD_SET_FAILED,
  ADD_SET_SUCCESS,
  TRActions,
} from 'actions';

export interface AddSetScreenState {
  loading: boolean;
}

const initialState: AddSetScreenState = {
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

    default:
      return state;
  }
};
