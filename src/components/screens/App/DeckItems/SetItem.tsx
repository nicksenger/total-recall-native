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

const SetItem = (props: SetItemProps) => {
  const { allCards, setCards, set, viewSetDetails } = props;

  return (
    <ListItem key={set.id} icon={true}>
      <Left>
        {renderStatus(getCards(allCards, setCards))}
      </Left>
      <Body>
        <Text onPress={() => viewSetDetails(set)}>{set.name}</Text>
      </Body>
      <Right>
        <Ionicons
          color="#1f6899"
          name="md-pulse"
          onPress={() => props.study(getCards(allCards, setCards))}
          size={25}
        />
      </Right>
    </ListItem>
  );
};

const getCards = memoizeOne(
  (allCards: { [id: number]: Card }, setCards: number[]) =>
    setCards.map(id => allCards[id]).filter(c => Boolean(c)),
);

const renderStatus = memoizeOne(
  (cards: Card[]) => {
    const sum = cards.map(({ score }) => score.split(',').pop())
      .map(r => r ? parseInt(r, 10) : 0)
      .reduce((acc, cur) => acc + cur, 0);

    const avgRating = Math.round(sum / cards.length);
    return <RatingIcon rating={`${avgRating}`} />;
  },
);

export default connect(
  ({ entities }: TRState, { set }: { set: Set }) => ({
    allCards: entities.cards,
    setCards: entities.setCards[set.id],
  }),
  { study: SessionActions.study, viewSetDetails: SetsActions.viewSetDetails },
)(React.memo(SetItem));
