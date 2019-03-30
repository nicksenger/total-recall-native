import { AsyncStorage } from 'react-native';
import { from } from 'rxjs';

export const clearCredentials = () => from(AsyncStorage.multiRemove(['username', 'password']));

export const retrieveCredentials = () => from(
  AsyncStorage.multiGet(['username', 'token']).then(([[, username], [, token]]) => {
    if (username && token) {
      return { username, token };
    }
    throw new Error('No stored authentication info.');
  }),
);

export const saveCredentials = (username: string, token: string) =>
  from(AsyncStorage.multiSet([['username', username], ['token', token]]));
