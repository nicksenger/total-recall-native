import { DELETE_SET_SUCCESS, GET_SETS, GET_SETS_FAILED, GET_SETS_SUCCESS } from 'actions';
import setsScreen, { initialState } from './setsScreen';

describe('the setsScreen reducer', () => {
  const sets = [
    {
      card_ids: '1,2,3',
      deck: 123,
      id: 123,
      name: 'foo',
      owner: 'waldo',
    },
    {
      card_ids: '4,5,6',
      deck: 123,
      id: 456,
      name: 'bar',
      owner: 'waldo',
    },
  ];

  it('should set the loading state when a request to view sets is sent', () => {
    const newState = setsScreen(initialState, {
      payload: { deckId: 123 },
      type: GET_SETS,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if viewing the sets fails', () => {
    const newState = setsScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: GET_SETS_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  describe('the sets are retrieved successfully', () => {
    it('should reset the loading state', () => {
      const newState = setsScreen(initialState, {
        payload: { sets },
        type: GET_SETS_SUCCESS,
      });

      expect(newState.loading).toBeFalsy();
    });

    it('should store an id reference to the retrieved sets', () => {
      const newState = setsScreen(initialState, {
        payload: { sets },
        type: GET_SETS_SUCCESS,
      });

      expect(newState.sets).toEqual([123, 456]);
    });
  });

  describe('retrieving the sets fails', () => {
    it('should reset the loading state', () => {
      const newState = setsScreen({ ...initialState, loading: true }, {
        payload: { message: 'failed!' },
        type: GET_SETS_FAILED,
      });

      expect(newState).toEqual({
        ...initialState,
        loading: false,
      });
    });
  });

  it('should remove deleted sets from the state', () => {
    const newState = setsScreen({ ...initialState, sets: [123, 456] }, {
      payload: { setId: 123 },
      type: DELETE_SET_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      sets: [456],
    });
  });
});
