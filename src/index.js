import { KeepAwake, registerRootComponent } from 'expo';
import Root from './components/Root';

if (__DEV__) {
  KeepAwake.activate();
}

registerRootComponent(Root);
