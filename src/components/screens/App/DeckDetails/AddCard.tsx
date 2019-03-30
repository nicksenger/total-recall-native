import { Container, Form, Input, Item, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { CardsActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';

export interface AddCardScreenProps {
  addCard: typeof CardsActions['addCard'];
  loading: boolean;
  deck?: Deck;
}

export interface AddCardScreenState {
  back: string;
  front: string;
}

export class AddCardScreen extends React.Component<AddCardScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Add Card',
  } as unknown as NavigationTabScreenOptions;

  public state: AddCardScreenState = { back: '', front: '' };

  public render() {
    if (!this.props.deck) {
      return <Text>No deck! Must be a bug.</Text>;
    }

    const content = this.props.loading ? <Spinner /> : (
      <Form>
        <Item>
          <Input
            placeholder="Front"
            onChangeText={this.handleFrontChange}
            value={this.state.front}
          />
        </Item>
        <Item last={true}>
          <Input
            placeholder="Back"
            onChangeText={this.handleBackChange}
            value={this.state.back}
          />
        </Item>
        <SubmitButton block={true} onPress={this.handleSubmit}>
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
  }

  private handleFrontChange = (front: string) => {
    this.setState({ front });
  }

  private handleBackChange = (back: string) => {
    this.setState({ back });
  }

  private handleSubmit = () => {
    const { deck } = this.props;
    if (deck) {
      const { back, front } = this.state;
      this.props.addCard(deck.id, front, back);
    }
  }
}

export default connect(
  ({ ui }: TRState) => ({
    deck: ui.deckDetailsScreen.selectedDeck,
    loading: ui.addCardScreen.loading,
  }),
  { addCard: CardsActions.addCard },
)(AddCardScreen);
