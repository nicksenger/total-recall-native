import { CheckBox, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { Card } from 'reducer/entities';

export interface CardItemProps {
  card: Card;
  onSelect: (card: Card) => void;
  selected: boolean;
}

export default class DeckItem extends React.Component<CardItemProps> {
  public render() {
    const { card } = this.props;

    return (
      <ListItem key={card.id}>
        <Left>
          <Text>{card.front}</Text>
        </Left>
        <Right>
          <CheckBox checked={this.props.selected} onPress={this.handleSelect} />
        </Right>
      </ListItem>
    );
  }

  private handleSelect = () => {
    this.props.onSelect(this.props.card);
  }
}
