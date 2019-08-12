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

const DeckItem = ({ deck, viewDeckDetails, viewDeckItems }: DeckItemProps) => (
  <ListItem key={deck.id}>
    <Left>
      <Text onPress={() => viewDeckDetails(deck)}>{deck.name}</Text>
    </Left>
    <Right>
      <Ionicons
        name="md-arrow-forward"
        size={25}
        color="black"
        onPress={() => viewDeckItems(deck)}
      />
    </Right>
  </ListItem>
);

export default connect(
  () => ({}),
  {
    viewDeckDetails: DecksActions.viewDeckDetails,
    viewDeckItems: DecksActions.viewDeckItems,
  },
)(React.memo(DeckItem));
