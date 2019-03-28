import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import RegisterScreen from 'components/screens/Auth/Register';
import SignInScreen from 'components/screens/Auth/SignIn';

const RegistrationStack = createStackNavigator({
  RegisterScreen,
});

const SignInStack = createStackNavigator({
  SignInScreen,
});

export default createBottomTabNavigator(
  {
    Register: RegistrationStack,
    'Sign In': SignInStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) =>
        navigation.state.routeName === 'Sign In' ?
          <Ionicons name="md-key" size={25} color={focused ? '#1f6899' : 'black'} /> :
          <Ionicons name="md-person-add" size={25} color={focused ? '#1f6899' : 'black'} />,
    }),
  },
);
