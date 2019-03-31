import { FontAwesome, Ionicons } from '@expo/vector-icons';
import _ from 'lodash';
import { Button, Fab, List, Spinner, Text } from 'native-base';
import * as React from 'react';

import { ADD_CARD_SCREEN } from '_constants/screens';
import { CardsActions, SessionActions, SetsActions } from 'actions';
import { PaddedContent } from 'components/styled';
import { navigate } from 'navigation/service';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card, Deck } from 'reducer/entities';

import CardItem from './CardItem';

export interface CardsScreenProps {
  cards?: Card[];
  deck: Deck;
  getCards: typeof CardsActions.getCards;
  gotoAddSet: typeof SetsActions.gotoAddSet;
  loading: boolean;
  study: typeof SessionActions.study;
}

export interface CardsScreenState {
  fabActive: boolean;
  selectedCards: { [cardId: number]: Card };
}

export class CardsScreen extends React.Component<CardsScreenProps, CardsScreenState> {
  public state: CardsScreenState = { fabActive: false, selectedCards: {} };

  public componentDidMount() {
    this.props.getCards(this.props.deck.id);
  }

  public render() {
    const { loading, cards } = this.props;
    const numSelected = Object.keys(this.state.selectedCards).length;

    return this.props.loading ? <PaddedContent><Spinner /></PaddedContent> : (
      <React.Fragment>
        <PaddedContent>
          {cards && (
            <List>
              {cards.map(card => (
                <CardItem
                  card={card}
                  key={card.id}
                  onSelect={this.handleCardSelect}
                  selected={Boolean(this.state.selectedCards[card.id])}
                />
              ))}
            </List>
          )}
        </PaddedContent>
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

  private handleAddCard = () => {
    navigate(ADD_CARD_SCREEN);
    this.setState({
      fabActive: false,
    });
  }

  private handleCreateSet = () => {
    if (this.props.cards) {
      this.props.gotoAddSet(
        Object.keys(this.state.selectedCards).map((id: string) =>
          this.state.selectedCards[parseInt(id, 10)],
        ),
      );
    }

    this.setState({ fabActive: false });
  }

  private handleCardSelect = (card: Card) => {
    const { selectedCards } = this.state;
    const { id } = card;
    this.setState({
      fabActive: false,
      selectedCards: selectedCards[id] ?
        _.omit(selectedCards, id) :
        { ...selectedCards, [id]: card },
    });
  }

  private handleStudy = () => {
    this.props.study(
      Object.keys(this.state.selectedCards).map((id: string) =>
          this.state.selectedCards[parseInt(id, 10)],
      ),
    );
  }

  private toggleFab = () => {
    this.setState({ fabActive: !this.state.fabActive });
  }
}

export default connect(
  ({ entities, ui }: TRState) => {
    const { selectedDeck } = ui.deckDetailsScreen;
    const cards = selectedDeck ?
      Object.keys(entities.cards)
        .map((id: string) => entities.cards[parseInt(id, 10)])
        .filter(card => card.deck === selectedDeck.id) : [];

    return {
      cards,
      loading: ui.cardsScreen.loading,
    };
  },
  {
    getCards: CardsActions.getCards,
    gotoAddSet: SetsActions.gotoAddSet,
    study: SessionActions.study,
  },
)(CardsScreen);
