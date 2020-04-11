import { Observable } from 'rxjs';
import { AjaxResponse } from 'rxjs/ajax';
import { TestScheduler } from 'rxjs/testing';

import { CardsActions } from 'actions';
import {
  addCardEpic,
  deleteCardEpic,
  fetchCardsEpic,
  viewCardDetailsEpic,
} from './cards';

import { CARD_DETAILS_SCREEN } from '_constants/screens';
import * as apiUtils from '_utils/api';
import * as navigationService from 'navigation/service';
import { TRState } from 'reducer';

describe('the cards epics', () => {
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
    let getMock: jest.SpyInstance;

    beforeEach(() => {
      getMock = jest.spyOn(apiUtils, 'apiGet');
    });

    afterEach(() => {
      getMock.mockRestore();
    });

    it('should make a request to the cards endpoint with deck id', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.getCards(123),
        });
        const state$ = null;

        getMock.mockImplementation(() => cold('--a', {
          a: { response: cards } as AjaxResponse,
        }));

        const output$ = fetchCardsEpic(action$, state$ as unknown as Observable<TRState>);
        expectObservable(output$);
      });

      expect(getMock.mock.calls).toHaveLength(1);
      expect(getMock.mock.calls[0][1]).toEqual('/decks/123/cards/');
    });

    describe('the request is successful', () => {
      it('should emit the success action with cards', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.getCards(123),
          });
          const state$ = null;

          getMock.mockImplementation(() => cold('--a', {
            a: { response: cards } as AjaxResponse,
          }));

          const output$ = fetchCardsEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.getCardsSuccess(cards, 123),
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
          const state$ = null;

          getMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = fetchCardsEpic(action$, state$ as unknown as Observable<TRState>);
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
        const state$ = null;

        postMock.mockImplementation(() => cold('--a', {
          a: { response: cards[0] } as AjaxResponse,
        }));

        const output$ = addCardEpic(action$, state$ as unknown as Observable<TRState>);
        expectObservable(output$);
      });

      expect(postMock.mock.calls).toHaveLength(1);
      expect(postMock.mock.calls[0][1]).toEqual('/decks/123/cards/');
      expect(postMock.mock.calls[0][2]).toEqual({ front: 'foo', back: 'bar' });
    });

    describe('the request is successful', () => {
      it('should go back', () => {
        const navigationMock = jest.spyOn(navigationService, 'navigate');
        navigationMock.mockImplementation(() => 'mocked');

        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.addCard(123, 'foo', 'bar'),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: cards[0] } as AjaxResponse,
          }));

          const output$ = addCardEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$);
        });

        expect(goBackMock).toHaveBeenCalled();
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.addCard(123, 'foo', 'bar'),
          });
          const state$ = null;

          postMock.mockImplementation(() => cold('--a', {
            a: { response: cards[0] } as AjaxResponse,
          }));

          const output$ = addCardEpic(action$, state$ as unknown as Observable<TRState>);
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
          const state$ = null;

          postMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = addCardEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$).toBe('---a', {
            a: CardsActions.addCardFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the delete card epic', () => {
    let deleteMock: jest.SpyInstance;

    beforeEach(() => {
      deleteMock = jest.spyOn(apiUtils, 'apiDelete');
    });

    afterEach(() => {
      deleteMock.mockRestore();
    });

    it('should make a delete request to the card endpoint', () => {
      scheduler.run(({ hot, cold, expectObservable }) => {
        const action$ = hot('-a', {
          a: CardsActions.deleteCard(123),
        });
        const state$ = null;

        deleteMock.mockImplementation(() => cold('--a', {
          a: { response: {} } as AjaxResponse,
        }));

        const output$ = deleteCardEpic(action$, state$ as unknown as Observable<TRState>);
        expectObservable(output$);
      });

      expect(deleteMock.mock.calls).toHaveLength(1);
      expect(deleteMock.mock.calls[0][1]).toEqual('/cards/123/');
    });

    describe('the request is successful', () => {
      it('should navigate back', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.deleteCard(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteCardEpic(action$, state$ as unknown as Observable<TRState>);
          expectObservable(output$);
        });

        expect(goBackMock.mock.calls).toHaveLength(1);
      });

      it('should emit the success action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CardsActions.deleteCard(123),
          });
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--a', {
            a: { response: {} } as AjaxResponse,
          }));

          const output$ = deleteCardEpic(action$, state$ as unknown as Observable<TRState>);
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
          const state$ = null;

          deleteMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = deleteCardEpic(action$, state$ as unknown as Observable<TRState>);
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
          a: CardsActions.viewCardDetails(cards[0]),
        });

        const output$ = viewCardDetailsEpic(action$);
        expectObservable(output$);
      });

      expect(navigateMock).toHaveBeenCalled();
      expect(navigateMock.mock.calls[0][0]).toEqual(CARD_DETAILS_SCREEN);
    });
  });
});
