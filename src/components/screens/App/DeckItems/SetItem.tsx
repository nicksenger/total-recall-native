import { Ionicons } from '@expo/vector-icons';
import memoizeOne from 'memoize-one';
import { Body, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';

import { SessionActions, SetsActions } from 'actions';
import RatingIcon from 'components/RatingIcon';
import { TRState } from 'reducer';
import { Card, Set } from 'reducer/entities';

export interface SetItemProps {
  allCards: { [id: number]: Card };
  set: Set;
  setCards: number[];
  study: typeof SessionActions['study'];
  viewSetDetails: typeof SetsActions['viewSetDetails'];
}

export class SetItem extends React.PureComponent<SetItemProps> {
  private getCards = memoizeOne(
    (allCards: { [id: number]: Card }, setCards: number[]) =>
      setCards.map(id => allCards[id]).filter(c => Boolean(c)),
  );

  private renderStatus = memoizeOne(
    (cards: Card[]) => {
      const sum = cards.map(({ score }) => score.split(',').pop())
        .map(r => r ? parseInt(r, 10) : 0)
        .reduce((acc, cur) => acc + cur, 0);

      const avgRating = Math.round(sum / cards.length);
      return <RatingIcon rating={`${avgRating}`} />;
    },
  );

  public render() {
    const { allCards, setCards, set } = this.props;

    return (
      <ListItem key={set.id} icon={true}>
        <Left>
          {this.renderStatus(this.getCards(allCards, setCards))}
        </Left>
        <Body>
          <Text onPress={this.handleDetails}>{set.name}</Text>
        </Body>
        <Right>
          <Ionicons
            color="#1f6899"
            name="md-pulse"
            onPress={this.handleStudy}
            size={25}
          />
        </Right>
      </ListItem>
    );
  }

  private handleDetails = () => {
    this.props.viewSetDetails(this.props.set);
  }

  private handleStudy = () => {
    const { allCards, setCards } = this.props;
    this.props.study(this.getCards(allCards, setCards));
  }
}

export default connect(
  ({ entities }: TRState, { set }: { set: Set }) => ({
    allCards: entities.cards,
    setCards: entities.setCards[set.id],
  }),
  { study: SessionActions.study, viewSetDetails: SetsActions.viewSetDetails },
)(SetItem);
