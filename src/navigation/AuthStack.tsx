import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';

import { LOGIN_SCREEN, REGISTER_SCREEN } from '_constants/screens';
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
    [REGISTER_SCREEN]: RegistrationStack,
    [LOGIN_SCREEN]: SignInStack,
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) =>
        navigation.state.routeName === LOGIN_SCREEN ?
          <Ionicons name="md-key" size={25} color={focused ? '#1f6899' : 'black'} /> :
          <Ionicons name="md-person-add" size={25} color={focused ? '#1f6899' : 'black'} />,
    }),
  },
);
