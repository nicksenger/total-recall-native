import {
  ActionsObservable,
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { CARDS_SCREEN } from '_constants/screens';
import { apiDelete, apiGet, apiPost } from '_utils/api';
import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  CardsActions,
  DELETE_CARD,
  DELETE_CARD_SUCCESS,
  GET_CARDS,
  TRActions,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchCardsEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['getCards']>>(GET_CARDS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/cards/`).pipe(
        map(({ response }) => CardsActions.getCardsSuccess(response)),
        catchError(error => of(CardsActions.getCardsFailed('failed!'))),
      ),
    ),
  );

export const addCardEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['addCard']>>(ADD_CARD),
    mergeMap(({ payload: { deckId, front, back } }) =>
      apiPost(state$, `/decks/${deckId}/cards/`, { front, back }).pipe(
        map(() => CardsActions.addCardSuccess(deckId)),
        catchError(error => of(CardsActions.addCardFailed('failed!'))),
      ),
    ),
  );

export const addCardSuccessEpic = (action$: ActionsObservable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['addCardSuccess']>>(
      ADD_CARD_SUCCESS,
    ),
    map(({ payload: { deckId } }) => navigate(CARDS_SCREEN)),
  );

export const deleteCardEpic = (
  action$: ActionsObservable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['deleteCard']>>(
      DELETE_CARD,
    ),
    mergeMap(({ payload: { cardId } }) =>
      apiDelete(state$, `/cards/${cardId}`).pipe(
        map(() => CardsActions.deleteCardSuccess()),
        catchError(error => of(CardsActions.deleteCardFailed('failed!'))),
      ),
    ),
  );

export const deleteCardSuccessEpic = (
  action$: ActionsObservable<TRActions>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['deleteCardSuccess']>>(
      DELETE_CARD_SUCCESS,
    ),
    map(() => goBack()),
  );

export default combineEpics(
  addCardEpic,
  addCardSuccessEpic,
  deleteCardEpic,
  deleteCardSuccessEpic,
  fetchCardsEpic,
);
