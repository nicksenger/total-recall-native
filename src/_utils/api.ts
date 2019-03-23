import { StateObservable } from 'redux-observable';
import { ajax, AjaxResponse } from 'rxjs/ajax';

import { BASE_URI } from '_constants/api';
import { TRState } from 'reducer';
import { Observable, of } from 'rxjs';
import { mergeMap, withLatestFrom } from 'rxjs/operators';

const apiRequest = (
  method: 'GET' | 'PATCH' | 'POST' | 'DELETE',
  state$: StateObservable<TRState>,
  path: string,
  body?: object,
  headers?: object,
): Observable<AjaxResponse> =>
  (of({}).pipe(
    withLatestFrom<{}, [object, TRState]>(state$),
    mergeMap(([, { authentication }]) => {
      const fullPath = `${BASE_URI}${path}`;
      const modHeaders = {
        ...headers,
        Authorization: authentication.token
          ? `Token ${authentication.token}`
          : undefined,
      };

      switch (method) {
        case 'POST':
          return ajax.post(fullPath, body, modHeaders);
        case 'PATCH':
          return ajax.patch(fullPath, body, modHeaders);
        case 'DELETE':
          return ajax.delete(fullPath, modHeaders);
        default:
          return ajax.get(fullPath, modHeaders);
      }
    }),
  ) as unknown) as Observable<AjaxResponse>;

/**
 * GET request with the current credentials using the configured BASE_URI
 */
export const apiGet = (
  state$: StateObservable<TRState>,
  path: string,
  headers?: object,
) => apiRequest('GET', state$, path, undefined, headers);

/**
 * POST request with the current credentials using the configured BASE_URI
 */
export const apiPost = (
  state$: StateObservable<TRState>,
  path: string,
  body?: object,
  headers?: object,
) => apiRequest('POST', state$, path, body, headers);

/**
 * PATCH request with the current credentials using the configured BASE_URI
 */
export const apiPatch = (
  state$: StateObservable<TRState>,
  path: string,
  body?: object,
  headers?: object,
) => apiRequest('PATCH', state$, path, body, headers);

/**
 * DELETE request with the current credentials using the configured BASE_URI
 */
export const apiDelete = (
  state$: StateObservable<TRState>,
  path: string,
  headers?: object,
) => apiRequest('DELETE', state$, path, undefined, headers);
