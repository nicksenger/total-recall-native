import { combineReducers } from 'redux';

import addCardScreen, { AddCardScreenState } from './addCardScreen';
import addDeckScreen, { AddDeckScreenState } from './addDeckScreen';
import addSetScreen, { AddSetScreenState } from './addSetScreen';
import cardDetailsScreen, { CardDetailsScreenState } from './cardDetailsScreen';
import cardsScreen, { CardsScreenState } from './cardsScreen';
import decksScreen, { DecksScreenState } from './decksScreen';
import setDetailsScreen, { SetDetailsScreenState } from './setDetailsScreen';
import setsScreen, { SetsScreenState } from './setsScreen';

export interface UIState {
  addCardScreen: AddCardScreenState;
  addDeckScreen: AddDeckScreenState;
  addSetScreen: AddSetScreenState;
  cardDetailsScreen: CardDetailsScreenState;
  cardsScreen: CardsScreenState;
  decksScreen: DecksScreenState;
  setsScreen: SetsScreenState;
  setDetailsScreen: SetDetailsScreenState;
}

export default combineReducers({
  addCardScreen,
  addDeckScreen,
  addSetScreen,
  cardDetailsScreen,
  cardsScreen,
  decksScreen,
  setDetailsScreen,
  setsScreen,
});
