import { DELETE_CARD_SUCCESS, GET_CARDS, GET_CARDS_FAILED, GET_CARDS_SUCCESS } from 'actions';
import cardsScreen, { initialState } from './cardsScreen';

describe('the cardsScreen reducer', () => {
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

  it('should set the loading state when a request to view cards is sent', () => {
    const newState = cardsScreen(initialState, {
      payload: { deckId: 123 },
      type: GET_CARDS,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if viewing the cards fails', () => {
    const newState = cardsScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: GET_CARDS_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  describe('the cards are retrieved successfully', () => {
    it('should reset the loading state', () => {
      const newState = cardsScreen({ ...initialState, loading: true }, {
        payload: { cards, deckId: 123 },
        type: GET_CARDS_SUCCESS,
      });

      expect(newState.loading).toBeFalsy();
    });

    it('should store an id reference to the retrieved cards', () => {
      const newState = cardsScreen(initialState, {
        payload: { cards, deckId: 123 },
        type: GET_CARDS_SUCCESS,
      });

      expect(newState.cards).toEqual([123, 456]);
    });
  });

  describe('retrieving the cards fails', () => {
    it('should reset the loading state', () => {
      const newState = cardsScreen({ ...initialState, loading: true }, {
        payload: { message: 'failed!' },
        type: GET_CARDS_FAILED,
      });

      expect(newState).toEqual({
        ...initialState,
        loading: false,
      });
    });
  });

  it('should remove deleted cards from the state', () => {
    const newState = cardsScreen({ ...initialState, cards: [123, 456] }, {
      payload: { cardId: 123 },
      type: DELETE_CARD_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      cards: [456],
    });
  });
});
