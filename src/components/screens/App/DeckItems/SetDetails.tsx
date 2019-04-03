import memoizeOne from 'memoize-one';
import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';

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

export class SetDetailsScreen extends React.PureComponent<SetDetailsScreenProps> {
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
    title: 'Set Details',
  } as unknown as NavigationTabScreenOptions;

  private getReviewCount = memoizeOne(
    (allCards: { [id: number]: Card }, setCards: number[]): number => (
      setCards.map(id => allCards[id]).filter(card => needsReview(card)).length
    ),
  );

  public render() {
    const { allCards, set, setCards } = this.props;

    if (!set) {
      return <Text>No set! Must be a bug.</Text>;
    }

    return (
      <Container>
        <PaddedContent>
          <Form>
            <Text>Name: {set.name}</Text>
            <Text>Number of cards: {this.props.setCards.length}</Text>
            <Text>Cards due for review: {this.getReviewCount(allCards, setCards)}</Text>
            <SubmitButton block={true} onPress={this.handleDelete}>
              <Text>Delete Set</Text>
            </SubmitButton>
          </Form>
        </PaddedContent>
      </Container>
    );
  }

  private handleDelete = () => {
    const { set } = this.props;
    if (set) {
      Alert.alert(
        'Delete Set',
        'Are you sure you want to delete this set?',
        [
          { text: 'No' },
          {
            onPress: () => { this.props.deleteSet(set.id); },
            text: 'Yes',
          },
        ],
      );
    }
  }
}

export default connect(
  ({ entities, ui }: TRState) => {
    const set = ui.setDetailsScreen.selectedSet;

    return {
      allCards: entities.cards,
      set,
      setCards: set ? entities.setCards[set.id] : [],
    };
  },
  { deleteSet: SetsActions.deleteSet },
)(SetDetailsScreen);
