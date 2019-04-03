import { FontAwesome, Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import memoizeOne from 'memoize-one';
import { Button, Fab, Spinner, Text } from 'native-base';
import * as React from 'react';
import { DataProvider, LayoutProvider, RecyclerListView } from 'recyclerlistview';

import { ADD_CARD_SCREEN } from '_constants/screens';
import { SCREEN_WIDTH } from '_constants/styles';
import { CardsActions, SessionActions, SetsActions } from 'actions';
import { PaddedContent, PaddedView } from 'components/styled';
import { navigate } from 'navigation/service';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card, Deck } from 'reducer/entities';

import CardItem from './CardItem';

export interface CardsScreenProps {
  allCards: { [id: number]: Card };
  deck: Deck;
  deckCards: number[];
  getCards: typeof CardsActions.getCards;
  gotoAddSet: typeof SetsActions.gotoAddSet;
  loading: boolean;
  study: typeof SessionActions.study;
}

export interface CardsScreenState {
  fabActive: boolean;
  selectedCards: { [cardId: number]: Card };
}

export class CardsScreen extends React.PureComponent<CardsScreenProps, CardsScreenState> {
  private getDataProvider = memoizeOne((cards: Card[]) => {
    const selectedCards = { ...this.state.selectedCards };

    return new DataProvider(
      (r1: Card, r2: Card) => {
        const selectionDifferent = this.state.selectedCards[r1.id] !== selectedCards[r1.id];
        selectedCards[r1.id] = this.state.selectedCards[r1.id];

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

  private getDeckCards = memoizeOne(
    (allCards: { [id: number]: Card }, deckCards: number[]) =>
      deckCards.map(id => allCards[id]).filter(card => Boolean(card)),
  );

  constructor(props: CardsScreenProps) {
    super(props);

    this.state = { fabActive: false, selectedCards: {} };
  }

  public componentDidMount() {
    this.props.getCards(this.props.deck.id);
  }

  public render() {
    const { allCards, deckCards, loading } = this.props;
    const cards = this.getDeckCards(allCards, deckCards);

    const numSelected = Object.keys(this.state.selectedCards).length;

    return this.props.loading ? <PaddedContent><Spinner /></PaddedContent> : (
      <React.Fragment>
        <PaddedView style={{ flex: 1 }}>
          {cards.length > 0 && (
            <RecyclerListView
              rowRenderer={this.renderCard}
              dataProvider={this.getDataProvider(cards)}
              layoutProvider={this.layoutProvider}
            />
          )}
        </PaddedView>
        {!loading && (
          <Fab
            containerStyle={{ }}
            style={{ backgroundColor: '#1F6899' }}
            onPress={numSelected ? this.toggleFab : this.handleAddCard}
            position="bottomRight"
          >
            {numSelected ? <Text>{numSelected}</Text> : <Ionicons name="md-add" size={25} />}
            {Boolean(numSelected) && this.state.fabActive && [
              <Button
                key={1}
                onPress={this.handleStudy}
                style={{ backgroundColor: '#34A34F' }}
              >
                <Ionicons name="md-pulse" size={25} color="white" />
              </Button>,
              <Button
                key={3}
                onPress={this.handleCreateSet}
                style={{ backgroundColor: '#EFA128' }}
              >
                <FontAwesome name="clone" size={25} color="white" />
              </Button>,
              <Button
                key={2}
                onPress={this.handleAddCard}
                style={{ backgroundColor: '#1F6899' }}
              >
                <Ionicons name="md-add" size={25} color="white" />
              </Button>,
            ]}
          </Fab>
        )}
      </React.Fragment>
    );
  }

  private renderCard = (type: React.ReactText, data: Card) => (
    <CardItem
      card={data}
      onSelect={this.handleCardSelect}
      selected={Boolean(this.state.selectedCards[data.id]) && !!type}
    />
  )

  private handleAddCard = () => {
    navigate(ADD_CARD_SCREEN);
    this.setState({
      fabActive: false,
    });
  }

  private handleCreateSet = () => {
    this.props.gotoAddSet(
      Object.keys(this.state.selectedCards).map((id: string) =>
        this.state.selectedCards[parseInt(id, 10)],
      ),
    );

    this.setState({ fabActive: false });
  }

  private handleCardSelect = (card: Card) => {
    const { id } = card;
    this.setState(({ selectedCards }) => ({
      fabActive: false,
      selectedCards: selectedCards[id] ?
        _.omit(selectedCards, id) :
        { ...selectedCards, [id]: card },
    }));
  }

  private handleStudy = () => {
    this.props.study(
      Object.keys(this.state.selectedCards).map((id: string) =>
          this.state.selectedCards[parseInt(id, 10)],
      ),
    );
  }

  private toggleFab = () => {
    this.setState(state => ({ fabActive: !state.fabActive }));
  }
}

export default connect(
  ({ entities, ui }: TRState) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    const deckCards = selectedDeck ? entities.deckCards[selectedDeck.id] : [];

    return {
      allCards: entities.cards,
      deckCards: deckCards ? deckCards : [],
      loading: ui.cardsScreen.loading,
    };
  },
  {
    getCards: CardsActions.getCards,
    gotoAddSet: SetsActions.gotoAddSet,
    study: SessionActions.study,
  },
)(CardsScreen);
