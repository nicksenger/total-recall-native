import { Observable } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { CacheActions } from 'actions/cache';
import {
  addToCacheEpic,
  fetchImageEpic,
  hydrateCacheEpic,
  playAudioEpic,
} from './cache';

import { DECKS_SCREEN, REGISTER_SCREEN } from '_constants/screens';
import * as mediaUtils from '_utils/media';
import * as syncUtils from '_utils/sync';
import * as navigationService from 'navigation/service';
import reducer, { TRState } from 'reducer';

describe('the cache epics', () => {
  let mediaMock: jest.SpyInstance;
  let audioMock: jest.SpyInstance;
  let downloadMock: jest.SpyInstance;
  let saveCacheMock: jest.SpyInstance;
  let navigationMock: jest.SpyInstance;
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
    mediaMock = jest.spyOn(mediaUtils, 'getMediaDir');
    mediaMock.mockImplementation(() => '/some/dir/');
    audioMock = jest.spyOn(mediaUtils, 'playAudio');
    downloadMock = jest.spyOn(mediaUtils, 'downloadAsync');
    saveCacheMock = jest.spyOn(syncUtils, 'saveCache');
    navigationMock = jest.spyOn(navigationService, 'navigate');
    navigationMock.mockImplementation(() => 'mocked');
  });

  afterEach(() => {
    audioMock.mockReset();
    mediaMock.mockReset();
    downloadMock.mockReset();
    saveCacheMock.mockReset();
    navigationMock.mockReset();
  });

  describe('the addToCache epic', () => {
    describe('saving to the cache is successful', () => {
      it('should save to storage with entire cache', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('--a', {
            a: CacheActions.addToCache('foo', 'bar'),
          });

          const state$: Observable<TRState> = hot('-a', {
            a: {
              ...reducer(undefined, { type: 'init' }),
              cache: { cache: { foo: 'bar', waldo: 'fred' } },
            },
          });
          saveCacheMock.mockImplementation(() => cold('---a'));

          const output$ = addToCacheEpic(action$, state$);
          expectObservable(output$);
        });

        expect(saveCacheMock).toHaveBeenCalled();
        expect(saveCacheMock.mock.calls[0][0]).toEqual({ foo: 'bar', waldo: 'fred' });
      });
    });

    describe('saving to the cache fails', () => {
      it('should emit the failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('--a', {
            a: CacheActions.addToCache('foo', 'bar'),
          });

          const state$: Observable<TRState> = hot('-a', {
            a: {
              ...reducer(undefined, { type: 'init' }),
              cache: { cache: { foo: 'bar', waldo: 'fred' } },
            },
          });
          saveCacheMock.mockImplementation(() => cold('---#', {}, { message: 'failed!' }));

          const output$ = addToCacheEpic(action$, state$);
          expectObservable(output$).toBe('-----a', {
            a: CacheActions.addToCacheFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the fetch image epic', () => {
    describe('fetching the image is successful', () => {
      it('should emit the add to cache action with image details', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CacheActions.fetchImage('foo/bar/baz.jpg'),
          });

          downloadMock.mockImplementation(() => cold('--a'));

          const output$ = fetchImageEpic(action$);
          expectObservable(output$).toBe('---a', {
            a: CacheActions.addToCache('foo/bar/baz.jpg', '/some/dir/baz.jpg'),
          });
        });
      });
    });

    describe('fetching the image fails', () => {
      it('should emit the fetch image failed action', () => {
        scheduler.run(({ hot, cold, expectObservable }) => {
          const action$ = hot('-a', {
            a: CacheActions.fetchImage('foo/bar/baz.jpg'),
          });

          downloadMock.mockImplementation(() => cold('--#', {}, { message: 'failed!' }));

          const output$ = fetchImageEpic(action$);
          expectObservable(output$).toBe('---a', {
            a: CacheActions.fetchImageFailed('failed!'),
          });
        });
      });
    });
  });

  describe('the hydrate cache epic', () => {
    describe('the auth info was retrieved', () => {
      it('should navigate the the decks page', () => {
        scheduler.run(({ hot, expectObservable }) => {
          const action$ = hot('-a', {
            a: CacheActions.hydrateCache({}, { username: 'foo', token: 'bar' }),
          });

          const output$ = hydrateCacheEpic(action$);
          expectObservable(output$);
        });

        expect(navigationMock).toHaveBeenCalled();
        expect(navigationMock.mock.calls[0][0]).toEqual(DECKS_SCREEN);
      });
    });

    describe('the auth info was not retrieved', () => {
      it('should navigate to the register screen', () => {
        scheduler.run(({ hot, expectObservable }) => {
          const action$ = hot('-a', {
            a: CacheActions.hydrateCache({}),
          });

          const output$ = hydrateCacheEpic(action$);
          expectObservable(output$);
        });

        expect(navigationMock).toHaveBeenCalled();
        expect(navigationMock.mock.calls[0][0]).toEqual(REGISTER_SCREEN);
      });
    });
  });

  describe('the play audio epic', () => {
    describe('the file is already in the cache', () => {
      describe('playing the audio file is successful', () => {
        it('should play the audio from the cache', () => {
          scheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('--a', {
              a: CacheActions.playAudio('baz.mp3'),
            });

            const state$: Observable<TRState> = hot('-a', {
              a: {
                ...reducer(undefined, { type: 'init' }),
                cache: { cache: { 'baz.mp3': 'foo.mp3' } },
              },
            });
            audioMock.mockImplementation(() => cold('---a'));

            const output$ = playAudioEpic(action$, state$);
            expectObservable(output$);
          });

          expect(audioMock).toHaveBeenCalled();
          expect(audioMock.mock.calls[0][0]).toEqual('foo.mp3');
        });
      });

      describe('playing the audio file fails', () => {
        it('should emit the failed action', () => {
          scheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('--a', {
              a: CacheActions.playAudio('baz.mp3'),
            });

            const state$: Observable<TRState> = hot('-a', {
              a: {
                ...reducer(undefined, { type: 'init' }),
                cache: { cache: { 'baz.mp3': 'foo.mp3' } },
              },
            });
            audioMock.mockImplementation(() => cold('---#', {}, { message: 'failed!' }));

            const output$ = playAudioEpic(action$, state$);
            expectObservable(output$).toBe('-----a', {
              a: CacheActions.playAudioFailed('failed!'),
            });
          });
        });
      });
    });

    describe('the file is not yet in the cache', () => {
      describe('fetching the audio file is successful', () => {
        describe('playing the audio file is successful', () => {
          it('should play the audio from the cache', () => {
            scheduler.run(({ hot, cold, expectObservable }) => {
              const action$ = hot('--a', {
                a: CacheActions.playAudio('foo/bar/baz.mp3'),
              });

              const state$: Observable<TRState> = hot('-a', {
                a: {
                  ...reducer(undefined, { type: 'init' }),
                  cache: { cache: {} },
                },
              });
              downloadMock.mockImplementation(() => cold('-a'));
              audioMock.mockImplementation(() => cold('-a'));

              const output$ = playAudioEpic(action$, state$);
              expectObservable(output$);
            });

            expect(audioMock).toHaveBeenCalled();
            expect(audioMock.mock.calls[0][0]).toEqual('/some/dir/baz.mp3');
          });
        });

        describe('playing the audio file fails', () => {
          it('should emit the failed action', () => {
            scheduler.run(({ hot, cold, expectObservable }) => {
              const action$ = hot('--a', {
                a: CacheActions.playAudio('baz.mp3'),
              });

              const state$: Observable<TRState> = hot('-a', {
                a: {
                  ...reducer(undefined, { type: 'init' }),
                  cache: { cache: {} },
                },
              });
              downloadMock.mockImplementation(() => cold('-a'));
              audioMock.mockImplementation(() => cold('-#', {}, { message: 'failed!' }));

              const output$ = playAudioEpic(action$, state$);
              expectObservable(output$).toBe('----a', {
                a: CacheActions.playAudioFailed('failed!'),
              });
            });
          });
        });
      });

      describe('fetching the audio file fails', () => {
        it('should emit the failed action', () => {
          scheduler.run(({ hot, cold, expectObservable }) => {
            const action$ = hot('--a', {
              a: CacheActions.playAudio('baz.mp3'),
            });

            const state$: Observable<TRState> = hot('-a', {
              a: {
                ...reducer(undefined, { type: 'init' }),
                cache: { cache: {} },
              },
            });
            downloadMock.mockImplementation(() => cold('---#', {}, { message: 'failed!' }));

            const output$ = playAudioEpic(action$, state$);
            expectObservable(output$).toBe('-----a', {
              a: CacheActions.playAudioFailed('failed!'),
            });
          });
        });
      });
    });
  });
});
