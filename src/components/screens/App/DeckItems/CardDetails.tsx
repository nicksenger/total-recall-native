import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TRState } from 'reducer';
import { Dispatch } from 'redux';

import { CacheActions, CardsActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import CardBody from 'components/CardBody';
import { PaddedContent, SubmitButton, SubmitButtonNoMargin } from 'components/styled';
import { Card } from 'reducer/entities';

const CardDetailsScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const card = useSelector<TRState, Card | undefined>(
    state => state.ui.cardDetailsScreen.selectedCard,
  );

  if (!card) {
    return <Text>No card! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        <CardBody
          card={card}
          playAudio={uri => dispatch(CacheActions.playAudio(uri))}
          viewCardLink={link => dispatch(CardsActions.viewCardLink(link))}
        />
        <Form>
          <Text>Front: {card.front}</Text>
          <SubmitButton
            block={true}
            onPress={() => dispatch(CardsActions.viewEditCardLink(card))}
          >
            <Text>{card.link ? 'Edit' : 'Add'} Link</Text>
          </SubmitButton>
          <SubmitButtonNoMargin block={true} onPress={() => handleDelete()}>
            <Text>Delete Card</Text>
          </SubmitButtonNoMargin>
        </Form>
      </PaddedContent>
    </Container>
  );

  function handleDelete() {
    if (card) {
      Alert.alert(
        'Delete Card',
        'Are you sure you want to delete this card?',
        [
          { text: 'No' },
          {
            onPress: () => dispatch(CardsActions.deleteCard(card.id)),
            text: 'Yes',
          },
        ],
      );
    }
  }
});

// @ts-ignore
CardDetailsScreen.navigationOptions = {
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

export default CardDetailsScreen;
