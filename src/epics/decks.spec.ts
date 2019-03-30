import { StateObservable } from 'redux-observable';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { DecksActions } from 'actions';
import {
  addDeckEpic,
  deleteDeckEpic,
  fetchDecksEpic,
  viewDeckEpic,
} from './decks';

import { DECK_DETAILS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import * as navigationService from 'navigation/service';
import { TRState } from 'reducer';

describe('the decks epics', () => {
  const decks = [
    {
      created: 'sometime',
      id: 123,
      language: 'vi',
      name: 'foo',
      owner: 'waldo',
    },
    {
      created: 'sometime',
      id: 456,
      language: 'es',
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
    navigateMock.mockImplementation(() => 'mocked!');
  });

  afterEach(() => {
    goBackMock.mockReset();
    navigateMock.mockReset();
  });

  describe('the fetch decks epic', () => {
    let getMock: jest.SpyInstance;

    beforeEach(() => {
      getMock = jest.spyOn(apiUtils, 'apiGet');
    });

    afterEach(() => {
      getMock.mockRestore();
    });

    it('should make a request to the decks endpoint with username', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.getDecks('waldo'),
        });
        const state$ = null;

        getMock.mockImplementation(() => cold('--a', {
          a: { response: decks } as AjaxResponse,
        }));

        const output$ = fetchDecksEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(getMock.mock.calls).toHaveLength(1);
      expect(getMock.mock.calls[0][1]).toEqual('/user/waldo/decks/');
    });

    describe('the request is successful', () => {
      it('should emit the success action with decks', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.getDecks('waldo'),
          });
          const state$ = null;

          getMock.mockImplementation(() => cold('--a', {
            a: { response: decks } as AjaxResponse,
          }));

          const output$ = fetchDecksEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.getDecksSuccess(decks),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.getDecks('waldo'),
          });
          const state$ = null;

          getMock.mockImplementation(() => cold('--#'));

          const output$ = fetchDecksEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.getDecksFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the add deck epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the decks endpoint with deck info', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.addDeck('foo', 'vi', 'waldo'),
        });
        const state$ = null;

        postMock.mockImplementation(() => cold('--a', {
          a: { response: decks[0] } as AjaxResponse,
        }));

        const output$ = addDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/user/waldo/decks/');
      expect(postMock.mock.calls[0][2]).toEqual({ name: 'foo', language: 'vi' });
    });

    describe('the request is successful', () => {
      it('should go back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 'vi', 'waldo'),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: decks[0] } as AjaxResponse,
          }));

          const output$ = addDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$);
        });

        expect(goBackMock).toHaveBeenCalled();
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 'vi', 'waldo'),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: decks[0] } as AjaxResponse,
          }));

          const output$ = addDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.addDeckSuccess(decks[0]),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 'vi', 'waldo'),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--#'));

          const output$ = addDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.addDeckFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete deck epic', () => {
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
          a: DecksActions.deleteDeck(123),
        });
        const state$ = null;

        deleteMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = deleteDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
        expectObservable(output$);
      });

      expect(deleteMock.mock.calls).toHaveLength(1);
      expect(deleteMock.mock.calls[0][1]).toEqual('/decks/123/');
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.deleteDeck(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.deleteDeck(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.deleteDeckSuccess(),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.deleteDeck(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--#'));

          const output$ = deleteDeckEpic(action$, state$ as unknown as StateObservable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.deleteDeckFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the viewDeck epic', () => {
    it('should navigate to the deck details screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.viewDeck(decks[0]),
        });

        const output$ = viewDeckEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(DECK_DETAILS_SCREEN);
    });
  });
});
