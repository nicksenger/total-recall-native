import { SessionActions } from 'actions';
import { Text } from 'native-base';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { TRState } from 'reducer';

export interface ScoreButtonProps {
  cardId: number;
  rating: number;
  rateCard: typeof SessionActions.rateCard;
  reviewCard: typeof SessionActions.reviewCard;
  reviewing: boolean;
}

export class ScoreButton extends React.PureComponent<ScoreButtonProps> {
  public render() {
    return (
      <TouchableOpacity
        onPress={this.handleScore}
      >
        <Text>{this.props.rating}</Text>
      </TouchableOpacity>
    );
  }

  private handleScore = () => {
    const { cardId, rating } = this.props;
    if (this.props.reviewing) {
      this.props.reviewCard(rating);
    } else {
      this.props.rateCard(cardId, rating);
    }
  }
}

export default connect(
  ({ session }: TRState) => ({
    reviewing: session.rateStack.length === 0,
  }),
  {
    rateCard: SessionActions.rateCard,
    reviewCard: SessionActions.reviewCard,
  },
)(ScoreButton);
