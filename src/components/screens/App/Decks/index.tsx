import { Ionicons } from '@expo/vector-icons';
import { Container, Fab, List, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';

import { ADD_DECK_SCREEN } from '_constants/screens';
import { DecksActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent } from 'components/styled';
import { navigate, setDrawerNavigator } from 'navigation/service';
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

const DecksScreen = ({ decks, getDecks, loading, username }: DecksScreenProps) => {
  React.useEffect(
    () => {
      if (username) {
        getDecks(username);
      }
    },
    [username],
  );

  const content = loading ? <Spinner /> : (
    <List>
      {decks.map(deck => <DeckItem deck={deck} key={deck.id} />)}
    </List>
  );

  if (!username) {
    return <Text>No user! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        {content}
      </PaddedContent>
      {!loading && (
        <Fab
          containerStyle={{ }}
          onPress={() => navigate(ADD_DECK_SCREEN)}
          style={{ backgroundColor: '#1f6899' }}
          position="bottomRight"
        >
          <Ionicons name="md-add" size={25} />
        </Fab>
      )}
    </Container>
  );
};

const connected = connect(
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
)(React.memo(DecksScreen));

// @ts-ignore
connected.navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => {
  setDrawerNavigator(navigation);
  return {
    headerRight: <Burger />,
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'My Decks',
  };
};

export default connected;
