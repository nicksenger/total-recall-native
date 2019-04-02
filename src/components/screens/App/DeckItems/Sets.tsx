import _ from 'lodash';
import { Spinner } from 'native-base';
import * as React from 'react';
import { FlatList } from 'react-native';

import { SetsActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck, Set } from 'reducer/entities';

import SetItem from './SetItem';

export interface SetsScreenProps {
  sets: Set[];
  deck: Deck;
  getSets: typeof SetsActions.getSets;
  loading: boolean;
}

export class SetsScreen extends React.PureComponent<SetsScreenProps> {
  public componentDidMount() {
    this.props.getSets(this.props.deck.id);
  }

  public render() {
    const { loading, sets } = this.props;

    return loading ? <PaddedContent><Spinner /></PaddedContent> : (
      <PaddedContent>
        {sets && (
          <FlatList
            data={sets}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderItem}
          />
        )}
      </PaddedContent>
    );
  }

  private keyExtractor = ({ id }: Set) => `${id}`;
  private renderItem = ({ item: set }: { item: Set }) => (
    <SetItem
      set={set}
    />
  )
}

export default connect(
  ({ entities, ui }: TRState) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    const sets = selectedDeck && entities.deckSets[selectedDeck.id] ?
      entities.deckSets[selectedDeck.id].map(id => entities.sets[id]) :
      [];

    return {
      loading: ui.setsScreen.loading,
      sets,
    };
  },
  { getSets: SetsActions.getSets },
)(SetsScreen);
