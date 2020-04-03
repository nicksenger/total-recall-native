import {
  DELETE_CARD,
  DELETE_CARD_FAILED,
  DELETE_CARD_SUCCESS,
  EDIT_CARD_LINK_SUCCESS,
  TRActions,
  VIEW_CARD_DETAILS,
} from 'actions';
import { Card } from 'reducer/entities';

export interface CardDetailsScreenState {
  loading: boolean;
  selectedCard?: Card;
}

export const initialState: CardDetailsScreenState = {
  loading: false,
};

export default (
  state: CardDetailsScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case DELETE_CARD:
      return {
        ...state,
        loading: true,
      };

    case DELETE_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case DELETE_CARD_FAILED:
      return {
        ...state,
        loading: false,
      };

    case EDIT_CARD_LINK_SUCCESS: {
      const { cardId, link } = action.payload;
      return {
        ...state,
        selectedCard: state.selectedCard && state.selectedCard.id === cardId ? {
          ...state,
          link,
        } : state.selectedCard,
      };
    }

    case VIEW_CARD_DETAILS:
      return {
        ...state,
        selectedCard: action.payload.card,
      };

    default:
      return state;
  }
};
