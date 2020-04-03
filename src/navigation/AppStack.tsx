import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
  createBottomTabNavigator,
  createDrawerNavigator,
  createStackNavigator,
  DrawerNavigatorConfig,
} from 'react-navigation';

import {
  ADD_CARD_SCREEN,
  ADD_DECK_SCREEN,
  ADD_SET_SCREEN,
  CARD_DETAILS_SCREEN,
  CARD_LINK_SCREEN,
  DECK_DETAILS_SCREEN,
  DECK_ITEMS_SCREEN,
  DECKS_SCREEN,
  EDIT_CARD_LINK_SCREEN,
  MAIN_APP,
  SET_DETAILS_SCREEN,
  STUDY_SCREEN,
  USER_MANUAL,
} from '_constants/screens';
import DrawerContent from 'components/DrawerContent';
import DeckItemsScreen from 'components/screens/App/DeckItems';
import AddCardScreen from 'components/screens/App/DeckItems/AddCard';
import AddSetScreen from 'components/screens/App/DeckItems/AddSet';
import CardDetailsScreen from 'components/screens/App/DeckItems/CardDetails';
import CardLinkScreen from 'components/screens/App/DeckItems/CardLink';
import EditCardLinkScreen from 'components/screens/App/DeckItems/EditCardLink';
import SetDetailsScreen from 'components/screens/App/DeckItems/SetDetails';
import DecksScreen from 'components/screens/App/Decks';
import AddDeckScreen from 'components/screens/App/Decks/AddDeck';
import DeckDetailsScreen from 'components/screens/App/Decks/DeckDetails';
import StudyScreen from 'components/screens/App/Study';
import UserManual from 'components/screens/App/UserManual';

const DecksStack = createStackNavigator(
  {
    [ADD_CARD_SCREEN]: AddCardScreen,
    [ADD_DECK_SCREEN]: AddDeckScreen,
    [ADD_SET_SCREEN]: AddSetScreen,
    [CARD_DETAILS_SCREEN]: CardDetailsScreen,
    [EDIT_CARD_LINK_SCREEN]: EditCardLinkScreen,
    [DECK_DETAILS_SCREEN]: DeckDetailsScreen,
    [DECK_ITEMS_SCREEN]: DeckItemsScreen,
    [DECKS_SCREEN]: DecksScreen,
    [SET_DETAILS_SCREEN]: SetDetailsScreen,
  },
  {
    initialRouteName: DECKS_SCREEN,
  },
);

const StudyStack = createStackNavigator(
  {
    [CARD_LINK_SCREEN]: CardLinkScreen,
    StudyScreen,
  },
  {
    initialRouteName: 'StudyScreen',
  },
);

const App = createBottomTabNavigator(
  {
    'My Decks': DecksStack,
    [STUDY_SCREEN]: StudyStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        switch (navigation.state.routeName) {
          case 'My Decks':
            return <Ionicons name="ios-apps" size={25} color={focused ? '#1f6899' : 'black'} />;
          default:
            return <Ionicons name="md-pulse" size={25} color={focused ? '#1f6899' : 'black'} />;
        }
      },
    }),
  },
);

const drawerConfig = {
  contentComponent: DrawerContent,
  drawerPosition: 'right',
} as unknown as DrawerNavigatorConfig;

export default createDrawerNavigator(
  {
    [MAIN_APP]: { screen: App },
    [USER_MANUAL]: createStackNavigator({ UserManual }),
  },
  drawerConfig,
);
