import { GET_DECKS, GET_DECKS_FAILED, GET_DECKS_SUCCESS } from 'actions';
import decksScreen, { initialState } from './decksScreen';

describe('the decksScreen reducer', () => {
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

  it('should set the loading state when a request to view decks is sent', () => {
    const newState = decksScreen(initialState, {
      payload: { username: 'waldo' },
      type: GET_DECKS,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if viewing the decks fails', () => {
    const newState = decksScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: GET_DECKS_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  describe('the decks are retrieved successfully', () => {
    it('should reset the loading state', () => {
      const newState = decksScreen(initialState, {
        payload: { decks },
        type: GET_DECKS_SUCCESS,
      });

      expect(newState.loading).toBeFalsy();
    });

    it('should store an id reference to the retrieved decks', () => {
      const newState = decksScreen(initialState, {
        payload: { decks },
        type: GET_DECKS_SUCCESS,
      });

      expect(newState.decks).toEqual([123, 456]);
    });
  });

});
