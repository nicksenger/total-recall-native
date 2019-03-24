import { ADD_DECK, ADD_DECK_FAILED, ADD_DECK_SUCCESS } from 'actions';
import addDeckScreen, { initialState } from './addDeckScreen';

describe('the addDeckScreen reducer', () => {
  it('should set the loading state when a request to add deck is sent', () => {
    const newState = addDeckScreen(initialState, {
      payload: { name: 'foo', language: 'vi', username: 'waldo' },
      type: ADD_DECK,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if adding the deck fails', () => {
    const newState = addDeckScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: ADD_DECK_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the deck is added successfully', () => {
    const newState = addDeckScreen(initialState, {
      payload: { deck: {
        created: 'sometime',
        id: 123,
        language: 'vi',
        name: 'foo',
        owner: 'waldo',
      } },
      type: ADD_DECK_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
