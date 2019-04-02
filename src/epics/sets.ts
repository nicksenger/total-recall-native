import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { ADD_SET_SCREEN, SET_DETAILS_SCREEN } from '_constants/screens';
import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_SET,
  ADD_SET_SUCCESS,
  DELETE_SET,
  GET_SETS,
  GOTO_ADD_SET,
  SetsActions,
  TRActions,
  VIEW_SET_DETAILS,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchSetsEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof SetsActions['getSets']> |
      ReturnType<typeof SetsActions['addSetSuccess']>>(GET_SETS, ADD_SET_SUCCESS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/sets/`).pipe(
        map(({ response }) => SetsActions.getSetsSuccess(response, deckId)),
        catchError(() => of(SetsActions.getSetsFailed('failed!'))),
      ),
    ),
  );

export const addSetEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
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
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SetsActions['deleteSet']>>(
      DELETE_SET,
    ),
    mergeMap(({ payload: { setId } }) =>
      apiDelete(state$, `/sets/${setId}/`).pipe(
        tap(() => goBack()),
        map(() => SetsActions.deleteSetSuccess(setId)),
        catchError(() => of(SetsActions.deleteSetFailed('failed!'))),
      ),
    ),
  );

export const gotoAddSetEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof SetsActions['gotoAddSet']>>(GOTO_ADD_SET),
  tap(() => navigate(ADD_SET_SCREEN)),
  filter(() => false),
);

export const viewSetDetailsEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof SetsActions['viewSetDetails']>>(
    VIEW_SET_DETAILS,
  ),
  tap(() => navigate(SET_DETAILS_SCREEN)),
  filter(() => false),
);

export default combineEpics(
  fetchSetsEpic,
  addSetEpic,
  deleteSetEpic,
  gotoAddSetEpic,
  viewSetDetailsEpic,
);
