import { combineEpics, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { BASE_URI } from '_constants/api';
import { DECKS_SCREEN, LOGIN_SCREEN } from '_constants/screens';
import {
  ATTEMPT_LOGIN,
  AuthenticationActions,
  LOGIN_SUCCESS,
  REGISTER,
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
            catchError((e: Error) => of(AuthenticationActions.registrationFailed(e.message))),
          ),
      ),
    );

export default combineEpics(
  attemptLoginEpic,
  loginSuccessEpic,
  registrationEpic,
);
