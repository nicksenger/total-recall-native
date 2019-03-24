import { ADD_SET, ADD_SET_FAILED, ADD_SET_SUCCESS } from 'actions';
import addSetScreen, { initialState } from './addSetScreen';

describe('the addSetScreen reducer', () => {
  it('should set the loading state when a request to add set is sent', () => {
    const newState = addSetScreen(initialState, {
      payload: { deckId: 123, name: 'foo', card_ids: '1,2,3' },
      type: ADD_SET,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if adding the set fails', () => {
    const newState = addSetScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: ADD_SET_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the set is added successfully', () => {
    const newState = addSetScreen(initialState, {
      payload: { deckId: 123 },
      type: ADD_SET_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
