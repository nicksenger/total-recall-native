import memoizeOne from 'memoize-one';
import * as React from 'react';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { SCREEN_WIDTH } from '_constants/styles';
import { Card } from 'reducer/entities';
import CardItem from './CardItem';

export interface CardsListProps {
  handleCardSelect: (c: Card) => void;
  filteredCards: Card[];
  selectedCards: { [id: number]: Card };
}

export default class CardsList extends React.PureComponent<CardsListProps> {
  private getDataProvider = memoizeOne((cards: Card[]) => {
    const selectedCards = { ...this.props.selectedCards };

    return new DataProvider(
      (r1: Card, r2: Card) => {
        const selectionDifferent = this.props.selectedCards[r1.id] !== selectedCards[r1.id];
        selectedCards[r1.id] = this.props.selectedCards[r1.id];

        return r1 !== r2 || selectionDifferent;
      },
    ).cloneWithRows(cards);
  });

  private layoutProvider = new LayoutProvider(() => 'NORMAL', (type, dim) => {
    switch (type) {
      default:
        dim.width = SCREEN_WIDTH;
        dim.height = 50;
    }
  });

  public render() {
    return (
      <RecyclerListView
        rowRenderer={this.renderCard}
        dataProvider={this.getDataProvider(this.props.filteredCards)}
        layoutProvider={this.layoutProvider}
      />
    );
  }

  private renderCard = (type: React.ReactText, data: Card) => (
    <CardItem
      card={data}
      onSelect={this.props.handleCardSelect}
      selected={Boolean(this.props.selectedCards[data.id]) && !!type}
    />
  )
}
