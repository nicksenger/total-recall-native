import { Audio, FileSystem } from 'expo';
import { from } from 'rxjs';

export const getMediaDir = () => FileSystem.documentDirectory;

export const playAudio = (uri: string) => {
  const soundObject = new Audio.Sound();
  return from(soundObject.loadAsync({ uri }).then(() => soundObject.playAsync()));
};

export const downloadAsync = (uri: string, path: string) =>
  from(FileSystem.downloadAsync(uri, path));
