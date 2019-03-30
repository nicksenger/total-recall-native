import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import _ from 'lodash';
import { Button, Fab, List, Spinner, Text } from 'native-base';
import * as React from 'react';

import { ADD_CARD_SCREEN } from '_constants/screens';
import { CardsActions } from 'actions';
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
  loading: boolean;
}

export interface CardsScreenState {
  fabActive: boolean;
  selectedCards: { [cardId: number]: boolean };
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
                  selected={this.state.selectedCards[card.id]}
                />
              ))}
            </List>
          )}
        </PaddedContent>
        {!loading && (
          <Fab
            containerStyle={{ }}
            style={
              numSelected ?
                { backgroundColor: '#34A34F' } :
                { backgroundColor: '#1f6899' }
            }
            onPress={numSelected ? this.toggleFab : this.handleAddCard}
            position="bottomRight"
          >
            {numSelected ? <Text>{numSelected}</Text> : <Ionicons name="md-add" size={25} />}
            {Boolean(numSelected) && this.state.fabActive && [
              <Button key={1} style={{ backgroundColor: '#34A34F' }}>
                <Ionicons name="md-pulse" size={25} color="white" />
              </Button>,
              <Button key={3} style={{ backgroundColor: '#DD5144' }}>
                <MaterialCommunityIcons name="cards-outline" size={25} color="white" />
              </Button>,
              <Button
                key={2}
                style={{ backgroundColor: '#3B5998' }}
                onPress={this.handleAddCard}
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
  }

  private handleCardSelect = ({ id }: Card) => {
    const { selectedCards } = this.state;
    this.setState({
      fabActive: false,
      selectedCards: selectedCards[id] ?
        _.omit(selectedCards, id) :
        { ...selectedCards, [id]: true },
    });
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
  { getCards: CardsActions.getCards },
)(CardsScreen);
