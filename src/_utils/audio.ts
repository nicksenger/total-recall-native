import { Audio } from 'expo';
import { from } from 'rxjs';

export const playAudio = (uri: string) => {
  const soundObject = new Audio.Sound();
  return from(soundObject.loadAsync({ uri }).then(() => soundObject.playAsync()));
};
