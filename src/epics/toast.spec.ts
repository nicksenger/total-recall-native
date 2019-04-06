import { TestScheduler } from 'rxjs/testing';

import {
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
  TRActions,
} from 'actions';
import { Toast } from 'native-base';

import { errorToastEpic } from './toast';

describe('the toast epic', () => {
  let scheduler: TestScheduler;
  let toastMock: jest.SpyInstance;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    toastMock = jest.spyOn(Toast, 'show');
    toastMock.mockImplementation(() => 'mocked');
  });

  afterEach(() => {
    toastMock.mockReset();
  });

  describe('The error toast epic', () => {
    const actions = [
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
    ];

    it('should show a toast with the error message', () => {
      actions.forEach((action) => {
        toastMock.mockReset();
        toastMock = jest.spyOn(Toast, 'show');
        toastMock.mockImplementation(() => 'mocked');

        scheduler.run(({ hot, expectObservable }) => {
          const action$ = hot('-a', {
            a: { type: action, payload: { message: 'failed!' } } as TRActions,
          });

          const output$ = errorToastEpic(action$);
          expectObservable(output$);
        });

        expect(toastMock).toHaveBeenCalled();
        expect(toastMock.mock.calls[0][0].text).toEqual('failed!');
      });
    });
  });
});
