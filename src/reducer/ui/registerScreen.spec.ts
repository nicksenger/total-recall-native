import { REGISTER, REGISTRATION_FAILED, REGISTRATION_SUCCESS } from 'actions';
import registerScreen, { initialState } from './registerScreen';

describe('the registerScreen reducer', () => {
  it('should set the loading state when a request to register is sent', () => {
    const newState = registerScreen(initialState, {
      payload: { username: 'waldo', password: 'foobar' },
      type: REGISTER,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if regisration fails', () => {
    const newState = registerScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: REGISTRATION_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the registration is successful', () => {
    const newState = registerScreen(initialState, {
      type: REGISTRATION_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });
});
