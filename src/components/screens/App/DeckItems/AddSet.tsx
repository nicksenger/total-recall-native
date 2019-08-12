import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';

import { SetsActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card, Deck } from 'reducer/entities';

export interface AddSetScreenProps {
  addSet: typeof SetsActions['addSet'];
  cards: Card[];
  loading: boolean;
  deck?: Deck;
}

export const AddSetScreen = ({ addSet, cards, loading, deck }: AddSetScreenProps) => {
  const [name, setName] = React.useState('');

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
        onPress={() => addSet(deck.id, name, cards.map(({ id }: Card) => id))}
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
};

const connected = connect(
  ({ ui }: TRState) => ({
    cards: ui.addSetScreen.cards,
    deck: ui.deckDetailsScreen.selectedDeck,
    loading: ui.addSetScreen.loading,
  }),
  { addSet: SetsActions.addSet },
)(React.memo(AddSetScreen));

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
  title: 'Create Set',
};

export default connected;
