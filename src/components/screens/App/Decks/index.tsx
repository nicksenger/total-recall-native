import { Ionicons } from '@expo/vector-icons';
import { Container, Fab, List, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationScreenProps } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { ADD_DECK_SCREEN } from '_constants/screens';
import { DecksActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent } from 'components/styled';
import { navigate, setDrawerNavigator } from 'navigation/service';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';
import DeckItem from './DeckItem';

const DecksScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const username = useSelector<TRState, string | undefined>(state => state.authentication.username);
  const loading = useSelector<TRState, boolean>(({ ui }) => ui.decksScreen.loading);
  const decks = useSelector<TRState, Deck[]>(
    ({ entities }) => username ?
      Object.keys(entities.decks)
        .map((id: string) => entities.decks[parseInt(id, 10)])
        .filter(deck => deck.owner === username) : [],
  );

  React.useEffect(
    () => {
      if (username) {
        dispatch(DecksActions.getDecks(username));
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
});

// @ts-ignore
DecksScreen.navigationOptions = ({ navigation }: NavigationScreenProps<{}>) => {
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

export default DecksScreen;
