import { Ionicons } from '@expo/vector-icons';
import { SessionActions, SetsActions } from 'actions';
import { Left, ListItem, Right, Text } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card, Set } from 'reducer/entities';

export interface SetItemProps {
  cards: Card[];
  set: Set;
  study: typeof SessionActions['study'];
  viewSetDetails: typeof SetsActions['viewSetDetails'];
}

export class SetItem extends React.Component<SetItemProps> {
  public render() {
    const { set } = this.props;

    return (
      <ListItem key={set.id}>
        <Left>
          <Text onPress={this.handleDetails}>{set.name}</Text>
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

  private handleDetails = () => {
    this.props.viewSetDetails(this.props.set);
  }

  private handleStudy = () => {
    this.props.study(this.props.cards);
  }
}

export default connect(
  ({ entities }: TRState, { set }: { set: Set }) => ({
    cards: set.card_ids.split(',').map(id => entities.cards[parseInt(id, 10)]),
  }),
  { study: SessionActions.study, viewSetDetails: SetsActions.viewSetDetails },
)(SetItem);
