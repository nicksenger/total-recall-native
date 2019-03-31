import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

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

export interface AddSetScreenState {
  name: string;
}

export class AddSetScreen extends React.Component<AddSetScreenProps, AddSetScreenState> {
  public static navigationOptions: NavigationTabScreenOptions = {
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
  } as unknown as NavigationTabScreenOptions;

  public state: AddSetScreenState = { name: '' };

  public render() {
    if (!this.props.deck) {
      return <Text>No deck! Must be a bug.</Text>;
    }

    const content = this.props.loading ? <Spinner /> : (
      <Form>
        <Item>
          <Input
            placeholder="Name"
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </Item>
        <SubmitButton block={true} onPress={this.handleSubmit}>
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
  }

  private handleNameChange = (name: string) => {
    this.setState({ name });
  }

  private handleSubmit = () => {
    const { deck } = this.props;
    if (deck) {
      const { name } = this.state;
      this.props.addSet(deck.id, name, this.props.cards.map(({ id }: Card) => id));
    }
  }
}

export default connect(
  ({ ui }: TRState) => ({
    cards: ui.addSetScreen.cards,
    deck: ui.deckDetailsScreen.selectedDeck,
    loading: ui.addSetScreen.loading,
  }),
  { addSet: SetsActions.addSet },
)(AddSetScreen);
