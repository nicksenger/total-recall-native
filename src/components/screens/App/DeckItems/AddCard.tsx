import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';

import { CardsActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';

export interface AddCardScreenProps {
  addCard: typeof CardsActions['addCard'];
  loading: boolean;
  deck?: Deck;
}

const AddCardScreen = ({ addCard, loading, deck }: AddCardScreenProps) => {
  const [front, setFront] = React.useState('');
  const [back, setBack] = React.useState('');
  const [link, setLink] = React.useState('');

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
        onPress={() => addCard(deck.id, front, back, link ? link : undefined)}
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
};

const connected = connect(
  ({ ui }: TRState) => ({
    deck: ui.deckDetailsScreen.selectedDeck,
    loading: ui.addCardScreen.loading,
  }),
  { addCard: CardsActions.addCard },
)(React.memo(AddCardScreen));

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
  title: 'Add Card',
};

export default connected;
