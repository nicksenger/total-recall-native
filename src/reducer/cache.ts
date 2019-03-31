import { ADD_TO_CACHE, HYDRATE_CACHE, TRActions } from 'actions';

export interface CacheState {
  cache: {
    [uri: string]: string;
  };
}

export const initialState: CacheState = { cache: {} };

export default (state: CacheState = initialState, action: TRActions): CacheState => {
  switch (action.type) {
    case ADD_TO_CACHE:
      return {
        ...state,
        cache: {
          ...state.cache,
          [action.payload.uri]: action.payload.path,
        },
      };

    case HYDRATE_CACHE:
      return {
        ...state,
        cache: action.payload.cache,
      };

    default:
      return state;
  }
};
