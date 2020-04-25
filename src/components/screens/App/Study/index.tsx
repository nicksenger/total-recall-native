import { Ionicons } from '@expo/vector-icons';
import { Body, Button, Card, CardItem, Container, Fab, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { PROMPT, SCORE } from '_constants/session';
import { RATING_COLORS } from '_constants/styles';
import { CacheActions, CardsActions, SessionActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import CardBody from 'components/CardBody';
import { PaddedContent } from 'components/styled';
import { TRState } from 'reducer';
import { Card as CardType } from 'reducer/entities';
import { ScoreValue } from '../../../../generated';
import ScoreButton from './ScoreButton';

const StudyScreen = React.memo(() => {
  const [fabActive, setFab] = React.useState(false);
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const card = useSelector<TRState, CardType | undefined>(
    ({ session }) => session.rateStack[0] || session.reviewList[0],
  );
  const loading = useSelector<TRState, boolean>(({ session }) => session.loading);
  const status = useSelector<TRState, 'PROMPT' | 'SCORE'>(({ session }) => session.status);

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
          onPress={() => dispatch(SessionActions.revealCard(card))}
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
          playAudio={uri => dispatch(CacheActions.playAudio(uri))}
          viewCardLink={uri => dispatch(CardsActions.viewCardLink(uri))}
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
          {fabActive && Object.values(ScoreValue).map((rating: string, i) => (
            <Button key={rating} style={{ backgroundColor: RATING_COLORS[i] }}>
              <ScoreButton cardId={card.id} index={i} rating={rating as ScoreValue} />
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
});

// @ts-ignore
StudyScreen.navigationOptions = {
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

export default StudyScreen;
