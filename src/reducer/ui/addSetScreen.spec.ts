import { ADD_SET, ADD_SET_FAILED, ADD_SET_SUCCESS, GOTO_ADD_SET } from 'actions';
import addSetScreen, { initialState } from './addSetScreen';

describe('the addSetScreen reducer', () => {
  const cards = [
    {
      audio: 'foo.mp3',
      back: 'foo',
      created: 'somehow',
      deck: 123,
      front: 'foo',
      id: 123,
      image: 'foo.jpg',
      last_seen: 'somewhere',
      owner: 'foobar',
      score: '1,2,3',
    },
    {
      audio: 'bar.mp3',
      back: 'bar',
      created: 'somehow',
      deck: 123,
      front: 'bar',
      id: 456,
      image: 'bar.jpg',
      last_seen: 'somewhere',
      owner: 'foobar',
      score: '1,2,3',
    },
  ];

  it('should set the loading state when a request to add set is sent', () => {
    const newState = addSetScreen(initialState, {
      payload: { deckId: 123, name: 'foo', card_ids: '1,2,3' },
      type: ADD_SET,
    });

    expect(newState.loading).toBeTruthy();
  });

  it('should reset the loading state if adding the set fails', () => {
    const newState = addSetScreen(initialState, {
      payload: { message: 'something went wrong' },
      type: ADD_SET_FAILED,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should reset the loading state if the set is added successfully', () => {
    const newState = addSetScreen(initialState, {
      payload: { deckId: 123 },
      type: ADD_SET_SUCCESS,
    });

    expect(newState.loading).toBeFalsy();
  });

  it('should set the cards when navigating to the add set screen', () => {
    const newState = addSetScreen(initialState, {
      payload: { cards },
      type: GOTO_ADD_SET,
    });

    expect(newState.cards).toEqual(cards);
  });
});
