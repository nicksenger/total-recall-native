import {
  DELETE_CARD_SUCCESS,
  DELETE_DECK_SUCCESS,
  DELETE_SET_SUCCESS,
  GET_CARDS_SUCCESS,
  GET_DECKS_SUCCESS,
  GET_SETS_SUCCESS,
  RATE_CARD_SUCCESS,
} from 'actions';
import entities, { initialState } from './entities';

describe('the entities reducer', () => {
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
      link: 'http://some-link.com/',
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
      link: 'http://some-link.com/',
      owner: 'foobar',
      score: '1,2,3',
    },
  ];

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

  it('should store normalized cards on successful retrieval', () => {
    const newState = entities(initialState, {
      payload: { cards, deckId: 123 },
      type: GET_CARDS_SUCCESS,
    });

    expect(newState).toEqual({
      ...initialState,
      cards: { 123: cards[0], 456: cards[1]  },
      deckCards: {
        123: [123, 456],
      },
    });
  });

  it('should store decks on successful retrieval', () => {
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

  it('should store normalized sets on successful retrieval', () => {
    const newState = entities(
      {
        ...initialState,
        cards: { 1: cards[0], 4: cards[1] },
      },
      {
        payload: { sets, deckId: 123 },
        type: GET_SETS_SUCCESS,
      },
    );

    expect(newState).toEqual({
      ...initialState,
      cards: { 1: cards[0], 4: cards[1] },
      deckSets: {
        123: [123, 456],
      },
      setCards: {
        123: [1],
        456: [4],
      },
      sets: {
        123: sets[0],
        456: sets[1],
      },
    });
  });

  it('should remove deleted decks', () => {
    const newState = entities(
      {
        ...initialState,
        decks: {
          123: decks[0],
          456: decks[1],
        },
      },
      {
        payload: { deckId: 123 },
        type: DELETE_DECK_SUCCESS,
      },
    );

    expect(newState).toEqual({
      ...initialState,
      decks: { 456: decks[1] },
    });
  });

  it('should remove deleted cards from all relevant entities', () => {
    const newState = entities(
      {
        ...initialState,
        cards: {
          123: cards[0],
          456: cards[1],
        },
        deckCards: {
          1: [123, 456],
        },
        setCards: {
          1: [123, 456],
        },
      },
      {
        payload: { cardId: 123 },
        type: DELETE_CARD_SUCCESS,
      },
    );

    expect(newState).toEqual({
      ...initialState,
      cards: { 456: cards[1] },
      deckCards: { 1: [456] },
      setCards: { 1: [456] },
    });
  });

  it('should remove deleted sets from all relevant entities', () => {
    const newState = entities(
      {
        ...initialState,
        deckSets: { 1: [123, 456] },
        sets: {
          123: sets[0],
          456: sets[1],
        },
      },
      {
        payload: { setId: 123 },
        type: DELETE_SET_SUCCESS,
      },
    );

    expect(newState).toEqual({
      ...initialState,
      deckSets: { 1: [456] },
      sets: { 456: sets[1] },
    });
  });

  it('should update the score of cards when rated successfully', () => {
    const newState = entities(
      {
        ...initialState,
        cards: {
          123: cards[0],
        },
      },
      {
        payload: { cardId: 123, rating: 5 },
        type: RATE_CARD_SUCCESS,
      },
    );

    expect(newState.cards[123].score).toEqual('1,2,3,5');
  });
});
