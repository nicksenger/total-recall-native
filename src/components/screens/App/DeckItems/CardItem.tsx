import { Body, CheckBox, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { CardsActions, TRActions } from 'actions';
import RatingIcon from 'components/RatingIcon';
import { needsReview } from 'reducer/_utils/superMemo';
import { Card } from 'reducer/entities';

export interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
}

export default React.memo((props: CardItemProps) => {
  const { card } = props;
  const lastScore = card.score.split(',').pop();
  const dispatch = useDispatch<Dispatch<TRActions>>();

  return (
    <ListItem key={card.id} icon={true}>
      <Left>
        <RatingIcon rating={lastScore} />
      </Left>
      <Body>
        <Text onPress={() => dispatch(CardsActions.viewCardDetails(card))}>
          {card.front}
        </Text>
      </Body>
      <Right>
        <CheckBox
          checked={props.selected}
          onPress={() => props.onSelect(card)}
          color={needsReview(card) ? 'red' : undefined}
        />
      </Right>
    </ListItem>
  );
});
