import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { CardsActions, TRActions } from 'actions';
import {
  addCardEpic,
  deleteCardEpic,
  fetchCardsEpic,
  viewCardDetailsEpic,
} from './cards';

import { CARD_DETAILS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import {
  CreateCard,
  CreateCardMutation,
  CreateCardMutationVariables,
  DeckCards,
  DeckCardsQuery,
  DeckCardsQueryVariables,
  DeleteCard,
  DeleteCardMutationVariables,
  ScoreValue,
} from 'generated';
import * as navigationService from 'navigation/service';
import reducer, { TRState } from 'reducer';

describe('the cards epics', () => {
  const cardsResponse = {
    Cards: [{
      back: {
        audio: 'foo.mp3',
        image: 'foo.jpg',
        text: 'foo',
      },
      created_at: 1587618082113,
      front: 'foo',
      id: 123,
      link: 'http://some-link.com/',
      owner: {
        username: 'foobar',
      },
      scores: [
        {
          created_at: 1587618082113,
          value: ScoreValue.One,
        },
        {
          created_at: 1587618082114,
          value: ScoreValue.Two,
        },
        {
          created_at: 1587618082115,
          value: ScoreValue.Three,
        },
      ],
    }],
  } as DeckCardsQuery;
  const card = {
    audio: 'foo.mp3',
    back: 'foo',
    created: 'Thu, 23 Apr 2020 05:01:22 GMT',
    front: 'foo',
    id: 123,
    image: 'foo.jpg',
    last_seen: 'Thu, 23 Apr 2020 05:01:22 GMT',
    link: 'http://some-link.com/',
    score: '1,2,3',
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

  describe('the fetch cards epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the cards endpoint with deck id', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.getCards(123),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: { data: cardsResponse } } as AjaxResponse,
        }));

        const output$ = fetchCardsEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: DeckCards.loc?.source.body,
        variables: {
          deckId: 123,
        } as DeckCardsQueryVariables,
      });
    });

    describe('the request is successful', () => {
      it('should emit the success action with cards', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.getCards(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { data: cardsResponse } } as AjaxResponse,
          }));

          const output$ = fetchCardsEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.getCardsSuccess([card], 123),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.getCards(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: { errors: [{ message: 'failed!' }] } },
          }));

          const output$ = fetchCardsEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.getCardsFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the add card epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a request to the cards endpoint with deck id and card', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.addCard(123, 'foo', 'bar'),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: {
            response: { data: { CreateCard: { id: 123 } } as CreateCardMutation },
          } as AjaxResponse,
        }));

        const output$ = addCardEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: CreateCard.loc?.source.body,
        variables: {
          back: 'bar',
          deckId: 123,
          front: 'foo',
        } as CreateCardMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should go back', () => {
        const navigationMock = jest.spyOn(navigationService, 'navigate');
        navigationMock.mockImplementation(() => 'mocked');

        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.addCard(123, 'foo', 'bar'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: { data: { CreateCard: { id: 123 } } as CreateCardMutation },
            } as AjaxResponse,
          }));

          const output$ = addCardEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock).toHaveBeenCalled();
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.addCard(123, 'foo', 'bar'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: { data: { CreateCard: { id: 123 } } as CreateCardMutation },
            } as AjaxResponse,
          }));

          const output$ = addCardEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.addCardSuccess(123),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.addCard(123, 'foo', 'bar'),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = addCardEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.addCardFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete card epic', () => {
    let postMock: jest.SpyInstance;

    beforeEach(() => {
      postMock = jest.spyOn(apiUtils, 'apiPost');
    });

    afterEach(() => {
      postMock.mockRestore();
    });

    it('should make a DeleteCard mutation', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.deleteCard(123),
        });
        const state$: Observable<TRState> = hot('-a', {
          a: reducer(undefined, { type: 'init' } as unknown as TRActions),
        });

        postMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = deleteCardEpic(action$, state$);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/graphql');
      expect(postMock.mock.calls[0][2]).toEqual({
        query: DeleteCard.loc?.source.body,
        variables: {
          cardId: 123,
        } as DeleteCardMutationVariables,
      });
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.deleteCard(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteCardEpic(action$, state$);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.deleteCard(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteCardEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.deleteCardSuccess(123),
          });
        });
      });
    });

    describe('the request fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.deleteCard(123),
          });
          const state$: Observable<TRState> = hot('-a', {
            a: reducer(undefined, { type: 'init' } as unknown as TRActions),
          });

          postMock.mockImplementation(() => cold('--a', {
            a: {
              response: {
                errors: [{ message: 'failed!' }],
              },
            },
          }));

          const output$ = deleteCardEpic(action$, state$);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.deleteCardFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the view card details epic', () => {
    it('should navigate to the card details screen', () => {
      scheduler.run(({ hot, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.viewCardDetails(card),
        });

        const output$ = viewCardDetailsEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(CARD_DETAILS_SCREEN);
    });
  });
});
