import { identity, pickBy } from 'lodash';
import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import {
  CARD_DETAILS_SCREEN,
  CARD_LINK_SCREEN,
  EDIT_CARD_LINK_SCREEN,
} from '_constants/screens';
import { apiDelete, apiGet, apiPatch, apiPost } from '_utils/api';
import {
  ADD_CARD,
  ADD_CARD_SUCCESS,
  CardsActions,
  DELETE_CARD,
  EDIT_CARD_LINK,
  GET_CARDS,
  TRActions,
  VIEW_CARD_DETAILS,
  VIEW_CARD_LINK,
  VIEW_EDIT_CARD_LINK,
} from 'actions';
import { goBack, navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const fetchCardsEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof CardsActions['getCards']> |
      ReturnType<typeof CardsActions['addCardSuccess']>>(GET_CARDS, ADD_CARD_SUCCESS),
    mergeMap(({ payload: { deckId } }) =>
      apiGet(state$, `/decks/${deckId}/cards/`).pipe(
        map(({ response }) => CardsActions.getCardsSuccess(response, deckId)),
        catchError((e: Error) => of(CardsActions.getCardsFailed(e.message))),
      ),
    ),
  );

export const addCardEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['addCard']>>(ADD_CARD),
    mergeMap(({ payload: { deckId, front, back, link } }) =>
      apiPost(state$, `/decks/${deckId}/cards/`, pickBy({ front, back, link }), identity).pipe(
        tap(() => goBack()),
        map(() => CardsActions.addCardSuccess(deckId)),
        catchError((e: Error) => of(CardsActions.addCardFailed(e.message))),
      ),
    ),
  );

export const deleteCardEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof CardsActions['deleteCard']>>(
      DELETE_CARD,
    ),
    mergeMap(({ payload: { cardId } }) =>
      apiDelete(state$, `/cards/${cardId}/`).pipe(
        tap(() => goBack()),
        map(() => CardsActions.deleteCardSuccess(cardId)),
        catchError((e: Error) => of(CardsActions.deleteCardFailed(e.message))),
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

export const viewEditCardLinkEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CardsActions['viewEditCardLink']>>(
    VIEW_EDIT_CARD_LINK,
  ),
  tap(() => navigate(EDIT_CARD_LINK_SCREEN)),
  filter(() => false),
);

export const editCardLinkEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CardsActions['editCardLink']>>(
    EDIT_CARD_LINK,
  ),
  mergeMap(({ payload: { cardId, link } }) =>
    apiPatch(state$, `/cards/${cardId}/`, { link }).pipe(
      tap(() => goBack()),
      map(() => CardsActions.editCardLinkSuccess(cardId, link)),
      catchError((e: Error) => of(CardsActions.editCardLinkFailed(e.message))),
    ),
  ),
);

export const viewCardLinkEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CardsActions['viewCardLink']>>(
    VIEW_CARD_LINK,
  ),
  tap(() => navigate(CARD_LINK_SCREEN)),
  filter(() => false),
);

export default combineEpics(
  addCardEpic,
  deleteCardEpic,
  editCardLinkEpic,
  fetchCardsEpic,
  viewCardDetailsEpic,
  viewCardLinkEpic,
  viewEditCardLinkEpic,
);
