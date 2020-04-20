import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { DECK_DETAILS_SCREEN, DECK_ITEMS_SCREEN } from '_constants/screens';
import { apiDelete, apiGraphQL } from '_utils/api';
import {
  ADD_DECK,
  ADD_DECK_SUCCESS,
  DecksActions,
  DELETE_DECK,
  GET_DECKS,
  TRActions,
  VIEW_DECK_DETAILS,
  VIEW_DECK_ITEMS,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
import { TRState } from 'reducer';
import {
  CreateDeck,
  CreateDeckMutation,
  CreateDeckMutationVariables,
  DeleteDeck,
  DeleteDeckMutation,
  DeleteDeckMutationVariables,
  UserDecks,
  UserDecksQuery,
  UserDecksQueryVariables,
} from '../generated';

export const fetchDecksEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof DecksActions['getDecks']> |
      ReturnType<typeof DecksActions['addDeckSuccess']>>(
        ADD_DECK_SUCCESS,
        GET_DECKS,
      ),
    mergeMap(({ payload: { username } }) =>
      apiGraphQL<UserDecksQuery>(
        state$,
        { query: UserDecks, variables: { username } as UserDecksQueryVariables },
      ).pipe(
        map(({ Decks }) => DecksActions.getDecksSuccess(Decks.map(d => ({
          created: '',
          id: d.id,
          language: d.language.name,
          name: d.name,
          owner: username,
        })))),
        catchError((e: Error) => of(DecksActions.getDecksFailed(e.message))),
      ),
    ),
  );

export const addDeckEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['addDeck']>>(ADD_DECK),
    mergeMap(({ payload: { name, language, username } }) =>
      apiGraphQL<CreateDeckMutation>(
        state$,
        { query: CreateDeck, variables: { name, language } as CreateDeckMutationVariables },
      ).pipe(
        tap(() => goBack()),
        map(
          (result: CreateDeckMutation) => DecksActions.addDeckSuccess(
            {
              created: '' as string,
              id: result.CreateDeck?.id as number,
              language: result.CreateDeck?.language.name as string,
              name: result.CreateDeck?.name as string,
              owner: username,
            },
            username,
          ),
        ),
        catchError((e: Error) => of(DecksActions.addDeckFailed(e.message))),
      ),
    ),
  );

export const deleteDeckEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof DecksActions['deleteDeck']>>(
      DELETE_DECK,
    ),
    mergeMap(({ payload: { deckId } }) =>
      apiGraphQL<DeleteDeckMutationVariables>(
        state$,
        { query: DeleteDeck, variables: {} as DeleteDeckMutationVariables },
      ).pipe(
        tap(() => goBack()),
        map(() => DecksActions.deleteDeckSuccess(deckId)),
        catchError((e: Error) => of(DecksActions.deleteDeckFailed(e.message))),
      ),
    ),
  );

export const viewDeckDetailsEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof DecksActions['viewDeckDetails']>>(
    VIEW_DECK_DETAILS,
  ),
  tap(() => navigate(DECK_DETAILS_SCREEN)),
  filter(() => false),
);

export const viewDeckItemsEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof DecksActions['viewDeckItems']>>(
    VIEW_DECK_ITEMS,
  ),
  tap(() => navigate(DECK_ITEMS_SCREEN)),
  filter(() => false),
);

export default combineEpics(
  addDeckEpic,
  deleteDeckEpic,
  fetchDecksEpic,
  viewDeckDetailsEpic,
  viewDeckItemsEpic,
);
