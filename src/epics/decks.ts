import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { DECK_DETAILS_SCREEN, DECK_ITEMS_SCREEN } from '_constants/screens';
import { apiDelete, apiGet, apiPost } from '_utils/api';
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

export const fetchDecksEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof DecksActions['getDecks']> |
      ReturnType<typeof DecksActions['addDeckSuccess']>>(
        ADD_DECK_SUCCESS,
        GET_DECKS,
      ),
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
        map(({ response: deck }) => DecksActions.addDeckSuccess(deck, username)),
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
        map(() => DecksActions.deleteDeckSuccess(deckId)),
        catchError(() => of(DecksActions.deleteDeckFailed('failed!'))),
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
