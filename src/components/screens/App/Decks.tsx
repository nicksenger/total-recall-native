import { Ionicons } from '@expo/vector-icons';
import { Container, Fab, Left, List, ListItem, Right, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { DecksActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';

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
        {this.props.decks.map(deck => (
          <ListItem key={deck.id}>
            <Left>
              <Text>{deck.name}</Text>
            </Left>
            <Right>
              <Ionicons name="md-arrow-forward" size={25} color="black" />
            </Right>
          </ListItem>
        ))}
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
            style={{ backgroundColor: '#1f6899' }}
            position="bottomRight"
          >
            <Ionicons name="md-add" size={25} />
          </Fab>
        )}
      </Container>
    );
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
