import { Ionicons } from '@expo/vector-icons';
import { Left, List, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { Image, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { MAIN_APP, USER_MANUAL } from '_constants/screens';
import { AuthenticationActions, TRActions } from 'actions';
import { navigate } from 'navigation/service';
import { TRState } from 'reducer';

export interface DrawerContentProps {
  activeItemKey: string;
  gotoApp: () => void;
  gotoManual: () => void;
  logout: typeof AuthenticationActions.logout;
  username?: string;
}

export default React.memo(({
  activeItemKey,
}: DrawerContentProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const username = useSelector<TRState, string | undefined>(state => state.authentication.username);

  return (
    <View style={{ flexDirection: 'column', justifyContent: 'flex-start' }} >
      <Image
        resizeMode={'cover'}
        source={require('assets/drawer.png')}
        style={{ height: 200, width: '100%' }}
      />
      <List>
        <ListItem onPress={() => navigate(MAIN_APP)}>
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
        <ListItem onPress={() => navigate(USER_MANUAL)}>
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
        <ListItem onPress={() => dispatch(AuthenticationActions.logout())}>
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
});
