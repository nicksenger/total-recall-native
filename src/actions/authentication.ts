import { ActionsUnion, createAction } from './_utils';

export const ATTEMPT_LOGIN = 'AUTHENTICATION/ATTEMPT_LOGIN';
export const LOGIN_SUCCESS = 'AUTHENTICATION/LOGIN_SUCCESS';
export const LOGIN_FAILED = 'AUTHENTICATION/LOGIN_FAILED';
export const REGISTER = 'REGISTER';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILED = 'REGISTRATION_FAILED';

export const AuthenticationActions = {
  attemptLogin: (username: string, password: string) =>
    createAction(ATTEMPT_LOGIN, { username, password }),
  loginFailed: () => createAction(LOGIN_FAILED),
  loginSuccess: (username: string, token: string) =>
    createAction(LOGIN_SUCCESS, { token, username }),
  register: (username: string, password: string) =>
    createAction(REGISTER, { username, password }),
  registrationFailed: (message: string) => createAction(REGISTRATION_FAILED, { message }),
  registrationSuccess: () => createAction(REGISTRATION_SUCCESS),
};

export type AuthenticationActions = ActionsUnion<typeof AuthenticationActions>;
