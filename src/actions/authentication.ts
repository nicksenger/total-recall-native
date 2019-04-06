import { ActionsUnion, createAction } from './_utils';

export const ATTEMPT_LOGIN = 'AUTHENTICATION/ATTEMPT_LOGIN';
export const LOGIN_SUCCESS = 'AUTHENTICATION/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'AUTHENTICATION/LOGIN_FAILED';
export const LOGOUT = 'AUTHENTICATION/LOGOUT';
export const REGISTER = 'REGISTER';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';
export const RETRIEVE_AUTH_INFO = 'RETRIEVE_AUTH_INFO';

export const AuthenticationActions = {
  attemptLogin: (username: string, password: string) =>
    createAction(ATTEMPT_LOGIN, { username, password }),
  loginFailed: (message: string) => createAction(LOGIN_FAILED, { message }),
  loginSuccess: (username: string, token: string) =>
    createAction(LOGIN_SUCCESS, { token, username }),
  logout: () => createAction(LOGOUT),
  register: (username: string, password: string) =>
    createAction(REGISTER, { username, password }),
  registrationFailed: (message: string) => createAction(REGISTRATION_FAILED, { message }),
  registrationSuccess: () => createAction(REGISTRATION_SUCCESS),
  retrieveAuthInfo: () => createAction(RETRIEVE_AUTH_INFO),
};

export type AuthenticationActions = ActionsUnion<typeof AuthenticationActions>;
