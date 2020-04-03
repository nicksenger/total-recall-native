import { Ionicons } from '@expo/vector-icons';
import { Button, Card, CardItem, Text } from 'native-base';
import * as React from 'react';

import { CacheActions, CardsActions } from 'actions';
import SmartImage from 'components/SmartImage';
import { Card as CardType } from 'reducer/entities';

export interface CardBodyProps {
  card: CardType;
  playAudio: typeof CacheActions.playAudio;
  viewCardLink: typeof CardsActions.viewCardLink;
}

const CardBody = ({ card, playAudio, viewCardLink }: CardBodyProps) => (
  <Card>
    <CardItem header={true} style={{ justifyContent: 'center' }}>
      {card.link && (
        <React.Fragment>
          <Button transparent={true} onPress={() => viewCardLink(card.link as string)}>
            <Ionicons
              color="#1f6899"
              name="md-link"
              size={25}
            />
          </Button>
          <Text style={{ fontSize: 20 }}>
            {'   '}
          </Text>
        </React.Fragment>
      )}
      <Text style={{ fontSize: 20 }}>
        {card.back}
        {'   '}
      </Text>
      <Button transparent={true} onPress={() => playAudio(card.audio)}>
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

export default React.memo(CardBody);
