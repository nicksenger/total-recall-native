import * as React from 'react';
import { WebView } from 'react-native-webview';
import { connect } from 'react-redux';

import Burger from 'components/Burger';
import { TRState } from 'reducer';

export interface CardLinkProps {
  link: string;
}

const CardLinkScreen = ({ link }: CardLinkProps) => (
  <WebView source={{ uri: link }} />
);

const connected = connect(
  ({ ui: { cardLinkScreen } }: TRState) => ({
    link: cardLinkScreen.link,
  }),
)(React.memo(CardLinkScreen));

// @ts-ignore
connected.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Card Link',
};

export default connected;
