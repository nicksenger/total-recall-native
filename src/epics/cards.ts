import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { CARD_DETAILS_SCREEN } from '_constants/screens';
import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  CardsActions,
  DELETE_CARD,
  GET_CARDS,
  TRActions,
  VIEW_CARD_DETAILS,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
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
        map(() => CardsActions.deleteCardSuccess(cardId)),
        catchError(() => of(CardsActions.deleteCardFailed('failed!'))),
      ),
    ),
  );

export const viewCardDetailsEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CardsActions['viewCardDetails']>>(
    VIEW_CARD_DETAILS,
  ),
  tap(() => navigate(CARD_DETAILS_SCREEN)),
  filter(() => false),
);

export default combineEpics(
  addCardEpic,
  deleteCardEpic,
  fetchCardsEpic,
  viewCardDetailsEpic,
);
