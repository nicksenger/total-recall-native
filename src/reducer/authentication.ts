import {
  ATTEMPT_LOGIN,
  HYDRATE_CACHE,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  TRActions,
} from 'actions';

export interface AuthenticationState {
  loading: boolean;
  username?: string;
  token?: string;
}

export const initialState: AuthenticationState = {
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
    case HYDRATE_CACHE:
      return action.payload.auth ? {
        loading: false,
        token: action.payload.auth.token,
        username: action.payload.auth.username,
      } : state;

    default:
      return state;
  }
};
