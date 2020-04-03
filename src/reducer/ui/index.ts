import { combineReducers } from 'redux';

import addCardScreen, { AddCardScreenState } from './addCardScreen';
import addDeckScreen, { AddDeckScreenState } from './addDeckScreen';
import addSetScreen, { AddSetScreenState } from './addSetScreen';
import cardDetailsScreen, { CardDetailsScreenState } from './cardDetailsScreen';
import cardLinkScreen, { CardLinkScreenState } from './cardLinkScreen';
import cardsScreen, { CardsScreenState } from './cardsScreen';
import deckDetailsScreen, { DeckDetailsScreenState } from './deckDetailsScreen';
import decksScreen, { DecksScreenState } from './decksScreen';
import editCardLinkScreen, { EditCardLinkScreenState } from './editCardLinkScreen';
import registerScreen, { RegisterScreenState } from './registerScreen';
import setDetailsScreen, { SetDetailsScreenState } from './setDetailsScreen';
import setsScreen, { SetsScreenState } from './setsScreen';

export interface UIState {
  addCardScreen: AddCardScreenState;
  addDeckScreen: AddDeckScreenState;
  addSetScreen: AddSetScreenState;
  cardDetailsScreen: CardDetailsScreenState;
  cardLinkScreen: CardLinkScreenState;
  cardsScreen: CardsScreenState;
  deckDetailsScreen: DeckDetailsScreenState;
  decksScreen: DecksScreenState;
  editCardLinkScreen: EditCardLinkScreenState;
  registerScreen: RegisterScreenState;
  setsScreen: SetsScreenState;
  setDetailsScreen: SetDetailsScreenState;
}

export default combineReducers({
  addCardScreen,
  addDeckScreen,
  addSetScreen,
  cardDetailsScreen,
  cardLinkScreen,
  cardsScreen,
  deckDetailsScreen,
  decksScreen,
  editCardLinkScreen,
  registerScreen,
  setDetailsScreen,
  setsScreen,
});
