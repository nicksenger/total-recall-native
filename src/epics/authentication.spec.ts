import { TestScheduler } from 'rxjs/testing';

import { BASE_URI } from '_constants/api';
import { AuthenticationActions } from 'actions';
import * as navigationService from 'navigation/service';
import {
  attemptLoginEpic, loginSuccessEpic,
} from './authentication';

import { DECKS_SCREEN } from '_constants/screens';
import { ajax, AjaxResponse } from 'rxjs/ajax';

describe('the authentication epics', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  describe('the login attempt epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(ajax, 'post');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to authentication endpoint with username and password', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: AuthenticationActions.attemptLogin('foo', 'bar'),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { token: 'abc123' } } as AjaxResponse,
        }));

        const output$ = attemptLoginEpic(action$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][0]).toEqual(`${BASE_URI}/api-token-auth/`);
      expect(postMock.mock.calls[0][1]).toEqual({
        format: 'json',
        password: 'bar',
        username: 'foo',
      });
    });

    describe('the login attempt is successful', () => {
      it('should emit the login success action with username and token', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.attemptLogin('foo', 'bar'),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { token: 'abc123' } } as AjaxResponse,
          }));

          const output$ = attemptLoginEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: AuthenticationActions.loginSuccess('foo', 'abc123'),
          });
        });
      });
    });

    describe('the login attempt fails', () => {
      it('should emit the login failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.attemptLogin('foo', 'bar'),
          });

          postMock.mockImplementation(() => cold('--#'));

          const output$ = attemptLoginEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: AuthenticationActions.loginFailed(),
          });
        });
      });
    });
  });

  describe('the loginSuccessEpic', () => {
    it('should navigate to the decks screen', () => {
      const navigationMock = jest.spyOn(navigationService, 'navigate');
      navigationMock.mockImplementation(() => 'mock');

      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: AuthenticationActions.loginSuccess('foo', 'abc123'),
        });
        const output$ = loginSuccessEpic(action$);

        expectObservable(output$);
      });

      expect(navigationMock).toHaveBeenCalled();
      expect(navigationMock.mock.calls[0][0]).toEqual(DECKS_SCREEN);
    });
  });
});
