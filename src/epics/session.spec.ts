import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { CacheActions, SessionActions, TRActions } from 'actions';
import {
  rateCardEpic,
  revealCardEpic,
  studyEpic,
} from './session';

import { BASE_URI } from '_constants/api';
import { STUDY_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import { ScoreValue } from 'generated';
import * as navigationService from 'navigation/service';
import reducer, { TRState } from 'reducer';

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
      link: 'http://some-link.com/',
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
      link: 'http://some-link.com/',
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
    it('should perform a mutation with card id and score', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SessionActions.rateCard(123, ScoreValue.Five),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = rateCardEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
    });

    describe('the request is successful', () => {
      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SessionActions.rateCard(123, ScoreValue.Five),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = rateCardEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: SessionActions.rateCardSuccess(123, ScoreValue.Five),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SessionActions.rateCard(123, ScoreValue.Five),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = rateCardEpic(action$, state$);
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
          a: CacheActions.playAudio(`${BASE_URI}/${cards[0].audio}`),
        });
      });
    });
  });
});
