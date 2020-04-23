import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { BASE_URI } from '_constants/api';
import { STUDY_SCREEN } from '_constants/screens';
import { apiGraphQL } from '_utils/api';
import {
  CacheActions,
  RATE_CARD,
  REVEAL_CARD,
  SessionActions,
  STUDY,
  TRActions,
} from 'actions';
import { navigate } from 'navigation/service';
import { TRState } from 'reducer';
import {
  RateCard,
  RateCardMutation,
  RateCardMutationVariables,
} from '../generated';

export const rateCardEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SessionActions['rateCard']>>(
      RATE_CARD,
    ),
    mergeMap(({ payload: { cardId, rating } }) =>
      apiGraphQL<RateCardMutation>(
        state$,
        { query: RateCard, variables: { cardId, rating } as RateCardMutationVariables },
      ).pipe(
        map(() => SessionActions.rateCardSuccess(cardId, rating)),
        catchError((e: Error) => of(SessionActions.rateCardFailed(e.message))),
      ),
    ),
  );

export const studyEpic = (action$: Observable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SessionActions['study']>>(STUDY),
    tap(() => navigate(STUDY_SCREEN)),
    filter(() => false),
  );

export const revealCardEpic = (action$: Observable<TRActions>) =>
    action$.pipe(
      ofType<TRActions, ReturnType<typeof SessionActions['revealCard']>>(REVEAL_CARD),
      map(({ payload: { card } }) => CacheActions.playAudio(`${BASE_URI}/${card.audio}`)),
    );

export default combineEpics(rateCardEpic, revealCardEpic, studyEpic);
