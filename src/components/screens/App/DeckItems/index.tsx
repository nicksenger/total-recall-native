import { Container, Tab, Tabs, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';
import { Deck } from 'reducer/entities';

import { TRState } from 'reducer';
import Cards from './Cards';
import Sets from './Sets';

export interface DeckDetailsScreenProps {
  deck?: Deck;
  username?: string;
}

export class DeckDetailsScreen extends React.Component<DeckDetailsScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
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
      <Tabs>
        <Tab heading="Cards">
          <Cards deck={this.props.deck} />
        </Tab>
        <Tab heading="Sets">
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
