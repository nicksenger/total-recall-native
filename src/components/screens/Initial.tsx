import * as Font from 'expo-font';
import { Container, Content, Header, Spinner } from 'native-base';
import * as React from 'react';

import { AuthenticationActions } from 'actions';
import { connect } from 'react-redux';

export interface InitialScreenProps {
  retrieveAuthInfo: typeof AuthenticationActions.retrieveAuthInfo;
}

export interface InitialScreenState {
  loaded: boolean;
}

const InitialScreen = ({ retrieveAuthInfo }: InitialScreenProps) => {
  const [loaded, setLoaded] = React.useState(false);
  React.useEffect(
    () => {
      Font.loadAsync({
        Ionicons: require('../../../node_modules/native-base/Fonts/Ionicons.ttf'),
        Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      }).then(() => {
        setLoaded(true);
        retrieveAuthInfo();
      });
    },
  );

  if (loaded) {
    return (
      <Container>
        <Header />
        <Content>
          <Spinner />
        </Content>
      </Container>
    );
  }
  return null;
};

const connected = connect(
  () => ({}),
  { retrieveAuthInfo: AuthenticationActions.retrieveAuthInfo },
)(React.memo(InitialScreen));

// @ts-ignore
connected.navigationOptions = {
  title: 'Initializing',
};

export default connected;
