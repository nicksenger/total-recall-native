import { combineEpics, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { BASE_URI } from '_constants/api';
import { DECKS_SCREEN, LOGIN_SCREEN, REGISTER_SCREEN } from '_constants/screens';
import { retrieveCredentials, saveCredentials } from '_utils/sync';
import {
  ATTEMPT_LOGIN,
  AuthenticationActions,
  LOGIN_SUCCESS,
  REGISTER,
  RETRIEVE_AUTH_INFO,
  TRActions,
} from 'actions';
import { navigate } from 'navigation/service';

export const attemptLoginEpic = (action$: Observable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof AuthenticationActions['attemptLogin']>>(ATTEMPT_LOGIN),
    mergeMap(({ payload: { username, password } }) =>
      ajax
        .post(`${BASE_URI}/api-token-auth/`, {
          format: 'json',
          password,
          username,
        })
        .pipe(
          map(({ response }) =>
            AuthenticationActions.loginSuccess(username, response.token),
          ),
          catchError(() => of(AuthenticationActions.loginFailed())),
        ),
    ),
  );

export const loginSuccessEpic = (action$: Observable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof AuthenticationActions['loginSuccess']>>(LOGIN_SUCCESS),
    tap(({ payload: { username, token } }) => saveCredentials(username, token)),
    tap(() => navigate(DECKS_SCREEN)),
    filter(() => false),
  );

export const registrationEpic = (action$: Observable<TRActions>) =>
    action$.pipe(
      ofType<TRActions, ReturnType<typeof AuthenticationActions['register']>>(REGISTER),
      mergeMap(({ payload: { username, password } }) =>
        ajax
          .post(`${BASE_URI}/users/`, {
            format: 'json',
            password,
            username,
          })
          .pipe(
            tap(() => navigate(LOGIN_SCREEN)),
            map(() =>
              AuthenticationActions.registrationSuccess(),
            ),
            catchError(() => of(AuthenticationActions.registrationFailed('failed!'))),
          ),
      ),
    );

export const retrieveAuthInfoEpic = (action$: Observable<TRActions>) =>
    action$.pipe(
      ofType<TRActions, ReturnType<typeof AuthenticationActions['retrieveAuthInfo']>>(
        RETRIEVE_AUTH_INFO,
      ),
      mergeMap(() =>
        retrieveCredentials().pipe(
          map(({ username, token }) => AuthenticationActions.loginSuccess(username, token)),
          catchError(() => {
            navigate(REGISTER_SCREEN);
            return of({ type: 'NO_OP' });
          }),
        ),
      ),
    );

export default combineEpics(
  attemptLoginEpic,
  loginSuccessEpic,
  registrationEpic,
  retrieveAuthInfoEpic,
);
