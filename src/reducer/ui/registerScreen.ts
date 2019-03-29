import {
  REGISTER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  TRActions,
} from 'actions';

export interface RegisterScreenState {
  loading: boolean;
}

export const initialState: RegisterScreenState = {
  loading: false,
};

export default (state: RegisterScreenState = initialState, action: TRActions) => {
  switch (action.type) {
    case REGISTER:
      return {
        ...state,
        loading: true,
      };

    case REGISTRATION_FAILED:
      return {
        ...state,
        loading: false,
      };

    case REGISTRATION_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};
