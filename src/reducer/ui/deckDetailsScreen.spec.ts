import {
  DELETE_DECK,
  DELETE_DECK_FAILED,
  DELETE_DECK_SUCCESS,
  VIEW_DECK_DETAILS,
  VIEW_DECK_ITEMS,
} from 'actions';
import deckDetailsScreen, { initialState } from './deckDetailsScreen';

describe('the deckDetailsScreen reducer', () => {
  const decks = [
    {
      created: 'sometime',
      id: 123,
      language: 'vi',
      name: 'foo',
      owner: 'waldo',
    },
    {
      created: 'sometime',
      id: 456,
      language: 'es',
      name: 'bar',
      owner: 'waldo',
    },
  ];

  it('should set the loading state when a request to delete a deck is sent', () => {
    const newState = deckDetailsScreen(initialState, {
      payload: { deckId: 123 },
      type: DELETE_DECK,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if deleting the deck fails', () => {
    const newState = deckDetailsScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: DELETE_DECK_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the deck is deleted successfully', () => {
    const newState = deckDetailsScreen(initialState, {
      payload: { deckId: 123 },
      type: DELETE_DECK_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should set the selected deck when the deck details are viewed', () => {
    const newState = deckDetailsScreen(initialState, {
      payload: { deck: decks[0] },
      type: VIEW_DECK_DETAILS,
    });

    expect(newState.selectedDeck).toEqual(decks[0]);
  });

  it('should set the selected deck when a the deck items are viewed', () => {
    const newState = deckDetailsScreen(initialState, {
      payload: { deck: decks[0] },
      type: VIEW_DECK_ITEMS,
    });

    expect(newState.selectedDeck).toEqual(decks[0]);
  });
});
