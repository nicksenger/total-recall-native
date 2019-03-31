import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import {
  ADD_CARD_SCREEN,
  ADD_DECK_SCREEN,
  ADD_SET_SCREEN,
  CARD_DETAILS_SCREEN,
  DECK_DETAILS_SCREEN,
  DECK_ITEMS_SCREEN,
  DECKS_SCREEN,
  SET_DETAILS_SCREEN,
  STUDY_SCREEN,
} from '_constants/screens';
import DeckItemsScreen from 'components/screens/App/DeckItems';
import AddCardScreen from 'components/screens/App/DeckItems/AddCard';
import AddSetScreen from 'components/screens/App/DeckItems/AddSet';
import CardDetailsScreen from 'components/screens/App/DeckItems/CardDetails';
import SetDetailsScreen from 'components/screens/App/DeckItems/SetDetails';
import DecksScreen from 'components/screens/App/Decks';
import AddDeckScreen from 'components/screens/App/Decks/AddDeck';
import DeckDetailsScreen from 'components/screens/App/Decks/DeckDetails';
import FindCardsScreen from 'components/screens/App/FindCards';
import StudyScreen from 'components/screens/App/Study';

const FindStack = createStackNavigator({
  FindCardsScreen,
});

const DecksStack = createStackNavigator(
  {
    [ADD_CARD_SCREEN]: AddCardScreen,
    [ADD_DECK_SCREEN]: AddDeckScreen,
    [ADD_SET_SCREEN]: AddSetScreen,
    [CARD_DETAILS_SCREEN]: CardDetailsScreen,
    [DECK_DETAILS_SCREEN]: DeckDetailsScreen,
    [DECK_ITEMS_SCREEN]: DeckItemsScreen,
    [DECKS_SCREEN]: DecksScreen,
    [SET_DETAILS_SCREEN]: SetDetailsScreen,
  },
  {
    initialRouteName: DECKS_SCREEN,
  },
);

const StudyStack = createStackNavigator({
  StudyScreen,
});

export default createBottomTabNavigator(
  {
    'My Decks': DecksStack,
    [STUDY_SCREEN]: StudyStack,
    // tslint:disable-next-line:object-literal-sort-keys
    'Find Cards': FindStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (navigation.state.routeName) {
          case 'Find Cards':
            return <Ionicons name="md-search" size={25} color={focused ? '#1f6899' : 'black'} />;
          case 'My Decks':
            return <Ionicons name="ios-apps" size={25} color={focused ? '#1f6899' : 'black'} />;
          default:
            return <Ionicons name="md-pulse" size={25} color={focused ? '#1f6899' : 'black'} />;
        }
      },
    }),
  },
);
