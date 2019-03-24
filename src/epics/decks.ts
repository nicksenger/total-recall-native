import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_DECK,
  DecksActions,
  DELETE_DECK,
  GET_DECKS,
  TRActions,
} from 'actions';
import { goBack } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchDecksEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['getDecks']>>(GET_DECKS),
    mergeMap(({ payload: { username } }) =>
      apiGet(state$, `/user/${username}/decks/`).pipe(
        map(({ response }) => DecksActions.getDecksSuccess(response)),
        catchError(() => of(DecksActions.getDecksFailed('failed!'))),
      ),
    ),
  );

export const addDeckEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['addDeck']>>(ADD_DECK),
    mergeMap(({ payload: { name, language, username } }) =>
      apiPost(state$, `/user/${username}/decks/`, { name, language }).pipe(
        tap(() => goBack()),
        map(({ response }) => DecksActions.addDeckSuccess(response)),
        catchError(() => of(DecksActions.addDeckFailed('failed!'))),
      ),
    ),
  );

export const deleteDeckEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['deleteDeck']>>(
      DELETE_DECK,
    ),
    mergeMap(({ payload: { deckId } }) =>
      apiDelete(state$, `/decks/${deckId}/`).pipe(
        tap(() => goBack()),
        map(() => DecksActions.deleteDeckSuccess()),
        catchError(() => of(DecksActions.deleteDeckFailed('failed!'))),
      ),
    ),
  );

export default combineEpics(addDeckEpic, deleteDeckEpic, fetchDecksEpic);
