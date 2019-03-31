import { ActionsUnion, createAction } from './_utils';

export const ADD_TO_CACHE = 'ADD_TO_CACHE';
export const ADD_TO_CACHE_FAILED = 'ADD_TO_CACHE_FAILED';
export const FETCH_IMAGE = 'FETCH_IMAGE';
export const FETCH_IMAGE_FAILED = 'FETCH_IMAGE_FAILED';
export const HYDRATE_CACHE = 'HYDRATE_CACHE';
export const PLAY_AUDIO = 'PLAY_AUDIO';
export const PLAY_AUDIO_FAILED = 'PLAY_AUDIO_FAILED';

export const CacheActions = {
  addToCache: (uri: string, path: string) => createAction(ADD_TO_CACHE, { uri, path }),
  addToCacheFailed: (message: string) => createAction(ADD_TO_CACHE_FAILED, { message }),
  fetchImage: (uri: string) => createAction(FETCH_IMAGE, { uri }),
  fetchImageFailed: (message: string) => createAction(FETCH_IMAGE_FAILED, { message }),
  hydrateCache: (cache: {[uri: string]: string}, auth?: { token: string, username: string }) =>
    createAction(HYDRATE_CACHE, { auth, cache }),
  playAudio: (uri: string) => createAction(PLAY_AUDIO, { uri }),
  playAudioFailed: (message: string) => createAction(PLAY_AUDIO_FAILED, { message }),
};

export type CacheActions = ActionsUnion<typeof CacheActions>;
