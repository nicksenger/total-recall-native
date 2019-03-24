import {
  GET_SETS,
  GET_SETS_FAILED,
  GET_SETS_SUCCESS,
  TRActions,
} from '../../actions';

export interface SetsScreenState {
  sets: number[];
  loading: boolean;
}

export const initialState: SetsScreenState = {
  loading: false,
  sets: [],
};

export default (
  state: SetsScreenState = initialState,
  action: TRActions,
): SetsScreenState => {
  switch (action.type) {
    case GET_SETS:
      return {
        ...state,
        loading: true,
      };

    case GET_SETS_FAILED:
      return {
        ...state,
        loading: false,
      };

    case GET_SETS_SUCCESS:
      return {
        ...state,
        loading: false,
        sets: action.payload.sets.map(({ id }) => id),
      };

    default:
      return state;
  }
};
