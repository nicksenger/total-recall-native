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
import { apiGraphQL } from '_utils/api';
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
import {
  CreateCard,
  CreateCardMutation,
  CreateCardMutationVariables,
  DeckCards,
  DeckCardsQuery,
  DeckCardsQueryVariables,
  DeleteCard,
  DeleteCardMutation,
  DeleteCardMutationVariables,
  EditCardLink,
  EditCardLinkMutation,
  EditCardLinkMutationVariables,
} from '../generated';

export const fetchCardsEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions,
      ReturnType<typeof CardsActions['getCards']> |
      ReturnType<typeof CardsActions['addCardSuccess']>>(GET_CARDS, ADD_CARD_SUCCESS),
    mergeMap(({ payload: { deckId } }) =>
      apiGraphQL<DeckCardsQuery>(
        state$,
        { query: DeckCards, variables: { deckId } as DeckCardsQueryVariables },
      ).pipe(
        map(({ Cards }: DeckCardsQuery) => CardsActions.getCardsSuccess(
          Cards.map(c => ({
            audio: c.back.audio ? c.back.audio : '',
            back: c.back.text,
            created: (new Date(c.created_at)).toUTCString(),
            front: c.front,
            id: c.id,
            image: c.back.image ? c.back.image : '',
            last_seen: (new Date(c.scores.pop()?.created_at)).toUTCString(),
            link: c.link ? c.link : '',
            score: `${c.scores.map(s => s.value).join('')}`,
          })),
          deckId,
        )),
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
      apiGraphQL<CreateCardMutation>(
        state$,
        {
          query: CreateCard,
          variables: { deckId, front, back, link } as CreateCardMutationVariables,
        },
      ).pipe(
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
      apiGraphQL<DeleteCardMutation>(
        state$,
        { query: DeleteCard, variables: { cardId } as DeleteCardMutationVariables },
      ).pipe(
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
    apiGraphQL<EditCardLinkMutation>(
      state$,
      {
        query: EditCardLink,
        variables: { cardId, link } as EditCardLinkMutationVariables,
      },
    ).pipe(
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
