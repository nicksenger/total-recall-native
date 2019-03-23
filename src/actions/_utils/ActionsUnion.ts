import { ActionCreatorsMapObject } from 'redux';

export type ActionsUnion<A extends ActionCreatorsMapObject> = ReturnType<A[keyof A]>;
