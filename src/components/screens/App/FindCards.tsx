import { Container, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { PaddedContent } from 'components/styled';

export default class InitialScreen extends React.Component<{}> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Find Cards',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    return (
      <Container>
        <PaddedContent>
          <Text>No cards to find.</Text>
        </PaddedContent>
      </Container>
    );
  }
}
