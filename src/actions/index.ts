import { AuthenticationActions } from './authentication';
import { CardsActions } from './cards';
import { DecksActions } from './decks';
import { SessionActions } from './session';
import { SetsActions } from './sets';

export * from './authentication';
export * from './cards';
export * from './decks';
export * from './session';
export * from './sets';

export type TRActions =
    AuthenticationActions |
    CardsActions |
    DecksActions |
    SessionActions |
    SetsActions;
