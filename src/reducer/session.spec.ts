import _ from 'lodash';

import { PROMPT, SCORE } from '_constants/session';
import {
  RATE_CARD,
  RATE_CARD_FAILED,
  RATE_CARD_SUCCESS,
  REVEAL_CARD,
  REVIEW_CARD,
  STUDY,
} from 'actions';
import * as superMemo from './_utils/superMemo';
import { Card } from './entities';
import session, { initialState } from './session';

describe('the session reducer', () => {
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

  it('should populate the review list based on the `needsReview` predicate', () => {
    const needsReviewMock = jest.spyOn(superMemo, 'needsReview');

    needsReviewMock.mockImplementation(() => true);
    const reviewAllState = session(initialState, {
      payload: { cards },
      type: STUDY,
    });

    expect(_.find(reviewAllState.rateStack, cards[0])).toBeDefined();
    expect(_.find(reviewAllState.rateStack, cards[1])).toBeDefined();

    needsReviewMock.mockImplementation(() => false);
    const reviewNoneState = session(initialState, {
      payload: { cards },
      type: STUDY,
    });

    expect(_.find(reviewNoneState.rateStack, cards[0])).toBeUndefined();
    expect(_.find(reviewNoneState.rateStack, cards[1])).toBeUndefined();

    needsReviewMock.mockImplementation(({ id }: Card) => id === 123);
    const reviewOneState = session(initialState, {
      payload: { cards },
      type: STUDY,
    });

    expect(_.find(reviewOneState.rateStack, cards[0])).toBeDefined();
    expect(_.find(reviewOneState.rateStack, cards[1])).toBeUndefined();
  });

  it('should set the loading state when a request to rate a card is sent', () => {
    const newState = session(initialState, {
      payload: { cardId: 123, rating: 5 },
      type: RATE_CARD,
    });

    expect(newState.loading).toBeTruthy();
  });

  describe('a card is rated successfully', () => {
    it('should reset the loading state', () => {
      const newState = session(
        { ...initialState, loading: true, rateStack: [cards[0], cards[1]] },
        { payload: { cardId: 123, rating: 5 }, type: RATE_CARD_SUCCESS },
      );

      expect(newState.loading).toBeFalsy();
    });

    it('should pop the stack of cards to rate for this session', () => {
      const newState = session(
        { ...initialState, loading: true, rateStack: [cards[0], cards[1]] },
        { payload: { cardId: 123, rating: 5 }, type: RATE_CARD_SUCCESS },
      );

      expect(newState.rateStack).toHaveLength(1);
      expect(_.find(newState.rateStack, cards[0])).toBeUndefined();
    });

    it('should add the card to the review list if the rating is 3 or less', () => {
      const reviewState = session(
        { ...initialState, loading: true, rateStack: [cards[0], cards[1]] },
        { payload: { cardId: 123, rating: 2 }, type: RATE_CARD_SUCCESS },
      );

      expect(reviewState.reviewList).toHaveLength(1);
      expect(_.find(reviewState.reviewList, cards[0])).toBeDefined();

      const noReviewState = session(
        { ...initialState, loading: true, rateStack: [cards[0], cards[1]] },
        { payload: { cardId: 123, rating: 5 }, type: RATE_CARD_SUCCESS },
      );

      expect(noReviewState.reviewList).toHaveLength(0);
      expect(_.find(noReviewState.reviewList, cards[0])).toBeUndefined();
    });

    it('should change the status to PROMPT', () => {
      const reviewState = session(
        { ...initialState, loading: true, rateStack: [cards[0], cards[1]], status: SCORE },
        { payload: { cardId: 123, rating: 2 }, type: RATE_CARD_SUCCESS },
      );

      expect(reviewState.status).toEqual(PROMPT);
    });
  });

  it('should reset the loading state if rating a card fails', () => {
    const newState = session({ ...initialState, loading: true }, {
      payload: { message: 'failed for some reason' },
      type: RATE_CARD_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should change the status to SCORE when a card is revealed', () => {
    const newState = session(initialState, {
      type: REVEAL_CARD,
    });

    expect(newState.status).toEqual(SCORE);
  });

  describe('a card is reviewed', () => {
    it('should remove the card from the review list if the rating is higher than 3', () => {
      const reviewState = session(
        { ...initialState, loading: true, reviewList: [cards[0], cards[1]], status: SCORE },
        { payload: { rating: 4 }, type: REVIEW_CARD },
      );

      expect(_.find(reviewState.reviewList, cards[0])).toBeUndefined();
      expect(reviewState.reviewList).toEqual([cards[1]]);
    });

    it('should move the card to back of review list if rating 3 or less', () => {
      const reviewState = session(
        { ...initialState, loading: true, reviewList: [cards[0], cards[1]], status: SCORE },
        { payload: { rating: 3 }, type: REVIEW_CARD },
      );

      expect(_.find(reviewState.reviewList, cards[0])).toBeDefined();
      expect(reviewState.reviewList).toEqual([cards[1], cards[0]]);
    });

    it('should change the status to PROMPT', () => {
      const reviewState = session(
        { ...initialState, loading: true, reviewList: [cards[0], cards[1]], status: SCORE },
        { payload: { rating: 3 }, type: REVIEW_CARD },
      );

      expect(reviewState.status).toEqual(PROMPT);
    });
  });
});
