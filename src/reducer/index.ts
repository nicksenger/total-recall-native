import { combineReducers } from 'redux';

import authentication, { AuthenticationState } from './authentication';
import entities, { EntitiesState } from './entities';
import session, { SessionState } from './session';
import ui, { UIState } from './ui';

export interface TRState {
  authentication: AuthenticationState;
  entities: EntitiesState;
  session: SessionState;
  ui: UIState;
}

export default combineReducers({
  authentication,
  entities,
  session,
  ui,
});
