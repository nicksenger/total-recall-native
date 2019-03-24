import { DELETE_CARD, DELETE_CARD_FAILED, DELETE_CARD_SUCCESS } from 'actions';
import cardDetailsScreen, { initialState } from './cardDetailsScreen';

describe('the cardDetailsScreen reducer', () => {
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
      type: DELETE_CARD_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
