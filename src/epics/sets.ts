import {
  ActionsObservable,
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { SETS_SCREEN } from '_constants/screens';
import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_SET,
  ADD_SET_SUCCESS,
  DELETE_SET,
  DELETE_SET_SUCCESS,
  GET_SETS,
  SetsActions,
  TRActions,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchSetsEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['getSets']>>(GET_SETS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/sets/`).pipe(
        map(({ response }) => SetsActions.getSetsSuccess(response)),
        catchError(error => of(SetsActions.getSetsFailed('failed!'))),
      ),
    ),
  );

export const addSetEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['addSet']>>(ADD_SET),
    mergeMap(({ payload: { deckId, name, card_ids } }) =>
      apiPost(state$, `/decks/${deckId}/sets/`, { name, card_ids }).pipe(
        map(() => SetsActions.addSetSuccess(deckId)),
        catchError(error => of(SetsActions.addSetFailed('failed!'))),
      ),
    ),
  );

export const addSetSuccessEpic = (action$: ActionsObservable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['addSetSuccess']>>(
      ADD_SET_SUCCESS,
    ),
    map(({ payload: { deckId } }) => navigate(SETS_SCREEN)),
  );

export const deleteSetEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['deleteSet']>>(
      DELETE_SET,
    ),
    mergeMap(({ payload: { setId } }) =>
      apiDelete(state$, `/sets/${setId}`).pipe(
        map(() => SetsActions.deleteSetSuccess()),
        catchError(error => of(SetsActions.deleteSetFailed('failed!'))),
      ),
    ),
  );

export const deleteSetSuccessEpic = (action$: ActionsObservable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['deleteSetSuccess']>>(
      DELETE_SET_SUCCESS,
    ),
    map(() => goBack()),
  );

export default combineEpics(
  fetchSetsEpic,
  addSetEpic,
  addSetSuccessEpic,
  deleteSetEpic,
  deleteSetSuccessEpic,
);
