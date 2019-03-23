import {
  ActionsObservable,
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { apiGet, apiPost } from '_utils/api';
import {
  ADD_DECK,
  ADD_DECK_SUCCESS,
  DecksActions,
  GET_DECKS,
  TRActions,
} from 'actions';
import { goBack } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchDecksEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['getDecks']>>(GET_DECKS),
    mergeMap(({ payload: { username } }) =>
      apiGet(state$, `/user/${username}/decks/`).pipe(
        map(({ response }) => DecksActions.getDecksSuccess(response)),
        catchError(error => of(DecksActions.getDecksFailed('failed!'))),
      ),
    ),
  );

export const addDeckEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['addDeck']>>(ADD_DECK),
    mergeMap(({ payload: { name, language, username } }) =>
      apiPost(state$, `/user/${username}/decks/`, { name, language }).pipe(
        map(({ response }) => DecksActions.addDeckSuccess(response)),
        catchError(error => of(DecksActions.addDeckFailed('failed!'))),
      ),
    ),
  );

export const addDeckSuccessEpic = (action$: ActionsObservable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['addDeckSuccess']>>(
      ADD_DECK_SUCCESS,
    ),
    map(() => goBack()),
  );

export default combineEpics(addDeckEpic, addDeckSuccessEpic, fetchDecksEpic);
