import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Tab, TabHeading, Tabs, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Deck } from 'reducer/entities';

import Burger from 'components/Burger';
import { TRState } from 'reducer';
import Cards from './Cards';
import Sets from './Sets';

export interface DeckDetailsScreenProps {
  deck?: Deck;
  username?: string;
}

export class DeckDetailsScreen extends React.PureComponent<DeckDetailsScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerRight: <Burger />,
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Deck Items',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    const content = this.props.deck ? (
      <Tabs style={{ backgroundColor: '#2a5687' }}>
        <Tab
          heading={
            <TabHeading>
              <Text>
                <MaterialCommunityIcons name="cards-outline" size={25} color="white" />
                {'  '}Cards
              </Text>
            </TabHeading>
          }
        >
          <Cards deck={this.props.deck} />
        </Tab>
        <Tab
          heading={
            <TabHeading>
              <Text>
                <FontAwesome name="clone" size={25} color="white" />
                {'  '}Sets
              </Text>
            </TabHeading>
          }
        >
          <Sets deck={this.props.deck} />
        </Tab>
      </Tabs>
    ) : <Text>No deck! Must be a bug.</Text>;

    if (!this.props.username) {
      return <Text>No user! Must be a bug.</Text>;
    }

    return (
      <Container>
        {content}
      </Container>
    );
  }
}

export default connect(
  ({ authentication, ui }: TRState) => ({
    deck: ui.deckDetailsScreen.selectedDeck,
    username: authentication.username,
  }),
)(DeckDetailsScreen);
