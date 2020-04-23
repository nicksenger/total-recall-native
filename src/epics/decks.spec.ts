import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { DecksActions, TRActions } from 'actions';
import {
  addDeckEpic,
  deleteDeckEpic,
  fetchDecksEpic,
  viewDeckDetailsEpic,
  viewDeckItemsEpic,
} from './decks';

import { DECK_DETAILS_SCREEN, DECK_ITEMS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import {
  CreateDeck,
  CreateDeckMutation,
  CreateDeckMutationVariables,
  DeleteDeck,
  DeleteDeckMutationVariables,
  UserDecks,
  UserDecksQuery,
  UserDecksQueryVariables,
} from 'generated';
import * as navigationService from 'navigation/service';
import reducer, { TRState } from 'reducer';

describe('the decks epics', () => {
  const decksResponse = {
    Decks: [{
      id: 123,
      language: {
        name: 'Vietnamese',
      },
      name: 'foo',
    }],
  } as UserDecksQuery;
  const deck = {
    created: '',
    id: 123,
    language: 'Vietnamese',
    name: 'foo',
    owner: 'waldo',
  };

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
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the decks endpoint with username', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.getDecks('waldo'),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { data: decksResponse } } as AjaxResponse,
        }));

        const output$ = fetchDecksEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: UserDecks.loc?.source.body,
        variables: {
          username: 'waldo',
        } as UserDecksQueryVariables,
      });
    });

    describe('the request is successful', () => {
      it('should emit the success action with decks', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.getDecks('waldo'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { data: decksResponse } } as AjaxResponse,
          }));

          const output$ = fetchDecksEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.getDecksSuccess([deck]),
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
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = fetchDecksEpic(action$, state$);
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
          a: DecksActions.addDeck('foo', 1, 'waldo'),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: {
            response: {
              data: { CreateDeck: { id: 123, language: { name: 'Viet' } } } as CreateDeckMutation,
            },
          } as AjaxResponse,
        }));

        const output$ = addDeckEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: CreateDeck.loc?.source.body,
        variables: {
          language: 1,
          name: 'foo',
        } as CreateDeckMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should go back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 1, 'waldo'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: {
                data: { CreateDeck: { id: 123, language: { name: 'Viet' } } } as CreateDeckMutation,
              },
            } as AjaxResponse,
          }));

          const output$ = addDeckEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock).toHaveBeenCalled();
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 1, 'waldo'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: {
                data: {
                  CreateDeck: { id: 123, language: { name: 'Vietnamese' }, name: 'test' },
                } as CreateDeckMutation,
              },
            } as AjaxResponse,
          }));

          const output$ = addDeckEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.addDeckSuccess(
              {
                created: '',
                id: 123,
                language: 'Vietnamese',
                name: 'test',
                owner: 'waldo',
              },
              'waldo',
            ),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.addDeck('foo', 1, 'waldo'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = addDeckEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.addDeckFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete deck epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a delete request to the deck endpoint', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.deleteDeck(123),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = deleteDeckEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: DeleteDeck.loc?.source.body,
        variables: {
          id: 123,
        } as DeleteDeckMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.deleteDeck(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteDeckEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: DecksActions.deleteDeck(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteDeckEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.deleteDeckSuccess(123),
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
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: {
                errors: [{
                  message: 'failed!',
                }],
              },
            },
          }));

          const output$ = deleteDeckEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: DecksActions.deleteDeckFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the viewDeckDetails epic', () => {
    it('should navigate to the deck details screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.viewDeckDetails(deck),
        });

        const output$ = viewDeckDetailsEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(DECK_DETAILS_SCREEN);
    });
  });

  describe('the viewDeckItems epic', () => {
    it('should navigate to the deck details screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: DecksActions.viewDeckItems(deck),
        });

        const output$ = viewDeckItemsEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(DECK_ITEMS_SCREEN);
    });
  });
});
