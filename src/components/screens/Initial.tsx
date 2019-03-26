import { Font } from 'expo';
import { Container, Content, Header, Spinner } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

interface InitialScreenState {
  loaded: boolean;
}

export default class InitialScreen extends React.Component<{}, InitialScreenState> {
  public static navigationOptions: NavigationTabScreenOptions = {
    title: 'Initializing',
  };

  public state: InitialScreenState = {
    loaded: false,
  };

  public async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
    });

    this.setState({ loaded: true });
  }

  public render() {
    if (this.state.loaded) {
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
  }
}
