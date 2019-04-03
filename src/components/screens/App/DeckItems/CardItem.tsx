import memoizeOne from 'memoize-one';
import { Body, CheckBox, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';

import { CardsActions } from 'actions';
import RatingIcon from 'components/RatingIcon';
import { Card } from 'reducer/entities';

export interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
  viewCardDetails: typeof CardsActions.viewCardDetails;
}

export class CardItem extends React.PureComponent<CardItemProps> {
  private renderStatus = memoizeOne(
    (card: Card) => {
      const lastScore = card.score.split(',').pop();
      return <RatingIcon rating={lastScore} />;
    },
  );

  public render() {
    const { card } = this.props;

    return (
      <ListItem key={card.id} icon={true}>
        <Left>
          {this.renderStatus(card)}
        </Left>
        <Body>
          <Text onPress={this.handleDetails}>{card.front}</Text>
        </Body>
        <Right>
          <CheckBox checked={this.props.selected} onPress={this.handleSelect} />
        </Right>
      </ListItem>
    );
  }

  private handleDetails = () => {
    this.props.viewCardDetails(this.props.card);
  }

  private handleSelect = () => {
    this.props.onSelect(this.props.card);
  }
}

export default connect(
  () => ({}),
  { viewCardDetails: CardsActions.viewCardDetails },
)(CardItem);
