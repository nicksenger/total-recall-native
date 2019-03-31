import Burger from 'components/Burger';
import { PaddedContent } from 'components/styled';
import { Container, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

export default class UserManual extends React.Component<{}> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerRight: <Burger />,
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'User Manual',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    return (
      <Container>
        <PaddedContent>
          <Text>Total Recall allows you to organize, share, and study language flashcards.</Text>
          <Text>I'm too lazy to write this up right now, but will soon.</Text>
        </PaddedContent>
      </Container>
    );
  }
}
