import { ATTEMPT_LOGIN, LOGIN_FAILED, LOGIN_SUCCESS } from 'actions';
import authentication, { initialState } from './authentication';

describe('the authentication reducer', () => {
  it('should set loading state on login attempts', () => {
    expect(authentication(
      initialState,
      {
        payload: { username: 'foo', password: 'bar' },
        type: ATTEMPT_LOGIN,
      },
    )).toEqual({ loading: true });
  });

  it('should clear loading state and login info on failed attempts', () => {
    expect(authentication(
      {
        ...initialState,
        loading: true,
        token: 'abc123',
        username: 'foo',
      },
      {
        type: LOGIN_FAILED,
      },
    )).toEqual({
      loading: false,
      token: undefined,
      username: undefined,
    });
  });

  it('should clear loading state and set login info on successful attempts', () => {
    expect(authentication(
      { ...initialState, loading: true },
      {
        payload: { username: 'foo', token: 'abc123' },
        type: LOGIN_SUCCESS,
      },
    )).toEqual({
      loading: false,
      token: 'abc123',
      username: 'foo',
    });
  });
});
