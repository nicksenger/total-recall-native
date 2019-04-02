import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';

import { CardsActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card } from 'reducer/entities';

export interface CardDetailsScreenProps {
  deleteCard: typeof CardsActions.deleteCard;
  card?: Card;
}

export class CardDetailsScreen extends React.PureComponent<CardDetailsScreenProps> {
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
    title: 'Card Details',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    const { card } = this.props;

    if (!card) {
      return <Text>No card! Must be a bug.</Text>;
    }

    return (
      <Container>
        <PaddedContent>
          <Form>
            <Text>Front: {card.front}</Text>
            <Text>Back: {card.back}</Text>
            <SubmitButton block={true} onPress={this.handleDelete}>
              <Text>Delete Card</Text>
            </SubmitButton>
          </Form>
        </PaddedContent>
      </Container>
    );
  }

  private handleDelete = () => {
    const { card } = this.props;
    if (card) {
      Alert.alert(
        'Delete Card',
        'Are you sure you want to delete this card?',
        [
          { text: 'No' },
          {
            onPress: () => { this.props.deleteCard(card.id); },
            text: 'Yes',
          },
        ],
      );
    }
  }
}

export default connect(
  ({ ui }: TRState) => ({
    card: ui.cardDetailsScreen.selectedCard,
  }),
  { deleteCard: CardsActions.deleteCard },
)(CardDetailsScreen);
