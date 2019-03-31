import { Ionicons } from '@expo/vector-icons';
import { MAIN_APP, USER_MANUAL } from '_constants/screens';
import { AuthenticationActions } from 'actions';
import { Left, List, ListItem, Right, Text } from 'native-base';
import { navigate } from 'navigation/service';
import * as React from 'react';
import { Image, View } from 'react-native';
import { connect } from 'react-redux';
import { TRState } from 'reducer';

export interface DrawerContentProps {
  activeItemKey: string;
  gotoApp: () => void;
  gotoManual: () => void;
  logout: typeof AuthenticationActions.logout;
  username?: string;
}

export const DrawerContent = ({
  activeItemKey,
  gotoApp,
  gotoManual,
  logout,
  username,
}: DrawerContentProps) => (
  <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }} >
    <Image
      resizeMode={'cover'}
      source={require('assets/drawer.png')}
      style={{ height: 200, width: '100%' }}
    />
    <List>
      <ListItem onPress={gotoApp}>
        <Left>
          <Text
            style={{
              color: activeItemKey === MAIN_APP ?
                '#1f6899' : 'black',
            }}
          >
            Total Recall
          </Text>
        </Left>
        <Right>
          <Ionicons
            name="md-browsers"
            size={25}
            style={{
              color: activeItemKey === MAIN_APP ?
                '#1f6899' : 'black',
            }}
          />
        </Right>
      </ListItem>
      <ListItem onPress={gotoManual}>
        <Left>
          <Text
            style={{
              color: activeItemKey === USER_MANUAL ?
                '#1f6899' : 'black',
            }}
          >
            User Manual
          </Text>
        </Left>
        <Right>
          <Ionicons
            name="md-clipboard"
            size={25}
            style={{
              color: activeItemKey === USER_MANUAL ?
                '#1f6899' : 'black',
            }}
          />
        </Right>
      </ListItem>
      <ListItem onPress={logout}>
        <Left>
          <Text>Sign Out ({username})</Text>
        </Left>
        <Right>
          <Ionicons name="md-person" size={25} />
        </Right>
      </ListItem>
    </List>
  </View>
);

export default connect(
  ({ authentication }: TRState) => ({
    gotoApp: () => { navigate(MAIN_APP); },
    gotoManual: () => { navigate(USER_MANUAL); },
    username: authentication.username,
  }),
  { logout: AuthenticationActions.logout },
)(DrawerContent);
