import { Ionicons } from '@expo/vector-icons';
import { Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from 'redux';

import { DecksActions, TRActions } from 'actions';
import { Deck } from 'reducer/entities';

export interface DeckItemProps {
  deck: Deck;
}

export default React.memo(({ deck }: DeckItemProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  return (
    <ListItem key={deck.id}>
      <Left>
        <Text onPress={() => dispatch(DecksActions.viewDeckDetails(deck))}>{deck.name}</Text>
      </Left>
      <Right>
        <Ionicons
          name="md-arrow-forward"
          size={25}
          color="black"
          onPress={() => dispatch(DecksActions.viewDeckItems(deck))}
        />
      </Right>
    </ListItem>
  );
});
