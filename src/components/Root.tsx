import { Root } from 'native-base';
import * as React from 'react';
import { NavigationProp } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createEpicMiddleware } from 'redux-observable';

import RootNavigator from 'navigation';
import { setNavigator } from 'navigation/service';

import rootEpic from 'epics';
import reducer from 'reducer';

const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(rootEpic);

export default () => (
  <Root>
    <Provider store={store}>
      <RootNavigator
        ref={(ref: NavigationProp<{}> | null) => ref ? setNavigator(ref) : undefined}
      />
    </Provider>
  </Root>
);
