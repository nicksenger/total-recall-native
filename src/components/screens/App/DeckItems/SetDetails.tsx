import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';

import { SetsActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { needsReview } from 'reducer/_utils/superMemo';
import { Card, Set } from 'reducer/entities';

export interface SetDetailsScreenProps {
  allCards: { [id: number]: Card };
  deleteSet: typeof SetsActions.deleteSet;
  setCards: number[];
  set?: Set;
}

const SetDetailsScreen = (props: SetDetailsScreenProps) => {
  const { allCards, set, setCards } = props;

  if (!set) {
    return <Text>No set! Must be a bug.</Text>;
  }

  return (
    <Container>
      <PaddedContent>
        <Form>
          <Text>Name: {set.name}</Text>
          <Text>Number of cards: {props.setCards.length}</Text>
          <Text>Cards due for review: {getReviewCount(allCards, setCards)}</Text>
          <SubmitButton block={true} onPress={handleDelete(props)}>
            <Text>Delete Set</Text>
          </SubmitButton>
        </Form>
      </PaddedContent>
    </Container>
  );
};

const getReviewCount = (allCards: { [id: number]: Card }, setCards: number[]): number => (
  setCards.map(id => allCards[id]).filter(card => needsReview(card)).length
);

const handleDelete = (props: SetDetailsScreenProps) => () => {
  const { deleteSet, set } = props;
  if (set) {
    Alert.alert(
      'Delete Set',
      'Are you sure you want to delete this set?',
      [
        { text: 'No' },
        {
          onPress: () => { deleteSet(set.id); },
          text: 'Yes',
        },
      ],
    );
  }
};

const connected = connect(
  ({ entities, ui }: TRState) => {
    const set = ui.setDetailsScreen.selectedSet;

    return {
      allCards: entities.cards,
      set,
      setCards: set ? entities.setCards[set.id] : [],
    };
  },
  { deleteSet: SetsActions.deleteSet },
)(React.memo(SetDetailsScreen));

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
  title: 'Set Details',
};

export default connected;
