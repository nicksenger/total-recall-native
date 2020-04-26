import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { ADD_SET_SCREEN, SET_DETAILS_SCREEN } from '_constants/screens';
import { apiGraphQL } from '_utils/api';
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
import {
  CreateSet,
  CreateSetMutation,
  CreateSetMutationVariables,
  DeleteSet,
  DeleteSetMutation,
  DeleteSetMutationVariables,
  UserSets,
  UserSetsQuery,
  UserSetsQueryVariables,
} from '../generated';

export const fetchSetsEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof SetsActions['getSets']> |
      ReturnType<typeof SetsActions['addSetSuccess']>>(GET_SETS, ADD_SET_SUCCESS),
    mergeMap(({ payload: { deckId } }) =>
      apiGraphQL<UserSetsQuery>(
        state$,
        { query: UserSets, variables: { deckId } as UserSetsQueryVariables },
      ).pipe(
        map(
          ({ Sets }) => SetsActions.getSetsSuccess(
            Sets.map(s => ({
              card_ids: s.cards.map(c => c.card_id.id).join(','),
              deck: deckId,
              id: s.id,
              name: s.name,
              owner: s.owner.username,
            })),
            deckId,
          ),
        ),
        catchError((e: Error) => of(SetsActions.getSetsFailed(e.message))),
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
      apiGraphQL<CreateSetMutation>(
        state$,
        {
          query: CreateSet,
          variables: {
            card_ids,
            deckId,
            name,
          } as CreateSetMutationVariables },
      ).pipe(
        tap(() => goBack()),
        map(() => SetsActions.addSetSuccess(deckId)),
        catchError((e: Error) => of(SetsActions.addSetFailed(e.message))),
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
      apiGraphQL<DeleteSetMutation>(
        state$,
        {
          query: DeleteSet,
          variables: { setId } as DeleteSetMutationVariables,
        },
      ).pipe(
        tap(() => goBack()),
        map(() => SetsActions.deleteSetSuccess(setId)),
        catchError((e: Error) => of(SetsActions.deleteSetFailed(e.message))),
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
