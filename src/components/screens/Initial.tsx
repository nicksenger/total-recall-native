import * as Font from 'expo-font';
import { Container, Content, Header, Spinner } from 'native-base';
import * as React from 'react';

import { AuthenticationActions, TRActions } from 'actions';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

export interface InitialScreenState {
  loaded: boolean;
}

const InitialScreen = React.memo(() => {
  const [loaded, setLoaded] = React.useState(false);
  const dispatch = useDispatch<Dispatch<TRActions>>();
  React.useEffect(
    () => {
      Font.loadAsync({
        Ionicons: require('../../../node_modules/native-base/Fonts/Ionicons.ttf'),
        Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
        Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
      }).then(() => {
        setLoaded(true);
        dispatch(AuthenticationActions.retrieveAuthInfo());
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
});

// @ts-ignore
InitialScreen.navigationOptions = {
  title: 'Initializing',
};

export default InitialScreen;
