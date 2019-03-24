import {
  ADD_SET,
  ADD_SET_FAILED,
  ADD_SET_SUCCESS,
  DELETE_SET,
  DELETE_SET_FAILED,
  DELETE_SET_SUCCESS,
  GET_SETS,
  GET_SETS_FAILED,
  GET_SETS_SUCCESS,
  SetsActions,
} from './sets';

describe('the sets actions', () => {
  it('should create the ADD_SET action', () => {
    const action = SetsActions.addSet(123, 'foo', [123, 456]);
    expect(action.payload).toEqual({ deckId: 123, name: 'foo', card_ids: '123,456' });
    expect(action.type).toEqual(ADD_SET);
  });

  it('should create the ADD_SET_FAILED action', () => {
    const action = SetsActions.addSetFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(ADD_SET_FAILED);
  });

  it('should create the ADD_SET_SUCCESS action', () => {
    const action = SetsActions.addSetSuccess(123);
    expect(action.payload).toEqual({ deckId: 123 });
    expect(action.type).toEqual(ADD_SET_SUCCESS);
  });

  it('should create the DELETE_SET action', () => {
    const action = SetsActions.deleteSet(123);
    expect(action.payload).toEqual({ setId: 123 });
    expect(action.type).toEqual(DELETE_SET);
  });

  it('should create the DELETE_SET_FAILED action', () => {
    const action = SetsActions.deleteSetFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(DELETE_SET_FAILED);
  });

  it('should create the DELETE_SET_SUCCESS action', () => {
    const action = SetsActions.deleteSetSuccess();
    expect(action.type).toEqual(DELETE_SET_SUCCESS);
  });

  it('should create the GET_SETS action', () => {
    const action = SetsActions.getSets(123);
    expect(action.payload).toEqual({ deckId: 123 });
    expect(action.type).toEqual(GET_SETS);
  });

  it('should create the GET_SETS_FAILED action', () => {
    const action = SetsActions.getSetsFailed('failed!');
    expect(action.payload).toEqual({ message: 'failed!' });
    expect(action.type).toEqual(GET_SETS_FAILED);
  });

  it('should create the GET_CARDS_SUCCESS action', () => {
    const sets = [
      {
        card_ids: '1,2,3',
        deck: 123,
        id: 123,
        name: 'foo',
        owner: 'waldo',
      },
      {
        card_ids: '4,5,6',
        deck: 123,
        id: 456,
        name: 'bar',
        owner: 'waldo',
      },
    ];

    const action = SetsActions.getSetsSuccess(sets);
    expect(action.payload).toEqual({ sets });
    expect(action.type).toEqual(GET_SETS_SUCCESS);
  });
});
