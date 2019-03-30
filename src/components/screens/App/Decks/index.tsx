import { Ionicons } from '@expo/vector-icons';
import { Container, Fab, List, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { ADD_DECK_SCREEN } from '_constants/screens';
import { DecksActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { navigate } from 'navigation/service';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';
import DeckItem from './DeckItem';

export interface DecksScreenProps {
  decks: Deck[];
  getDecks: typeof DecksActions.getDecks;
  loading: boolean;
  username?: string;
}

export class DecksScreen extends React.Component<DecksScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'My Decks',
  } as unknown as NavigationTabScreenOptions;

  public componentDidMount() {
    if (this.props.username) {
      this.props.getDecks(this.props.username);
    }
  }

  public render() {
    const content = this.props.loading ? <Spinner /> : (
      <List>
        {this.props.decks.map(deck => <DeckItem deck={deck} key={deck.id} />)}
      </List>
    );

    if (!this.props.username) {
      return <Text>No user! Must be a bug.</Text>;
    }

    return (
      <Container>
        <PaddedContent>
          {content}
        </PaddedContent>
        {!this.props.loading && (
          <Fab
            containerStyle={{ }}
            onPress={this.handleAddDeck}
            style={{ backgroundColor: '#1f6899' }}
            position="bottomRight"
          >
            <Ionicons name="md-add" size={25} />
          </Fab>
        )}
      </Container>
    );
  }

  private handleAddDeck = () => {
    navigate(ADD_DECK_SCREEN);
  }
}

export default connect(
  ({ authentication, entities, ui }: TRState) => {
    const { username } = authentication;
    const decks = username ?
      Object.keys(entities.decks)
        .map((id: string) => entities.decks[parseInt(id, 10)])
        .filter(deck => deck.owner === username) : [];

    return {
      decks,
      loading: ui.decksScreen.loading,
      username,
    };
  },
  { getDecks: DecksActions.getDecks },
)(DecksScreen);
