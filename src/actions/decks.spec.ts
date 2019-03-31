import {
  ADD_DECK,
  ADD_DECK_FAILED,
  ADD_DECK_SUCCESS,
  DecksActions,
  DELETE_DECK,
  DELETE_DECK_FAILED,
  DELETE_DECK_SUCCESS,
  GET_DECKS,
  GET_DECKS_FAILED,
  GET_DECKS_SUCCESS,
  VIEW_DECK_DETAILS,
  VIEW_DECK_ITEMS,
} from './decks';

describe('the decks actions', () => {
  const decks = [
    {
      created: 'sometime',
      id: 123,
      language: 'vi',
      name: 'foo',
      owner: 'waldo',
    },
    {
      created: 'sometime',
      id: 456,
      language: 'es',
      name: 'bar',
      owner: 'waldo',
    },
  ];

  it('should create the ADD_DECK action', () => {
    const action = DecksActions.addDeck('foo', 'vi', 'waldo');
    expect(action.payload).toEqual({ name: 'foo', language: 'vi', username: 'waldo' });
    expect(action.type).toEqual(ADD_DECK);
  });

  it('should create the ADD_DECK_FAILED action', () => {
    const action = DecksActions.addDeckFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(ADD_DECK_FAILED);
  });

  it('should create the ADD_DECK_SUCCESS action', () => {
    const action = DecksActions.addDeckSuccess(decks[0], 'foo');
    expect(action.payload).toEqual({ deck: decks[0], username: 'foo' });
    expect(action.type).toEqual(ADD_DECK_SUCCESS);
  });

  it('should create the DELETE_DECK action', () => {
    const action = DecksActions.deleteDeck(123);
    expect(action.payload).toEqual({ deckId: 123 });
    expect(action.type).toEqual(DELETE_DECK);
  });

  it('should create the DELETE_DECK_FAILED action', () => {
    const action = DecksActions.deleteDeckFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(DELETE_DECK_FAILED);
  });

  it('should create the DELETE_DECK_SUCCESS action', () => {
    const action = DecksActions.deleteDeckSuccess(123);
    expect(action.type).toEqual(DELETE_DECK_SUCCESS);
    expect(action.payload).toEqual({ deckId: 123 });
  });

  it('should create the GET_DECKS action', () => {
    const action = DecksActions.getDecks('waldo');
    expect(action.payload).toEqual({ username: 'waldo' });
    expect(action.type).toEqual(GET_DECKS);
  });

  it('should create the GET_DECKS_FAILED action', () => {
    const action = DecksActions.getDecksFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(GET_DECKS_FAILED);
  });

  it('should create the GET_DECKS_SUCCESS action', () => {
    const action = DecksActions.getDecksSuccess(decks);
    expect(action.payload).toEqual({ decks });
    expect(action.type).toEqual(GET_DECKS_SUCCESS);
  });

  it('should create the VIEW_DECK_DETAILS action', () => {
    const { payload, type } = DecksActions.viewDeckDetails(decks[0]);
    expect(payload).toEqual({ deck: decks[0] });
    expect(type).toEqual(VIEW_DECK_DETAILS);
  });

  it('should create the VIEW_DECK_ITEMS action', () => {
    const action = DecksActions.viewDeckItems(decks[0]);
    expect(action.payload).toEqual({ deck: decks[0] });
    expect(action.type).toEqual(VIEW_DECK_ITEMS);
  });
});
