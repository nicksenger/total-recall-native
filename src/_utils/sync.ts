import { AsyncStorage } from 'react-native';
import { from } from 'rxjs';

export const clearCredentials = () => from(AsyncStorage.multiRemove(['username', 'password']));

export const retrieveCredentials = () => from(
  AsyncStorage.multiGet(['username', 'token', 'cache']).then(
    ([[, username], [, token], [, cache]]) => {
      return {
        auth: (username && token) ? { username, token } : undefined,
        cache: cache ? JSON.parse(cache) : {},
      };
    },
));

export const saveCredentials = (username: string, token: string) =>
  from(AsyncStorage.multiSet([['username', username], ['token', token]]));

export const saveCache = (newCache: { [uri: string]: string }) =>
  from(AsyncStorage.setItem('cache', JSON.stringify(newCache)));
