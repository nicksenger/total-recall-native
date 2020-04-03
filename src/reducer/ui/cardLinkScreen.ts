import {
  TRActions,
  VIEW_CARD_LINK,
} from 'actions';

export interface CardLinkScreenState {
  link: string;
}

export const initialState: CardLinkScreenState = {
  link: '',
};

export default (
  state: CardLinkScreenState = initialState,
  action: TRActions,
) => {
  switch (action.type) {
    case VIEW_CARD_LINK:
      return {
        ...state,
        link: action.payload.link,
      };

    default:
      return state;
  }
};
