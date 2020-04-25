import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { SetsActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Card, Deck } from 'reducer/entities';

export const AddSetScreen = React.memo(() => {
  const [name, setName] = React.useState('');
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const loading = useSelector<TRState, boolean>(state => state.ui.addSetScreen.loading);
  const deck = useSelector<TRState, Deck | undefined>(
    state => state.ui.deckDetailsScreen.selectedDeck,
  );
  const cards = useSelector<TRState, Card[]>(state => state.ui.addSetScreen.cards);

  if (!deck) {
    return <Text>No deck! Must be a bug.</Text>;
  }

  const content = loading ? <Spinner /> : (
    <Form>
      <Item>
        <Input
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
      </Item>
      <SubmitButton
        block={true}
        onPress={() => dispatch(
          SetsActions.addSet(deck.id, name, cards.map(({ id }: Card) => id)),
        )}
      >
        <Text>Create Set</Text>
      </SubmitButton>
    </Form>
  );

  return (
    <Container>
      <PaddedContent>
        {content}
      </PaddedContent>
    </Container>
  );
});

// @ts-ignore
AddSetScreen.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Create Set',
};

export default AddSetScreen;
