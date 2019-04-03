import { Entypo } from '@expo/vector-icons';
import { RATING_COLORS } from '_constants/styles';
import * as React from 'react';

export interface RatingIconProps {
  rating?: string;
}

export default ({ rating }: RatingIconProps) => {
  switch (rating) {
    case '5':
      return <Entypo name="progress-full" size={25} style={{ color: RATING_COLORS[5] }} />;
    case '4':
      return <Entypo name="progress-two" size={25} style={{ color: RATING_COLORS[4] }} />;
    case '3':
      return <Entypo name="progress-two" size={25} style={{ color: RATING_COLORS[3] }} />;
    case '2':
      return <Entypo name="progress-one" size={25} style={{ color: RATING_COLORS[2] }} />;
    case '1':
      return <Entypo name="progress-one" size={25} style={{ color: RATING_COLORS[1] }} />;
    case '0':
      return <Entypo name="progress-one" size={25} style={{ color: RATING_COLORS[0] }} />;
    default:
      return <Entypo name="progress-empty" size={25} />;
  }
};
