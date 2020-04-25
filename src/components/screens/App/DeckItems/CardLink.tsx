import * as React from 'react';
import { WebView } from 'react-native-webview';
import { useSelector } from 'react-redux';

import Burger from 'components/Burger';
import { TRState } from 'reducer';

export interface CardLinkProps {
  link: string;
}

const CardLinkScreen = React.memo(() => {
  const link = useSelector<TRState, string>(state => state.ui.cardLinkScreen.link);
  return (
    <WebView source={{ uri: link }} />
  );
});

// @ts-ignore
CardLinkScreen.navigationOptions = {
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

export default CardLinkScreen;
