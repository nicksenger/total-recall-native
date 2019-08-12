import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';

import { CacheActions, CardsActions } from 'actions';
import Burger from 'components/Burger';
import CardBody from 'components/CardBody';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card } from 'reducer/entities';

export interface CardDetailsScreenProps {
  deleteCard: typeof CardsActions.deleteCard;
  playAudio: typeof CacheActions.playAudio;
  card?: Card;
}

const CardDetailsScreen = (props: CardDetailsScreenProps) => {
  const { card, playAudio } = props;

  if (!card) {
    return <Text>No card! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        <CardBody card={card} playAudio={playAudio} />
        <Form>
          <Text>Front: {card.front}</Text>
          <SubmitButton block={true} onPress={handleDelete(props)}>
            <Text>Delete Card</Text>
          </SubmitButton>
        </Form>
      </PaddedContent>
    </Container>
  );
};

const handleDelete = (props: CardDetailsScreenProps) => () => {
  const { card, deleteCard } = props;
  if (card) {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to delete this card?',
      [
        { text: 'No' },
        {
          onPress: () => { deleteCard(card.id); },
          text: 'Yes',
        },
      ],
    );
  }
};

const connected = connect(
  ({ ui }: TRState) => ({
    card: ui.cardDetailsScreen.selectedCard,
  }),
  {
    deleteCard: CardsActions.deleteCard,
    playAudio: CacheActions.playAudio,
  },
)(React.memo(CardDetailsScreen));

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
  title: 'Card Details',
};

export default connected;
