import {
  ATTEMPT_LOGIN,
  AuthenticationActions,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER,
  REGISTRATION_FAILED,
  REGISTRATION_SUCCESS,
  RETRIEVE_AUTH_INFO,
} from './authentication';

describe('the authentication actions', () => {
  it('should create the ATTEMPT_LOGIN action', () => {
    const action = AuthenticationActions.attemptLogin('waldo', 'corge');
    expect(action.payload).toEqual({ username: 'waldo', password: 'corge' });
    expect(action.type).toEqual(ATTEMPT_LOGIN);
  });

  it('should create the LOGIN_FAILED action', () => {
    const action = AuthenticationActions.loginFailed();
    expect(action.type).toEqual(LOGIN_FAILED);
  });

  it('should create the LOGIN_SUCCESS action', () => {
    const action = AuthenticationActions.loginSuccess('waldo', 'abc123');
    expect(action.payload).toEqual({ username: 'waldo', token: 'abc123' });
    expect(action.type).toEqual(LOGIN_SUCCESS);
  });

  it('should create the REGISTER action', () => {
    const action = AuthenticationActions.register('waldo', 'corge');
    expect(action.payload).toEqual({ username: 'waldo', password: 'corge' });
    expect(action.type).toEqual(REGISTER);
  });

  it('should create the REGISTRATION_FAILED action', () => {
    const action = AuthenticationActions.registrationFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(REGISTRATION_FAILED);
  });

  it('should create the REGISTRATION_SUCCESS action', () => {
    const action = AuthenticationActions.registrationSuccess();
    expect(action.type).toEqual(REGISTRATION_SUCCESS);
  });

  it('should create the RETRIEVE_AUTH_INFO action', () => {
    const { type } = AuthenticationActions.retrieveAuthInfo();
    expect(type).toEqual(RETRIEVE_AUTH_INFO);
  });

  it('should create the LOGOUT action', () => {
    const { type } = AuthenticationActions.logout();
    expect(type).toEqual(LOGOUT);
  });
});
