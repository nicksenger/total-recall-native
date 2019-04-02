import {
  ADD_CARD,
  ADD_CARD_FAILED,
  ADD_CARD_SUCCESS,
  CardsActions,
  DELETE_CARD,
  DELETE_CARD_FAILED,
  DELETE_CARD_SUCCESS,
  GET_CARDS,
  GET_CARDS_FAILED,
  GET_CARDS_SUCCESS,
  VIEW_CARD_DETAILS,
} from './cards';

describe('the cards actions', () => {
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

  it('should create the ADD_CARD action', () => {
    const action = CardsActions.addCard(123, 'foo', 'bar');
    expect(action.payload).toEqual({ deckId: 123, front: 'foo', back: 'bar' });
    expect(action.type).toEqual(ADD_CARD);
  });

  it('should create the ADD_CARD_FAILED action', () => {
    const action = CardsActions.addCardFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(ADD_CARD_FAILED);
  });

  it('should create the ADD_CARD_SUCCESS action', () => {
    const action = CardsActions.addCardSuccess(123);
    expect(action.payload).toEqual({ deckId: 123 });
    expect(action.type).toEqual(ADD_CARD_SUCCESS);
  });

  it('should create the DELETE_CARD action', () => {
    const action = CardsActions.deleteCard(123);
    expect(action.payload).toEqual({ cardId: 123 });
    expect(action.type).toEqual(DELETE_CARD);
  });

  it('should create the DELETE_CARD_FAILED action', () => {
    const action = CardsActions.deleteCardFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(DELETE_CARD_FAILED);
  });

  it('should create the DELETE_CARD_SUCCESS action', () => {
    const action = CardsActions.deleteCardSuccess(123);
    expect(action.payload).toEqual({ cardId: 123 });
    expect(action.type).toEqual(DELETE_CARD_SUCCESS);
  });

  it('should create the GET_CARDS action', () => {
    const action = CardsActions.getCards(123);
    expect(action.payload).toEqual({ deckId: 123 });
    expect(action.type).toEqual(GET_CARDS);
  });

  it('should create the GET_CARDS_FAILED action', () => {
    const action = CardsActions.getCardsFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(GET_CARDS_FAILED);
  });

  it('should create the GET_CARDS_SUCCESS action', () => {
    const action = CardsActions.getCardsSuccess(cards, 123);
    expect(action.payload).toEqual({ cards, deckId: 123 });
    expect(action.type).toEqual(GET_CARDS_SUCCESS);
  });

  it('should create the VIEW_CARD_DETAILS action', () => {
    const { payload, type } = CardsActions.viewCardDetails(cards[0]);
    expect(payload).toEqual({ card: cards[0] });
    expect(type).toEqual(VIEW_CARD_DETAILS);
  });
});
