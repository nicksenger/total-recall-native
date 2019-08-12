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

export const ScoreButton = (props: ScoreButtonProps) => (
  <TouchableOpacity
    onPress={() => handleScore(props)}
  >
    <Text>{props.rating}</Text>
  </TouchableOpacity>
);

const handleScore = (props: ScoreButtonProps) => {
  const { cardId, rating } = props;
  if (props.reviewing) {
    props.reviewCard(rating);
  } else {
    props.rateCard(cardId, rating);
  }
};

export default connect(
  ({ session }: TRState) => ({
    reviewing: session.rateStack.length === 0,
  }),
  {
    rateCard: SessionActions.rateCard,
    reviewCard: SessionActions.reviewCard,
  },
)(React.memo(ScoreButton));
