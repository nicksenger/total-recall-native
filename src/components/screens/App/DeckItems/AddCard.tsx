import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';

import { CardsActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { useDispatch, useSelector } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';
import { Dispatch } from 'redux';

const AddCardScreen = React.memo(() => {
  const [front, setFront] = React.useState('');
  const [back, setBack] = React.useState('');
  const [link, setLink] = React.useState('');
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const deck = useSelector<TRState, Deck | undefined>(
    state => state.ui.deckDetailsScreen.selectedDeck,
  );
  const loading = useSelector<TRState, boolean>(
    state => state.ui.addCardScreen.loading,
  );

  if (!deck) {
    return <Text>No deck! Must be a bug.</Text>;
  }

  const content = loading ? <Spinner /> : (
    <Form>
      <Item>
        <Input
          placeholder="Front"
          onChangeText={setFront}
          value={front}
        />
      </Item>
      <Item last={true}>
        <Input
          placeholder="Back"
          onChangeText={setBack}
          value={back}
        />
      </Item>
      <Item last={true}>
        <Input
          placeholder="Link (optional)"
          onChangeText={setLink}
          value={link}
        />
      </Item>
      <SubmitButton
        block={true}
        onPress={() => dispatch(
          CardsActions.addCard(deck.id, front, back, link ? link : undefined),
        )}
      >
        <Text>Add Card</Text>
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
AddCardScreen.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Add Card',
};

export default AddCardScreen;
