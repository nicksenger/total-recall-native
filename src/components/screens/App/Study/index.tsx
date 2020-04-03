import { Ionicons } from '@expo/vector-icons';
import { Body, Button, Card, CardItem, Container, Fab, Spinner, Text  } from 'native-base';
import * as React from 'react';

import { PROMPT, SCORE } from '_constants/session';
import { RATING_COLORS } from '_constants/styles';
import { CacheActions, CardsActions, SessionActions } from 'actions';
import Burger from 'components/Burger';
import CardBody from 'components/CardBody';
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
  viewCardLink: typeof CardsActions.viewCardLink;
}

const StudyScreen = ({
  card,
  loading,
  playAudio,
  revealCard,
  status,
  viewCardLink,
}: StudyScreenProps) => {
  const [fabActive, setFab] = React.useState(false);

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
          onPress={() => revealCard(card)}
          style={{ backgroundColor: '#1f6899' }}
          position="bottomRight"
        >
          <Ionicons name="md-swap" size={25} />
        </Fab>
      );
    } else if (status === SCORE) {
      content = (
        <CardBody
          card={card}
          playAudio={playAudio}
          viewCardLink={viewCardLink}
        />
      );

      fab = (
        <Fab
          containerStyle={{ }}
          onPress={() => setFab(!fabActive)}
          style={{ backgroundColor: '#1f6899' }}
          position="bottomRight"
        >
          <Ionicons name="md-arrow-up" size={25} />
          {fabActive && [0, 1, 2, 3, 4, 5].map((rating: number) => (
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
};

const connected = connect(
  ({ session }: TRState) => ({
    card: session.rateStack[0] || session.reviewList[0],
    loading: session.loading,
    status: session.status,
  }),
  {
    playAudio: CacheActions.playAudio,
    revealCard: SessionActions.revealCard,
    viewCardLink: CardsActions.viewCardLink,
  },
)(React.memo(StudyScreen));

// @ts-ignore
connected.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Study Session',
};

export default connected;
