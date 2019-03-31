import { ADD_TO_CACHE, HYDRATE_CACHE } from 'actions';
import cache, { initialState } from './cache';

describe('the cache reducer', () => {
  it('should handle adding to the cache', () => {
    const newState = cache(initialState, {
      payload: { uri: 'foo', path: 'bar' },
      type: ADD_TO_CACHE,
    });

    expect(newState.cache).toEqual({ foo: 'bar' });
  });

  it('should handle hydrating the cache', () => {
    const newState = cache(initialState, {
      payload: { auth: undefined, cache: { foo: 'bar' } },
      type: HYDRATE_CACHE,
    });

    expect(newState.cache).toEqual({ foo: 'bar' });
  });
});
