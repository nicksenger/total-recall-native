import { combineEpics } from 'redux-observable';

import authentication from './authentication';
import cards from './cards';
import decks from './decks';
import session from './session';
import sets from './sets';

export default combineEpics(
  authentication,
  cards,
  decks,
  session,
  sets,
);
