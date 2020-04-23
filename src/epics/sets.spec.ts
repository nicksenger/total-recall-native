import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { SetsActions, TRActions } from 'actions';
import {
  addSetEpic,
  deleteSetEpic,
  fetchSetsEpic,
  gotoAddSetEpic,
  viewSetDetailsEpic,
} from './sets';

import { ADD_SET_SCREEN, SET_DETAILS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import {
  CreateSet,
  CreateSetMutationVariables,
  DeleteSet,
  DeleteSetMutationVariables,
  UserSetsQuery,
} from 'generated';
import * as navigationService from 'navigation/service';
import reducer, { TRState } from 'reducer';

describe('the sets epics', () => {
  const setsResponse = {
    Sets: [
      {
        cards: [
          {
            id: 1,
          },
          {
            id: 2,
          },
          {
            id: 3,
          },
        ],
        id: 123,
        name: 'a set',
        owner: {
          username: 'foo',
        },
      },
    ],
  } as UserSetsQuery;
  const set = {
    card_ids: '1,2,3',
    deck: 123,
    id: 123,
    name: 'a set',
    owner: 'foo',
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
    navigateMock.mockImplementation(() => 'mocked');
  });

  afterEach(() => {
    goBackMock.mockReset();
    navigateMock.mockReset();
  });

  describe('the fetch sets epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request for sets with the specified id', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.getSets(123),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { data: {} } } as AjaxResponse,
        }));

        const output$ = fetchSetsEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
    });

    describe('the request is successful', () => {
      it('should emit the success action with sets', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.getSets(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { data: setsResponse as UserSetsQuery } } as AjaxResponse,
          }));

          const output$ = fetchSetsEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.getSetsSuccess(
              [set],
              123,
            ),
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
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = fetchSetsEpic(action$, state$);
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
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { data: {} } } as AjaxResponse,
        }));

        const output$ = addSetEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: CreateSet.loc?.source.body,
        variables: {
          card_ids: [1, 2, 3],
          deckId: 123,
          name: 'foo',
        } as CreateSetMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should go back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = addSetEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock).toHaveBeenCalled();
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.addSet(123, 'foo', [1, 2, 3]),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = addSetEpic(action$, state$);
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
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold(
            '--a',
            { a: { response: { data: {}, errors: [{ message: 'failed!' }] } } }),
          );

          const output$ = addSetEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.addSetFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete set epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a graphql request with the set ID', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.deleteSet(123),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { data: {} } } as AjaxResponse,
        }));

        const output$ = deleteSetEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: DeleteSet.loc?.source.body,
        variables: {
          setId: 123,
        } as DeleteSetMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.deleteSet(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { data: {} } } as AjaxResponse,
          }));

          const output$ = deleteSetEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: SetsActions.deleteSet(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { data: {} } } as AjaxResponse,
          }));

          const output$ = deleteSetEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: SetsActions.deleteSetSuccess(123),
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
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold(
            '--a',
            { a: { response: { errors: [{ message: 'failed!' }] } } }),
          );

          const output$ = deleteSetEpic(action$, state$);
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

  describe('the view set details epic', () => {
    it('should navigate to the set details screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: SetsActions.viewSetDetails(set),
        });

        const output$ = viewSetDetailsEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(SET_DETAILS_SCREEN);
    });
  });
});
