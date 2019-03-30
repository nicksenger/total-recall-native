import { Ionicons } from '@expo/vector-icons';
import { Button, Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { Set } from 'reducer/entities';

export interface SetItemProps {
  set: Set;
}

export default class DeckItem extends React.Component<SetItemProps> {
  public render() {
    const { set } = this.props;

    return (
      <ListItem key={set.id}>
        <Left>
          <Text>{set.name}</Text>
        </Left>
        <Right>
          <Button><Ionicons name="md-pulse" size={25} color="white" /></Button>
        </Right>
      </ListItem>
    );
  }
}
