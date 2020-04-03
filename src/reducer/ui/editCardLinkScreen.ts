import {
  EDIT_CARD_LINK,
  EDIT_CARD_LINK_FAILED,
  EDIT_CARD_LINK_SUCCESS,
  TRActions,
  VIEW_EDIT_CARD_LINK,
} from 'actions';
import { Card } from 'reducer/entities';

export interface EditCardLinkScreenState {
  loading: boolean;
  selectedCard?: Card;
}

export const initialState: EditCardLinkScreenState = {
  loading: false,
};

export default (
  state: EditCardLinkScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case EDIT_CARD_LINK:
      return {
        ...state,
        loading: true,
      };
    case EDIT_CARD_LINK_SUCCESS:
      return {
        ...state,
        loading: false,
      };
    case EDIT_CARD_LINK_FAILED:
      return {
        ...state,
        loading: false,
      };
    case VIEW_EDIT_CARD_LINK:
      return {
        ...state,
        selectedCard: action.payload.card,
      };

    default:
      return state;
  }
};
