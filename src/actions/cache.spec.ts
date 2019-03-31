import {
  ADD_TO_CACHE,
  ADD_TO_CACHE_FAILED,
  CacheActions,
  FETCH_IMAGE,
  FETCH_IMAGE_FAILED,
  HYDRATE_CACHE,
  PLAY_AUDIO,
  PLAY_AUDIO_FAILED,
} from './cache';

describe('the cache actions', () => {
  it('should create the ADD_TO_CACHE action', () => {
    const { type, payload } = CacheActions.addToCache('foo', 'bar');
    expect(type).toEqual(ADD_TO_CACHE);
    expect(payload).toEqual({ uri: 'foo', path: 'bar' });
  });

  it('should create the ADD_TO_CACHE_FAILED action', () => {
    const { type, payload } = CacheActions.addToCacheFailed('failed!');
    expect(type).toEqual(ADD_TO_CACHE_FAILED);
    expect(payload).toEqual({ message: 'failed!' });
  });

  it('should create the FETCH_IMAGE action', () => {
    const { type, payload } = CacheActions.fetchImage('foo');
    expect(type).toEqual(FETCH_IMAGE);
    expect(payload).toEqual({ uri: 'foo' });
  });

  it('should create the FETCH_IMAGE_FAILED action', () => {
    const { type, payload } = CacheActions.fetchImageFailed('failed!');
    expect(type).toEqual(FETCH_IMAGE_FAILED);
    expect(payload).toEqual({ message: 'failed!' });
  });

  it('should create the HYDRATE_CACHE action', () => {
    const { type, payload } = CacheActions.hydrateCache({});
    expect(type).toEqual(HYDRATE_CACHE);
    expect(payload).toEqual({ cache: {} });
  });

  it('should create the PLAY_AUDIO action', () => {
    const { type, payload } = CacheActions.playAudio('foobar');
    expect(type).toEqual(PLAY_AUDIO);
    expect(payload).toEqual({ uri: 'foobar' });
  });

  it('should create the PLAY_AUDIO_FAILED action', () => {
    const { type, payload } = CacheActions.playAudioFailed('failed!');
    expect(type).toEqual(PLAY_AUDIO_FAILED);
    expect(payload).toEqual({ message: 'failed!' });
  });
});
