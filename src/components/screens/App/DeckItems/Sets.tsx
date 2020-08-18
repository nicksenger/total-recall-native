import { Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import { Fab, Spinner } from 'native-base';
import * as React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { SessionActions, SetsActions, TRActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { TRState } from 'reducer';
import { Card, Deck, Set } from 'reducer/entities';

import SetItem from './SetItem';

export interface SetsScreenProps {
  deck: Deck;
}

export default React.memo(({ deck }: SetsScreenProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const loading = useSelector<TRState, boolean>(
    ({ ui }) => ui.setsScreen.loading,
  );
  const allCards = useSelector<TRState, { [key: string]: Card }>(
    ({ entities }) => entities.cards,
  );
  const setCards = useSelector<TRState, {[setId: number]: number[]}>(
    ({ entities }) => entities.setCards,
  );
  const sets = useSelector<TRState, Set[]>(({ entities, ui }) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    return selectedDeck && entities.deckSets[selectedDeck.id]
      ? entities.deckSets[selectedDeck.id].map(id => entities.sets[id])
      : [];
  });

  React.useEffect(
    () => {
      dispatch(SetsActions.getSets(deck.id));
    },
    [deck],
  );
  const [selectedSets, updateSelectedSets] = React.useState<{
    [id: number]: Set;
  }>({});

  return loading ? (
    <PaddedContent>
      <Spinner />
    </PaddedContent>
  ) : (
    <React.Fragment>
      <PaddedContent>
        {sets && (
          <FlatList
            data={sets}
            keyExtractor={({ id }: Set) => `${id}`}
            renderItem={({ item: set }: { item: Set }) => (
              <SetItem
                set={set}
                selected={Boolean(selectedSets[set.id])}
                onSelect={(s: Set) =>
                  updateSelectedSets(
                    selectedSets[s.id]
                      ? _.omit(selectedSets, [s.id])
                      : { ...selectedSets, [s.id]: s },
                  )
                }
              />
            )}
          />
        )}
      </PaddedContent>
      {Boolean(Object.keys(selectedSets).length) && (
        <Fab
          containerStyle={{ }}
          style={{ backgroundColor: '#1F6899' }}
          onPress={() =>
            dispatch(
              SessionActions.study(
                _.flatMap(Object.values(selectedSets), s =>
                  setCards[s.id].map(id => allCards[id]),
                ),
              ),
            )
          }
          position="bottomRight"
        >
          <Ionicons name="md-pulse" size={25} color="white" />
        </Fab>
      )}
    </React.Fragment>
  );
});
