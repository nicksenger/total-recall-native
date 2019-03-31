import _ from 'lodash';

import { PROMPT, SCORE } from '_constants/session';
import {
  RATE_CARD,
  RATE_CARD_FAILED,
  RATE_CARD_SUCCESS,
  REVEAL_CARD,
  REVIEW_CARD,
  STUDY,
  TRActions,
} from 'actions';
import { needsReview } from './_utils/superMemo';
import { Card } from './entities';

export interface SessionState {
  loading: boolean;
  rateStack: Card[];
  reviewList: Card[];
  status: typeof PROMPT | typeof SCORE;
}

export const initialState: SessionState = {
  loading: false,
  rateStack: [],
  reviewList: [],
  status: PROMPT,
};

export default (
  state: SessionState = initialState,
  action: TRActions,
): SessionState => {
  switch (action.type) {
    case STUDY:
      return {
        ...state,
        rateStack: _.shuffle(action.payload.cards.filter(needsReview)),
        reviewList: [],
        status: PROMPT,
      };

    case RATE_CARD:
      return {
        ...state,
        loading: true,
      };

    case RATE_CARD_SUCCESS:
      const { rating } = action.payload;
      const newRateStack = [...state.rateStack];
      const card = newRateStack.shift();

      return {
        ...state,
        loading: false,
        rateStack: newRateStack,
        reviewList: state.reviewList.concat(rating <= 3 && card ? [card] : []),
        status: PROMPT,
      };

    case RATE_CARD_FAILED:
      return {
        ...state,
        loading: false,
      };

    case REVEAL_CARD:
      return {
        ...state,
        status: SCORE,
      };

    case REVIEW_CARD:
      const { reviewList } = state;
      return {
        ...state,
        reviewList:
          action.payload.rating > 3
            ? reviewList.slice(1)
            : reviewList.slice(1).concat(reviewList[0]),
        status: PROMPT,
      };

    default:
      return state;
  }
};
