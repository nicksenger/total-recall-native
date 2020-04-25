import { Ionicons } from '@expo/vector-icons';
import memoizeOne from 'memoize-one';
import { Body, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SessionActions, SetsActions, TRActions } from 'actions';
import RatingIcon from 'components/RatingIcon';
import { TRState } from 'reducer';
import { Card, Set } from 'reducer/entities';
import { Dispatch } from 'redux';

export interface SetItemProps {
  set: Set;
}

export default React.memo(({ set }: SetItemProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const allCards = useSelector<TRState, { [key: string]: Card }>(
    ({ entities }) => entities.cards,
  );
  const setCards = useSelector<TRState, number[]>(({ entities }) => entities.setCards[set.id]);

  return (
    <ListItem key={set.id} icon={true}>
      <Left>
        {renderStatus(getCards(allCards, setCards))}
      </Left>
      <Body>
        <Text onPress={() => dispatch(SetsActions.viewSetDetails(set))}>{set.name}</Text>
      </Body>
      <Right>
        <Ionicons
          color="#1f6899"
          name="md-pulse"
          onPress={() => dispatch(SessionActions.study(getCards(allCards, setCards)))}
          size={25}
        />
      </Right>
    </ListItem>
  );
});

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
