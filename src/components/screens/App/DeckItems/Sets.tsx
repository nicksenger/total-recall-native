import _ from 'lodash';
import { List, Spinner } from 'native-base';
import * as React from 'react';

import { SetsActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Deck, Set } from 'reducer/entities';

import SetItem from './SetItem';

export interface SetsScreenProps {
  sets?: Set[];
  deck: Deck;
  getSets: typeof SetsActions.getSets;
  loading: boolean;
}

export class SetsScreen extends React.Component<SetsScreenProps> {
  public componentDidMount() {
    this.props.getSets(this.props.deck.id);
  }

  public render() {
    const { loading, sets } = this.props;

    return loading ? <PaddedContent><Spinner /></PaddedContent> : (
      <PaddedContent>
        {sets && (
          <List>
            {sets.map(set => (
              <SetItem
                set={set}
                key={set.id}
              />
            ))}
          </List>
        )}
      </PaddedContent>
    );
  }
}

export default connect(
  ({ entities, ui }: TRState) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    const sets = selectedDeck ?
      Object.keys(entities.sets)
        .map((id: string) => entities.sets[parseInt(id, 10)])
        .filter(set => set.deck === selectedDeck.id) : [];

    return {
      loading: ui.setsScreen.loading,
      sets,
    };
  },
  { getSets: SetsActions.getSets },
)(SetsScreen);
