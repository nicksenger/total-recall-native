import * as React from 'react';
import { NavigationProp } from 'react-navigation';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware } from 'redux-observable';

import RootNavigator from 'navigation';
import { setNavigator } from 'navigation/service';

import rootEpic from 'epics';
import reducer from 'reducer';

const epicMiddleware = createEpicMiddleware();
const store = createStore(reducer, applyMiddleware(epicMiddleware, createLogger()));
epicMiddleware.run(rootEpic);

export default () => (
  <Provider store={store}>
    <RootNavigator
      ref={(ref: NavigationProp<{}> | null) => ref ? setNavigator(ref) : undefined}
    />
  </Provider>
);
