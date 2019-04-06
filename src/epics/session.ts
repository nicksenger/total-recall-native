import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { STUDY_SCREEN } from '_constants/screens';
import { apiPost } from '_utils/api';
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

export const rateCardEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SessionActions['rateCard']>>(
      RATE_CARD,
    ),
    mergeMap(({ payload: { cardId, rating } }) =>
      apiPost(state$, `/cards/${cardId}/score/`, { rating }).pipe(
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
      map(({ payload: { card } }) => CacheActions.playAudio(card.audio)),
    );

export default combineEpics(rateCardEpic, revealCardEpic, studyEpic);
