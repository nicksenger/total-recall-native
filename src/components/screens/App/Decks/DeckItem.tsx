import { Ionicons } from '@expo/vector-icons';
import { DecksActions } from 'actions';
import { Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { Deck } from 'reducer/entities';

export interface DeckItemProps {
  deck: Deck;
  viewDeck: typeof DecksActions.viewDeck;
}

export class DeckItem extends React.Component<DeckItemProps> {
  public render() {
    const { deck } = this.props;

    return (
      <ListItem key={deck.id} onPress={this.handleSelect}>
        <Left>
          <Text>{deck.name}</Text>
        </Left>
        <Right>
          <Ionicons name="md-arrow-forward" size={25} color="black" />
        </Right>
      </ListItem>
    );
  }

  private handleSelect = () => {
    this.props.viewDeck(this.props.deck);
  }
}

export default connect(
  () => ({}),
  { viewDeck: DecksActions.viewDeck },
)(DeckItem);
