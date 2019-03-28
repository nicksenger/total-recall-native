import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import DecksScreen from 'components/screens/App/Decks';
import FindCardsScreen from 'components/screens/App/FindCards';
import StudyScreen from 'components/screens/App/Study';

const FindStack = createStackNavigator({
  FindCardsScreen,
});

const DecksStack = createStackNavigator({
  DecksScreen,
});

const StudyStack = createStackNavigator({
  StudyScreen,
});

export default createBottomTabNavigator(
  {
    'Find Cards': FindStack,
    'My Decks': DecksStack,
    Study: StudyStack,
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
