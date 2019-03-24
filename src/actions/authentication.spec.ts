import {
  ATTEMPT_LOGIN,
  AuthenticationActions,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
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
});
