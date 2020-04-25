import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { SetsActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { needsReview } from 'reducer/_utils/superMemo';
import { Card, Set } from 'reducer/entities';

const SetDetailsScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const allCards = useSelector<TRState, { [key: string]: Card }>(({ entities }) => entities.cards);
  const set = useSelector<TRState, Set | undefined>(({ ui }) => ui.setDetailsScreen.selectedSet);
  const setCards = useSelector<TRState, number[]>(
    ({ entities }) => set ? entities.setCards[set.id] : [],
  );

  if (!set) {
    return <Text>No set! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        <Form>
          <Text>Name: {set.name}</Text>
          <Text>Number of cards: {setCards.length}</Text>
          <Text>Cards due for review: {getReviewCount(allCards, setCards)}</Text>
          <SubmitButton block={true} onPress={() => handleDelete()}>
            <Text>Delete Set</Text>
          </SubmitButton>
        </Form>
      </PaddedContent>
    </Container>
  );

  function handleDelete() {
    if (set) {
      Alert.alert(
        'Delete Set',
        'Are you sure you want to delete this set?',
        [
          { text: 'No' },
          {
            onPress: () => dispatch(SetsActions.deleteSet(set.id)),
            text: 'Yes',
          },
        ],
      );
    }
  }
});

const getReviewCount = (allCards: { [id: number]: Card }, setCards: number[]): number => (
  setCards.map(id => allCards[id]).filter(card => needsReview(card)).length
);

// @ts-ignore
SetDetailsScreen.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Set Details',
};

export default SetDetailsScreen;
