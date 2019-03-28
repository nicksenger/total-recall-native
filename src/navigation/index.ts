import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Initial from 'components/screens/Initial';
import AppStack from './AppStack';
import AuthStack from './AuthStack';

export default createAppContainer(createSwitchNavigator(
  {
    AppStack,
    AuthStack,
    initial: Initial,
  },
  { initialRouteName: 'initial' },
));
