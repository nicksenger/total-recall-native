import { Ionicons } from '@expo/vector-icons';
import { Button, Card, CardItem, Text } from 'native-base';
import * as React from 'react';

import { CacheActions } from 'actions';
import SmartImage from 'components/SmartImage';
import { Card as CardType } from 'reducer/entities';

export interface CardBodyProps {
  card: CardType;
  playAudio: typeof CacheActions.playAudio;
}

export default class CardBody extends React.Component<CardBodyProps> {
  public render() {
    const { card } = this.props;

    return (
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
  }

  private playAudio = () => {
    this.props.playAudio(this.props.card.audio);
  }
}
