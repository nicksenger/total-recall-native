import { combineEpics } from 'redux-observable';

import authentication from './authentication';
import cache from './cache';
import cards from './cards';
import decks from './decks';
import session from './session';
import sets from './sets';

export default combineEpics(
  authentication,
  cache,
  cards,
  decks,
  session,
  sets,
);
