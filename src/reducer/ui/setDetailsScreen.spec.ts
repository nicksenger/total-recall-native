import { DELETE_SET, DELETE_SET_FAILED, DELETE_SET_SUCCESS, VIEW_SET_DETAILS } from 'actions';
import setDetailsScreen, { initialState } from './setDetailsScreen';

describe('the setDetailsScreen reducer', () => {
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

  it('should set the loading state when a request to delete a set is sent', () => {
    const newState = setDetailsScreen(initialState, {
      payload: { setId: 123 },
      type: DELETE_SET,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if deleting the set fails', () => {
    const newState = setDetailsScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: DELETE_SET_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the set is deleted successfully', () => {
    const newState = setDetailsScreen(initialState, {
      payload: { setId: 123 },
      type: DELETE_SET_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should set the selected set when viewing set details', () => {
    const newState = setDetailsScreen(initialState, {
      payload: { set: sets[0] },
      type: VIEW_SET_DETAILS,
    });

    expect(newState).toEqual({
      ...initialState,
      selectedSet: sets[0],
    });
  });
});
