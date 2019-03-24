import * as React from 'react';
import { NavigationProp } from 'react-navigation';

import AuthNavigator from 'navigation/AuthNavigator';
import { setNavigator } from 'navigation/service';

export default () => (
  <AuthNavigator
    ref={(ref: NavigationProp<{}> | null) => ref ? setNavigator(ref) : undefined}
  />
);
