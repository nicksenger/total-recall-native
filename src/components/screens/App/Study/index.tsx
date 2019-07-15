import { Ionicons } from '@expo/vector-icons';
import { Body, Button, Card, CardItem, Container, Fab, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { PROMPT, SCORE } from '_constants/session';
import { RATING_COLORS } from '_constants/styles';
import { CacheActions, SessionActions } from 'actions';
import Burger from 'components/Burger';
import SmartImage from 'components/SmartImage';
import { PaddedContent } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Card as CardType } from 'reducer/entities';
import ScoreButton from './ScoreButton';

export interface StudyScreenProps {
  card: CardType;
  loading: boolean;
  playAudio: typeof CacheActions.playAudio;
  revealCard: typeof SessionActions.revealCard;
  status: TRState['session']['status'];
}

export interface StudyScreenState {
  fabActive: boolean;
}

export class StudyScreen extends React.PureComponent<StudyScreenProps, StudyScreenState> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerRight: <Burger />,
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Study Session',
  } as unknown as NavigationTabScreenOptions;

  public state = { fabActive: false };

  public render() {
    const { card, loading, status } = this.props;

    let fab;

    let content = (
      <Card>
          <CardItem header={true}>
            <Text>No cards to study</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Add some cards from the decks screen to start a new session.
              </Text>
            </Body>
          </CardItem>
      </Card>
    );

    if (loading) {
      content = <Spinner />;
    } else if (card) {
      if (status === PROMPT) {
        content = (
          <Card>
            <CardItem header={true} style={{ height: 300, justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>{card.front}</Text>
            </CardItem>
          </Card>
        );

        fab = (
          <Fab
            containerStyle={{ }}
            onPress={this.handleFlip}
            style={{ backgroundColor: '#1f6899' }}
            position="bottomRight"
          >
            <Ionicons name="md-swap" size={25} />
          </Fab>
        );
      } else if (status === SCORE) {
        content = (
          <Card>
            <CardItem header={true} style={{ justifyContent: 'center' }}>
              <Text style={{ fontSize: 20 }}>
                {card.back}
                {'   '}
              </Text>
              <Button transparent={true} onPress={this.playAudio}>
                <Ionicons
                  color="#1f6899"
                  name="md-volume-high"
                  size={25}
                />
              </Button>
            </CardItem>
            <CardItem style={{ height: 300 }}>
              <SmartImage
                source={{ uri: card.image }}
                style={{ flex: 1, height: '100%', width: '100%' }}
                resizeMode="contain"
              />
            </CardItem>
          </Card>
        );

        fab = (
          <Fab
            containerStyle={{ }}
            onPress={this.toggleFab}
            style={{ backgroundColor: '#1f6899' }}
            position="bottomRight"
          >
            <Ionicons name="md-arrow-up" size={25} />
            {this.state.fabActive && [0, 1, 2, 3, 4, 5].map((rating: number) => (
              <Button key={rating} style={{ backgroundColor: RATING_COLORS[rating] }}>
                <ScoreButton cardId={card.id} rating={rating} />
              </Button>
            ))}
          </Fab>
        );
      }
    }

    return (
      <Container>
        <PaddedContent>
          {content}
        </PaddedContent>
        {fab}
      </Container>
    );
  }

  private handleFlip = () => {
    this.props.revealCard(this.props.card);
  }

  private playAudio = () => {
    this.props.playAudio(this.props.card.audio);
  }

  private toggleFab = () => {
    this.setState({ fabActive: !this.state.fabActive });
  }
}

export default connect(
  ({ session }: TRState) => ({
    card: session.rateStack[0] || session.reviewList[0],
    loading: session.loading,
    status: session.status,
  }),
  {
    playAudio: CacheActions.playAudio,
    revealCard: SessionActions.revealCard,
  },
)(StudyScreen);
