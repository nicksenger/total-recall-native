import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { DecksActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';

export const DeckDetailsScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const deck = useSelector<TRState, Deck | undefined>(
    ({ ui }) => ui.deckDetailsScreen.selectedDeck,
  );

  if (!deck) {
    return <Text>No deck! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        <Form>
          <Text>Name: {deck.name}</Text>
          <Text>Language: {deck.language}</Text>
          <SubmitButton block={true} onPress={() => handleDelete()}>
            <Text>Delete Deck</Text>
          </SubmitButton>
        </Form>
      </PaddedContent>
    </Container>
  );

  function handleDelete() {
    if (deck) {
      Alert.alert(
        'Delete Deck',
        `Are you sure you want to delete deck: "${deck.name}"?` +
        ' All of its cards and sets will also be deleted.',
        [
          { text: 'No' },
          {
            onPress: () => dispatch(DecksActions.deleteDeck(deck.id)),
            text: 'Yes',
          },
        ],
      );
    }
  }
});

// @ts-ignore
connected.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Deck Details',
};

export default connected;
