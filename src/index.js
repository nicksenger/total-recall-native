import { registerRootComponent } from 'expo';
import { activateKeepAwake } from 'expo-keep-awake';
import Root from './components/Root';

if (__DEV__) {
  activateKeepAwake();
}

registerRootComponent(Root);
