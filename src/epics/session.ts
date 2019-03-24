import {
  combineEpics,
  ofType,
  StateObservable,
} from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap } from 'rxjs/operators';

import { STUDY_SCREEN } from '_constants/screens';
import { apiPost } from '_utils/api';
import {
  RATE_CARD,
  SessionActions,
  STUDY,
  TRActions,
} from 'actions';
import { navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const rateCardEpic = (
  action$: Observable<TRActions>,
  state$: StateObservable<TRState>,
) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SessionActions['rateCard']>>(
      RATE_CARD,
    ),
    mergeMap(({ payload: { cardId, rating } }) =>
      apiPost(state$, `/cards/${cardId}/score/`, { rating }).pipe(
        map(() => SessionActions.rateCardSuccess(cardId, rating)),
        catchError(() => of(SessionActions.rateCardFailed('failed!'))),
      ),
    ),
  );

export const studyEpic = (action$: Observable<TRActions>) =>
  action$.pipe(
    ofType<TRActions, ReturnType<typeof SessionActions['study']>>(STUDY),
    tap(() => navigate(STUDY_SCREEN)),
    filter(() => false),
  );

export default combineEpics(rateCardEpic, studyEpic);
