import { combineReducers } from 'redux';

import authentication, { AuthenticationState } from './authentication';
import cache, { CacheState } from './cache';
import entities, { EntitiesState } from './entities';
import session, { SessionState } from './session';
import ui, { UIState } from './ui';

export interface TRState {
  authentication: AuthenticationState;
  cache: CacheState;
  entities: EntitiesState;
  session: SessionState;
  ui: UIState;
}

export default combineReducers({
  authentication,
  cache,
  entities,
  session,
  ui,
});
