import _ from 'lodash';
import { Spinner } from 'native-base';
import * as React from 'react';
import { FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { SetsActions, TRActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { TRState } from 'reducer';
import { Deck, Set } from 'reducer/entities';

import SetItem from './SetItem';

export interface SetsScreenProps {
  deck: Deck;
}

export default React.memo(({ deck }: SetsScreenProps) => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const loading = useSelector<TRState, boolean>(({ ui }) => ui.setsScreen.loading);
  const sets = useSelector<TRState, Set[]>(({ entities, ui }) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    return selectedDeck && entities.deckSets[selectedDeck.id] ?
      entities.deckSets[selectedDeck.id].map(id => entities.sets[id]) :
      [];
  });

  React.useEffect(
    () => { dispatch(SetsActions.getSets(deck.id)); },
    [deck],
  );

  return loading ? <PaddedContent><Spinner /></PaddedContent> : (
    <PaddedContent>
      {sets && (
        <FlatList
          data={sets}
          keyExtractor={({ id }: Set) => `${id}`}
          renderItem={({ item: set }: { item: Set }) => <SetItem set={set} />}
        />
      )}
    </PaddedContent>
  );
});
