import { Ionicons } from '@expo/vector-icons';
import { SessionActions } from 'actions';
import { Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card, Set } from 'reducer/entities';

export interface SetItemProps {
  cards: Card[];
  set: Set;
  study: typeof SessionActions['study'];
}

export class DeckItem extends React.Component<SetItemProps> {
  public render() {
    const { set } = this.props;

    return (
      <ListItem key={set.id}>
        <Left>
          <Text>{set.name}</Text>
        </Left>
        <Right>
          <Ionicons
            color="#1f6899"
            name="md-pulse"
            onPress={this.handleStudy}
            size={25}
          />
        </Right>
      </ListItem>
    );
  }

  private handleStudy = () => {
    this.props.study(this.props.cards);
  }
}

export default connect(
  ({ entities }: TRState, { set }: SetItemProps) => ({
    cards: set.card_ids.split(',').map(id => entities.cards[parseInt(id, 10)]),
  }),
  { study: SessionActions.study },
)(DeckItem);
