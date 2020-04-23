import { Body, CheckBox, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';

import { CardsActions } from 'actions';
import RatingIcon from 'components/RatingIcon';
import { needsReview } from 'reducer/_utils/superMemo';
import { Card } from 'reducer/entities';

export interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
  viewCardDetails: typeof CardsActions.viewCardDetails;
}

const CardItem = (props: CardItemProps) => {
  const { card } = props;
  const lastScore = card.score.split(',').pop();

  return (
    <ListItem key={card.id} icon={true}>
      <Left>
        <RatingIcon rating={lastScore} />
      </Left>
      <Body>
        <Text onPress={() => props.viewCardDetails(card)}>{card.front}</Text>
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
};

export default connect(
  () => ({}),
  { viewCardDetails: CardsActions.viewCardDetails },
)(React.memo(CardItem));
