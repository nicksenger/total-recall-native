import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_SET,
  DELETE_SET,
  GET_SETS,
  SetsActions,
  TRActions,
} from 'actions';
import { goBack } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchSetsEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['getSets']>>(GET_SETS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/sets/`).pipe(
        map(({ response }) => SetsActions.getSetsSuccess(response)),
        catchError(() => of(SetsActions.getSetsFailed('failed!'))),
      ),
    ),
  );

export const addSetEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['addSet']>>(ADD_SET),
    mergeMap(({ payload: { deckId, name, card_ids } }) =>
      apiPost(state$, `/decks/${deckId}/sets/`, { name, card_ids }).pipe(
        tap(() => goBack()),
        map(() => SetsActions.addSetSuccess(deckId)),
        catchError(() => of(SetsActions.addSetFailed('failed!'))),
      ),
    ),
  );

export const deleteSetEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['deleteSet']>>(
      DELETE_SET,
    ),
    mergeMap(({ payload: { setId } }) =>
      apiDelete(state$, `/sets/${setId}/`).pipe(
        tap(() => goBack()),
        map(() => SetsActions.deleteSetSuccess()),
        catchError(() => of(SetsActions.deleteSetFailed('failed!'))),
      ),
    ),
  );

export default combineEpics(
  fetchSetsEpic,
  addSetEpic,
  deleteSetEpic,
);
