import { combineEpics, ofType } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { catchError, filter, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { DECKS_SCREEN, REGISTER_SCREEN } from '_constants/screens';
import { downloadAsync, getMediaDir, playAudio } from '_utils/media';
import { saveCache } from '_utils/sync';
import {
  ADD_TO_CACHE,
  CacheActions,
  FETCH_IMAGE,
  HYDRATE_CACHE,
  PLAY_AUDIO,
  TRActions,
} from 'actions';
import { navigate } from 'navigation/service';
import { TRState } from 'reducer';

export const addToCacheEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CacheActions['addToCache']>>(ADD_TO_CACHE),
  withLatestFrom(state$),
  mergeMap(([, { cache }]) => saveCache(cache.cache).pipe(
    filter(() => false),
    catchError((e: Error) => of(CacheActions.addToCacheFailed(e.message))),
  )),
);

export const fetchImageEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CacheActions['fetchImage']>>(FETCH_IMAGE),
  mergeMap(({ payload: { uri } }) => {
    const filename = uri.split('/').pop();
    const path = `${getMediaDir()}${filename}`;
    return downloadAsync(uri, path).pipe(
      map(() => CacheActions.addToCache(uri, path)),
      catchError((e: Error) => of(CacheActions.fetchImageFailed(e.message))),
    );
  }),
);

export const hydrateCacheEpic = (action$: Observable<TRActions>) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CacheActions['hydrateCache']>>(HYDRATE_CACHE),
  tap(({ payload: { auth } }) => {
    if (auth) {
      navigate(DECKS_SCREEN);
    } else {
      navigate(REGISTER_SCREEN);
    }
  }),
  filter(() => false),
);

export const playAudioEpic = (
  action$: Observable<TRActions>,
  state$: Observable<TRState>,
) => action$.pipe(
  ofType<TRActions, ReturnType<typeof CacheActions['playAudio']>>(PLAY_AUDIO),
  withLatestFrom(state$),
  mergeMap(([{ payload: { uri } }, { cache }]) => {
    if (cache.cache[uri]) {
      return playAudio(cache.cache[uri]).pipe(
        filter(() => false),
        catchError((e: Error) => of(CacheActions.playAudioFailed(e.message))),
      );
    }

    const filename = uri.split('/').pop();
    const path = `${getMediaDir()}${filename}`;

    return downloadAsync(uri, path).pipe(
      mergeMap(() => playAudio(path).pipe(
        map(() => CacheActions.addToCache(uri, path)),
        catchError((e: Error) => of(CacheActions.playAudioFailed(e.message))),
      )),
      catchError((e: Error) => of(CacheActions.playAudioFailed(e.message))),
    );
  }),
);

export default combineEpics(
  addToCacheEpic,
  fetchImageEpic,
  hydrateCacheEpic,
  playAudioEpic,
);
