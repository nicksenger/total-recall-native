import { DELETE_CARD, DELETE_CARD_FAILED, DELETE_CARD_SUCCESS, VIEW_CARD_DETAILS } from 'actions';
import cardDetailsScreen, { initialState } from './cardDetailsScreen';

describe('the cardDetailsScreen reducer', () => {
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

  it('should set the loading state when a request to delete a card is sent', () => {
    const newState = cardDetailsScreen(initialState, {
      payload: { cardId: 123 },
      type: DELETE_CARD,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if deleting the card fails', () => {
    const newState = cardDetailsScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: DELETE_CARD_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the card is deleted successfully', () => {
    const newState = cardDetailsScreen(initialState, {
      payload: { cardId: 123 },
      type: DELETE_CARD_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should set the selected card when viewing card details', () => {
    const newState = cardDetailsScreen(initialState, {
      payload: { card: cards[0] },
      type: VIEW_CARD_DETAILS,
    });

    expect(newState).toEqual({
      ...initialState,
      selectedCard: cards[0],
    });
  });
});
