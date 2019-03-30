import { StateObservable } from 'redux-observable';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { SetsActions } from 'actions';
import {
  addSetEpic,
  deleteSetEpic,
  fetchSetsEpic,
  gotoAddSetEpic,
} from './sets';

import { ADD_SET_SCREEN, SETS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import * as navigationService from 'navigation/service';
import { TRState } from 'reducer';

describe('the sets epics', () => {
  const sets = [
    {
      card_ids: '1,2,3',
      deck: 123,
      id: 123,
      name: 'foo',
      owner: 'waldo',
    },
    {
      card_ids: '4,5,6',
      deck: 123,
      id: 456,
      name: 'bar',
      owner: 'waldo',
    },
  ];

  let scheduler: TestScheduler;
  let goBackMock: jest.SpyInstance;
  let navigateMock: jest.SpyInstance;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    goBackMock = jest.spyOn(navigationService, 'goBack');
    goBackMock.mockImplementation(() => 'mocked');
    navigateMock = jest.spyOn(navigationService, 'navigate');
    navigateMock.mockImplementation(() => 'mocked');
  });

  afterEach(() => {
    goBackMock.mockReset();
    navigateMock.mockReset();
  });

  describe('the fetch sets epic', () => {
    let getMock: jest.SpyInstance;

    beforeEach(() => {
      getMock = jest.spyOn(apiUtils, 'apiGet');
    });

    afterEach(() => {
      getMock.mockRestore();
    });

    it('should make a request to the sets endpoint with set id', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.getSets(123),
        });
        const state$ = null;

        getMock.mockImplementation(() => cold('--a', {
          a: { response: sets } as AjaxResponse,
        }));

        const output$ = fetchSetsEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(getMock.mock.calls).toHaveLength(1);
      expect(getMock.mock.calls[0][1]).toEqual('/decks/123/sets/');
    });

    describe('the request is successful', () => {
      it('should emit the success action with sets', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.getSets(123),
          });
          const state$ = null;

          getMock.mockImplementation(() => cold('--a', {
            a: { response: sets } as AjaxResponse,
          }));

          const output$ = fetchSetsEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.getSetsSuccess(sets),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.getSets(123),
          });
          const state$ = null;

          getMock.mockImplementation(() => cold('--#'));

          const output$ = fetchSetsEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.getSetsFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the add set epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the sets endpoint with set info', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
        });
        const state$ = null;

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = addSetEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/decks/123/sets/');
      expect(postMock.mock.calls[0][2]).toEqual({
        card_ids: '1,2,3',
        name: 'foo',
      });
    });

    describe('the request is successful', () => {
      it('should navigate to the sets screen', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = addSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$);
        });

        expect(navigateMock).toHaveBeenCalled();
        expect(navigateMock.mock.calls[0][0]).toEqual(SETS_SCREEN);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = addSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.addSetSuccess(123),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--#'));

          const output$ = addSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.addSetFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete set epic', () => {
    let deleteMock: jest.SpyInstance;

    beforeEach(() => {
      deleteMock = jest.spyOn(apiUtils, 'apiDelete');
    });

    afterEach(() => {
      deleteMock.mockRestore();
    });

    it('should make a delete request to the deck endpoint', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.deleteSet(123),
        });
        const state$ = null;

        deleteMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = deleteSetEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(deleteMock.mock.calls).toHaveLength(1);
      expect(deleteMock.mock.calls[0][1]).toEqual('/sets/123/');
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.deleteSet(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.deleteSet(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.deleteSetSuccess(),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.deleteSet(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--#'));

          const output$ = deleteSetEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.deleteSetFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the gotoAddSetEpic', () => {
    it('should navigate to the add set screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.gotoAddSet([]),
        });

        const output$ = gotoAddSetEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(ADD_SET_SCREEN);
    });
  });
});
