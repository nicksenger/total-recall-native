import {
  ATTEMPT_LOGIN,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TRActions,
} from 'actions';

export interface AuthenticationState {
  loading: boolean;
  username?: string;
  token?: string;
}

const initialState: AuthenticationState = {
  loading: false,
};

export default (
  state: AuthenticationState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case ATTEMPT_LOGIN:
      return {
        ...state,
        loading: true,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        token: undefined,
        username: undefined,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        username: action.payload.username,
      };

    default:
      return state;
  }
};
