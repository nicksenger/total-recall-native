import { Card, Set } from 'reducer/entities';
import { ActionsUnion, createAction } from './_utils';

export const GET_SETS = 'GET_SETS';
export const GET_SETS_SUCCESS = 'GET_SETS_SUCCESS';
export const GET_SETS_FAILED = 'GET_SETS_FAILED';
export const DELETE_SET = 'DELETE_SET';
export const DELETE_SET_SUCCESS = 'DELETE_SETS_SUCCESS';
export const DELETE_SET_FAILED = 'DELETE_SETS_FAILED';
export const ADD_SET = 'ADD_SET';
export const ADD_SET_SUCCESS = 'ADD_SET_SUCCESS';
export const ADD_SET_FAILED = 'ADD_SET_FAILED';
export const GOTO_ADD_SET = 'GOTO_ADD_SET';

export const SetsActions = {
  addSet: (deckId: number, name: string, cardIds: number[]) =>
    createAction(ADD_SET, { deckId, name, card_ids: cardIds.join(',') }),
  addSetFailed: (message: string) => createAction(ADD_SET_FAILED, { message }),
  addSetSuccess: (deckId: number) => createAction(ADD_SET_SUCCESS, { deckId }),
  deleteSet: (setId: number) => createAction(DELETE_SET, { setId }),
  deleteSetFailed: (message: string) =>
    createAction(DELETE_SET_FAILED, { message }),
  deleteSetSuccess: () => createAction(DELETE_SET_SUCCESS),
  getSets: (deckId: number) => createAction(GET_SETS, { deckId }),
  getSetsFailed: (message: string) =>
    createAction(GET_SETS_FAILED, { message }),
  getSetsSuccess: (sets: Set[]) => createAction(GET_SETS_SUCCESS, { sets }),
  gotoAddSet: (cards: Card[]) => createAction(GOTO_ADD_SET, { cards }),
};

export type SetsActions = ActionsUnion<typeof SetsActions>;
