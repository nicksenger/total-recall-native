import { Toast } from 'native-base';
import {
  combineEpics,
  ofType,
} from 'redux-observable';
import { Observable } from 'rxjs';
import { filter, tap } from 'rxjs/operators';

import {
  ADD_CARD_FAILED,
  ADD_DECK_FAILED,
  ADD_SET_FAILED,
  ADD_TO_CACHE_FAILED,
  AuthenticationActions,
  CacheActions,
  CardsActions,
  DecksActions,
  DELETE_CARD_FAILED,
  DELETE_DECK_FAILED,
  DELETE_SET_FAILED,
  FETCH_IMAGE_FAILED,
  GET_CARDS_FAILED,
  GET_DECKS_FAILED,
  GET_SETS_FAILED,
  LOGIN_FAILED,
  PLAY_AUDIO_FAILED,
  RATE_CARD_FAILED,
  REGISTRATION_FAILED,
  SessionActions,
  SetsActions,
  TRActions,
} from 'actions';

export const errorToastEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions,
  ReturnType<typeof CardsActions['addCardFailed']> |
  ReturnType<typeof DecksActions['addDeckFailed']> |
  ReturnType<typeof SetsActions['addSetFailed']> |
  ReturnType<typeof CacheActions['addToCacheFailed']> |
  ReturnType<typeof CardsActions['deleteCardFailed']> |
  ReturnType<typeof DecksActions['deleteDeckFailed']> |
  ReturnType<typeof SetsActions['deleteSetFailed']> |
  ReturnType<typeof CacheActions['fetchImageFailed']> |
  ReturnType<typeof CardsActions['getCardsFailed']> |
  ReturnType<typeof DecksActions['getDecksFailed']> |
  ReturnType<typeof SetsActions['getSetsFailed']> |
  ReturnType<typeof AuthenticationActions['loginFailed']> |
  ReturnType<typeof CacheActions['playAudioFailed']> |
  ReturnType<typeof SessionActions['rateCardFailed']> |
  ReturnType<typeof AuthenticationActions['registrationFailed']>>(
    ADD_CARD_FAILED,
    ADD_DECK_FAILED,
    ADD_SET_FAILED,
    ADD_TO_CACHE_FAILED,
    DELETE_CARD_FAILED,
    DELETE_DECK_FAILED,
    DELETE_SET_FAILED,
    FETCH_IMAGE_FAILED,
    GET_CARDS_FAILED,
    GET_DECKS_FAILED,
    GET_SETS_FAILED,
    LOGIN_FAILED,
    PLAY_AUDIO_FAILED,
    RATE_CARD_FAILED,
    REGISTRATION_FAILED,
  ),
  tap(({ payload }) => Toast.show({
    buttonText: 'Dismiss',
    duration: 3000,
    text: payload.message,
  })),
  filter(() => false),
);

export default combineEpics(errorToastEpic);
