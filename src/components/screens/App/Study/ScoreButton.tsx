import { SessionActions, TRActions } from 'actions';
import { ScoreValue } from 'generated';
import { Text } from 'native-base';
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { TRState } from 'reducer';
import { Dispatch } from 'redux';

export interface ScoreButtonProps {
  cardId: number;
  index: number;
  rating: ScoreValue;
}

export default React.memo(({ cardId, index, rating }: ScoreButtonProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const reviewing = useSelector<TRState, boolean>(({ session }) => session.rateStack.length === 0);
  return (
    <TouchableOpacity
      onPress={() => handleScore()}
    >
      <Text>{index}</Text>
    </TouchableOpacity>
  );

  function handleScore() {
    if (reviewing) {
      dispatch(SessionActions.reviewCard(rating));
    } else {
      dispatch(SessionActions.rateCard(cardId, rating));
    }
  }
});
