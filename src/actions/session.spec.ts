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
  it('should create the RATE_CARD action', () => {
    const action = SessionActions.rateCard(123, 5);
    expect(action.payload).toEqual({ cardId: 123, rating: 5 });
    expect(action.type).toEqual(RATE_CARD);
  });

  it('should create the RATE_CARD_FAILED action', () => {
    const action = SessionActions.rateCardFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(RATE_CARD_FAILED);
  });

  it('should create the RATE_CARD_SUCCESS action', () => {
    const action = SessionActions.rateCardSuccess(123, 5);
    expect(action.payload).toEqual({ cardId: 123, rating: 5 });
    expect(action.type).toEqual(RATE_CARD_SUCCESS);
  });

  it('should create the REVEAL_CARD action', () => {
    const action = SessionActions.revealCard();
    expect(action.type).toEqual(REVEAL_CARD);
  });

  it('should create the REVIEW_CARD action', () => {
    const action = SessionActions.reviewCard(5);
    expect(action.payload).toEqual({ rating: 5 });
    expect(action.type).toEqual(REVIEW_CARD);
  });

  it('should create the STUDY action', () => {
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

    const action = SessionActions.study(cards);
    expect(action.payload).toEqual({ cards });
    expect(action.type).toEqual(STUDY);
  });
});
