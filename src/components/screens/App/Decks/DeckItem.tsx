import { Ionicons } from '@expo/vector-icons';
import { DecksActions } from 'actions';
import { Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { Deck } from 'reducer/entities';

export interface DeckItemProps {
  deck: Deck;
  viewDeckDetails: typeof DecksActions.viewDeckDetails;
  viewDeckItems: typeof DecksActions.viewDeckItems;
}

export class DeckItem extends React.Component<DeckItemProps> {
  public render() {
    const { deck } = this.props;

    return (
      <ListItem key={deck.id}>
        <Left>
          <Text onPress={this.handleDetails}>{deck.name}</Text>
        </Left>
        <Right>
          <Ionicons name="md-arrow-forward" size={25} color="black" onPress={this.handleSelect} />
        </Right>
      </ListItem>
    );
  }

  private handleDetails = () => {
    this.props.viewDeckDetails(this.props.deck);
  }

  private handleSelect = () => {
    this.props.viewDeckItems(this.props.deck);
  }
}

export default connect(
  () => ({}),
  {
    viewDeckDetails: DecksActions.viewDeckDetails,
    viewDeckItems: DecksActions.viewDeckItems,
  },
)(DeckItem);
