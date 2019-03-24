import { GET_CARDS_SUCCESS, GET_DECKS_SUCCESS, GET_SETS_SUCCESS } from 'actions';
import entities, { initialState } from './entities';

describe('the entities reducer', () => {
  it('should store cards on successful retrieval', () => {
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

    const newState = entities(initialState, {
      payload: {
        cards,
      },
      type: GET_CARDS_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      cards: { 123: cards[0], 456: cards[1]  },
    });
  });

  it('should store decks on successful retrieval', () => {
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

    const newState = entities(initialState, {
      payload: {
        decks,
      },
      type: GET_DECKS_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      decks: {
        123: decks[0],
        456: decks[1],
      },
    });
  });

  it('should store sets on successful retrieval', () => {
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

    const newState = entities(initialState, {
      payload: { sets },
      type: GET_SETS_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      sets: {
        123: sets[0],
        456: sets[1],
      },
    });
  });
});
