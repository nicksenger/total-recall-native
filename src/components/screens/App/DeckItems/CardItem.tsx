import { CardsActions } from 'actions';
import { CheckBox, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { Card } from 'reducer/entities';

export interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
  viewCardDetails: typeof CardsActions.viewCardDetails;
}

export class CardItem extends React.PureComponent<CardItemProps> {
  public render() {
    const { card } = this.props;

    return (
      <ListItem key={card.id}>
        <Left>
          <Text onPress={this.handleDetails}>{card.front}</Text>
        </Left>
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
