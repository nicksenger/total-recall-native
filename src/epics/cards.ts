import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  CardsActions,
  DELETE_CARD,
  GET_CARDS,
  TRActions,
} from 'actions';
import { goBack } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchCardsEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof CardsActions['getCards']> |
      ReturnType<typeof CardsActions['addCardSuccess']>>(GET_CARDS, ADD_CARD_SUCCESS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/cards/`).pipe(
        map(({ response }) => CardsActions.getCardsSuccess(response)),
        catchError(() => of(CardsActions.getCardsFailed('failed!'))),
      ),
    ),
  );

export const addCardEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['addCard']>>(ADD_CARD),
    mergeMap(({ payload: { deckId, front, back } }) =>
      apiPost(state$, `/decks/${deckId}/cards/`, { front, back }).pipe(
        tap(() => goBack()),
        map(() => CardsActions.addCardSuccess(deckId)),
        catchError(() => of(CardsActions.addCardFailed('failed!'))),
      ),
    ),
  );

export const deleteCardEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['deleteCard']>>(
      DELETE_CARD,
    ),
    mergeMap(({ payload: { cardId } }) =>
      apiDelete(state$, `/cards/${cardId}/`).pipe(
        tap(() => goBack()),
        map(() => CardsActions.deleteCardSuccess()),
        catchError(() => of(CardsActions.deleteCardFailed('failed!'))),
      ),
    ),
  );

export default combineEpics(
  addCardEpic,
  deleteCardEpic,
  fetchCardsEpic,
);
