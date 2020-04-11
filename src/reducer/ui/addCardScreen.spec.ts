import { ADD_CARD, ADD_CARD_FAILED, ADD_CARD_SUCCESS } from 'actions';
import addCardScreen, { initialState } from './addCardScreen';

describe('the addCardScreen reducer', () => {
  it('should set the loading state when a request to add card is sent', () => {
    const newState = addCardScreen(initialState, {
      payload: { deckId: 123, front: 'foo', back: 'bar', link: 'baz' },
      type: ADD_CARD,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if adding the card fails', () => {
    const newState = addCardScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: ADD_CARD_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the card is added successfully', () => {
    const newState = addCardScreen(initialState, {
      payload: { deckId: 123 },
      type: ADD_CARD_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
