import { DELETE_SET, DELETE_SET_FAILED, DELETE_SET_SUCCESS } from 'actions';
import setDetailsScreen, { initialState } from './setDetailsScreen';

describe('the setDetailsScreen reducer', () => {
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
      type: DELETE_SET_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
