import { ActionsObservable, combineEpics, ofType } from 'redux-observable';
import { of } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { BASE_URI } from '_constants/api';
import { DECKS_SCREEN } from '_constants/screens';
import {
  ATTEMPT_LOGIN,
  AuthenticationActions,
  LOGIN_SUCCESS,
  TRActions,
} from 'actions';
import { navigate } from 'navigation/service';

export const attemptLoginEpic = (action$: ActionsObservable<TRActions>) =>
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

export const loginSuccessEpic = (action$: ActionsObservable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof AuthenticationActions['loginSuccess']>>(LOGIN_SUCCESS),
    map(() => navigate(DECKS_SCREEN)),
  );

export default combineEpics(attemptLoginEpic, loginSuccessEpic);
