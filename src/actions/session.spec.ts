import { ScoreValue } from 'generated';
import {
  RATE_CARD,
  RATE_CARD_FAILED,
  RATE_CARD_SUCCESS,
  REVEAL_CARD,
  REVIEW_CARD,
  SessionActions,
  STUDY,
} from './session';

describe('the session actions', () => {
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

  it('should create the RATE_CARD action', () => {
    const action = SessionActions.rateCard(123, ScoreValue.Five);
    expect(action.payload).toEqual({ cardId: 123, rating: ScoreValue.Five });
    expect(action.type).toEqual(RATE_CARD);
  });

  it('should create the RATE_CARD_FAILED action', () => {
    const action = SessionActions.rateCardFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(RATE_CARD_FAILED);
  });

  it('should create the RATE_CARD_SUCCESS action', () => {
    const action = SessionActions.rateCardSuccess(123, ScoreValue.Five);
    expect(action.payload).toEqual({ cardId: 123, rating: ScoreValue.Five });
    expect(action.type).toEqual(RATE_CARD_SUCCESS);
  });

  it('should create the REVEAL_CARD action', () => {
    const action = SessionActions.revealCard(cards[0]);
    expect(action.payload).toEqual({ card: cards[0] });
    expect(action.type).toEqual(REVEAL_CARD);
  });

  it('should create the REVIEW_CARD action', () => {
    const action = SessionActions.reviewCard(ScoreValue.Five);
    expect(action.payload).toEqual({ rating: ScoreValue.Five });
    expect(action.type).toEqual(REVIEW_CARD);
  });

  it('should create the STUDY action', () => {
    const action = SessionActions.study(cards);
    expect(action.payload).toEqual({ cards });
    expect(action.type).toEqual(STUDY);
  });
});
