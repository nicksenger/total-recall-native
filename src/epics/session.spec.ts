import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { CacheActions, SessionActions } from 'actions';
import {
  rateCardEpic,
  revealCardEpic,
  studyEpic,
} from './session';

import { STUDY_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import * as navigationService from 'navigation/service';
import { TRState } from 'reducer';

describe('the session epics', () => {
  const cards = [
    {
      audio: 'foo.mp3',
      back: 'foo',
      created: 'somehow',
      deck: 123,
      front: 'foo',
      id: 123,
      image: 'foo.jpg',
      last_seen: 'somewhere',
      owner: 'foobar',
      score: '1,2,3',
    },
    {
      audio: 'bar.mp3',
      back: 'bar',
      created: 'somehow',
      deck: 123,
      front: 'bar',
      id: 456,
      image: 'bar.jpg',
      last_seen: 'somewhere',
      owner: 'foobar',
      score: '1,2,3',
    },
  ];

  let scheduler: TestScheduler;
  let goBackMock: jest.SpyInstance;
  let navigateMock: jest.SpyInstance;
  let postMock: jest.SpyInstance;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });

    goBackMock = jest.spyOn(navigationService, 'goBack');
    goBackMock.mockImplementation(() => 'mocked');
    navigateMock = jest.spyOn(navigationService, 'navigate');
    navigateMock.mockImplementation(() => 'mocked');
    postMock = jest.spyOn(apiUtils, 'apiPost');
  });

  afterEach(() => {
    goBackMock.mockReset();
    navigateMock.mockReset();
    postMock.mockReset();
  });

  describe('the rate card epic', () => {
    it('should make a request with card id & score to the card score endpoint', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SessionActions.rateCard(123, 5),
        });
        const state$ = null;

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = rateCardEpic(action$, state$ as unknown as Observable<TRState>);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/cards/123/score/');
    });

    describe('the request is successful', () => {
      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SessionActions.rateCard(123, 5),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = rateCardEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SessionActions.rateCardSuccess(123, 5),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SessionActions.rateCard(123, 5),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = rateCardEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SessionActions.rateCardFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the study epic', () => {
    it('should navigate to the study screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: SessionActions.study(cards),
        });

        const output$ = studyEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(STUDY_SCREEN);
    });
  });

  describe('the reveal card epic', () => {
    it('should emit the play audio action', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: SessionActions.revealCard(cards[0]),
        });

        const output$ = revealCardEpic(action$);
        expectObservable(output$).toBe('-a', {
          a: CacheActions.playAudio(cards[0].audio),
        });
      });
    });
  });
});
