import { TestScheduler } from 'rxjs/testing';

import { BASE_URI } from '_constants/api';
import { AuthenticationActions, CacheActions } from 'actions';
import * as navigationService from 'navigation/service';
import {
  attemptLoginEpic,
  loginSuccessEpic,
  logoutEpic,
  registrationEpic,
  retrieveAuthInfoEpic,
} from './authentication';

import { DECKS_SCREEN, LOGIN_SCREEN, REGISTER_SCREEN } from '_constants/screens';
import * as sync from '_utils/sync';
import { ajax, AjaxResponse } from 'rxjs/ajax';

describe('the authentication epics', () => {
  let navigateMock: jest.SpyInstance;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    navigateMock = jest.spyOn(navigationService, 'navigate');
    navigateMock.mockImplementation(() => 'mocked');
  });

  afterEach(() => {
    navigateMock.mockReset();
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

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = attemptLoginEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: AuthenticationActions.loginFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the loginSuccessEpic', () => {
    it('should navigate to the decks screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: AuthenticationActions.loginSuccess('foo', 'abc123'),
        });
        const output$ = loginSuccessEpic(action$);

        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(DECKS_SCREEN);
    });
  });

  describe('the registration epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(ajax, 'post');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the users endpoint with username and password', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: AuthenticationActions.register('foo', 'bar'),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = registrationEpic(action$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][0]).toEqual(`${BASE_URI}/users/`);
      expect(postMock.mock.calls[0][1]).toEqual({
        format: 'json',
        password: 'bar',
        username: 'foo',
      });
    });

    describe('the registration is successful', () => {
      it('should emit the registration success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.register('foo', 'bar'),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { token: 'abc123' } } as AjaxResponse,
          }));

          const output$ = registrationEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: AuthenticationActions.registrationSuccess(),
          });
        });
      });

      it('should navigate to the login page', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.register('foo', 'bar'),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { token: 'abc123' } } as AjaxResponse,
          }));

          const output$ = registrationEpic(action$);

          expectObservable(output$);
        });

        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock.mock.calls[0][0]).toEqual(LOGIN_SCREEN);
      });
    });

    describe('the registration fails', () => {
      it('should emit the registration failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.register('foo', 'bar'),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = registrationEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: AuthenticationActions.registrationFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the retrieveAuthInfo epic', () => {
    let retrieveMock: jest.SpyInstance;

    beforeEach(() => {
      retrieveMock = jest.spyOn(sync, 'retrieveCredentials');
    });

    afterEach(() => {
      retrieveMock.mockReset();
    });

    describe('the retrieval is successful', () => {
      it('should emit the hydrate cache action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.retrieveAuthInfo(),
          });

          retrieveMock.mockImplementation(() => cold('--a', {
            a: { cache: {} },
          }));

          const output$ = retrieveAuthInfoEpic(action$);

          expectObservable(output$).toBe('---a', {
            a: CacheActions.hydrateCache({}),
          });
        });
      });
    });

    describe('the retrieval fails', () => {
      it('should navigate to the registration screen', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.retrieveAuthInfo(),
          });

          retrieveMock.mockImplementation(() => cold('--#'));

          const output$ = retrieveAuthInfoEpic(action$);

          expectObservable(output$);
        });

        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock.mock.calls[0][0]).toEqual(REGISTER_SCREEN);
      });
    });
  });

  describe('the logout epic', () => {
    let clearMock: jest.SpyInstance;

    beforeEach(() => {
      clearMock = jest.spyOn(sync, 'clearCredentials');
    });

    afterEach(() => {
      clearMock.mockReset();
    });

    describe('logging out is successful', () => {
      it('should navigate to the login screen', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.logout(),
          });

          clearMock.mockImplementation(() => cold('--a'));

          const output$ = logoutEpic(action$);

          expectObservable(output$);
        });

        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock.mock.calls[0][0]).toEqual(LOGIN_SCREEN);
      });
    });

    describe('logging out fails', () => {
      it('should do nothing', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: AuthenticationActions.logout(),
          });

          clearMock.mockImplementation(() => cold('--#'));

          const output$ = logoutEpic(action$);

          expectObservable(output$);
        });

        expect(navigateMock).not.toHaveBeenCalled();
      });
    });
  });
});
