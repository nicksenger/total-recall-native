import { Body, Card, CardItem, Container, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import Burger from 'components/Burger';
import { PaddedContent } from 'components/styled';

export default class InitialScreen extends React.Component<{}> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerRight: <Burger />,
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
          <Card>
              <CardItem header={true}>
                <Text>Not Implemented</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>
                    Browsing other users' cards has not been implemented yet. Check back soon!
                  </Text>
                </Body>
              </CardItem>
          </Card>
        </PaddedContent>
      </Container>
    );
  }
}
