import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';

import { Languages } from '_constants/languages';
import { DecksActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck } from 'reducer/entities';

export interface DeckDetailsScreenProps {
  deleteDeck: typeof DecksActions.deleteDeck;
  deck?: Deck;
}

export class DeckDetailsScreen extends React.PureComponent<DeckDetailsScreenProps> {
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
    title: 'Deck Details',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    const { deck } = this.props;

    if (!deck) {
      return <Text>No deck! Must be a bug.</Text>;
    }

    return (
      <Container>
        <PaddedContent>
          <Form>
            <Text>Name: {deck.name}</Text>
            <Text>Language: {Languages[deck.language]}</Text>
            <SubmitButton block={true} onPress={this.handleDelete}>
              <Text>Delete Deck</Text>
            </SubmitButton>
          </Form>
        </PaddedContent>
      </Container>
    );
  }

  private handleDelete = () => {
    const { deck } = this.props;
    if (deck) {
      Alert.alert(
        'Delete Deck',
        `Are you sure you want to delete deck: "${deck.name}"?` +
        ' All of its cards and sets will also be deleted.',
        [
          { text: 'No' },
          {
            onPress: () => { this.props.deleteDeck(deck.id); },
            text: 'Yes',
          },
        ],
      );
    }
  }
}

export default connect(
  ({ ui }: TRState) => ({
    deck: ui.deckDetailsScreen.selectedDeck,
  }),
  { deleteDeck: DecksActions.deleteDeck },
)(DeckDetailsScreen);
