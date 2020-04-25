import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { Container, Tab, TabHeading, Tabs, Text } from 'native-base';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { Deck } from 'reducer/entities';

import Burger from 'components/Burger';
import { TRState } from 'reducer';
import Cards from './Cards';
import Sets from './Sets';

const DeckDetailsScreen = React.memo(() => {
  const deck = useSelector<TRState, Deck | undefined>(
    ({ ui }) => ui.deckDetailsScreen.selectedDeck,
  );
  const username = useSelector<TRState, string | undefined>(
    ({ authentication }) => authentication.username,
  );

  const content = deck ? (
    <Tabs style={{ backgroundColor: '#2a5687' }} scrollWithoutAnimation={false}>
      <Tab
        heading={(
          <TabHeading>
            <Text>
              <MaterialCommunityIcons name="cards-outline" size={25} color="white" />
              {'  '}Cards
            </Text>
          </TabHeading>
        )}
      >
        <Cards deck={deck} />
      </Tab>
      <Tab
        heading={(
          <TabHeading>
            <Text>
              <FontAwesome name="clone" size={25} color="white" />
              {'  '}Sets
            </Text>
          </TabHeading>
        )}
      >
        <Sets deck={deck} />
      </Tab>
    </Tabs>
  ) : <Text>No deck! Must be a bug.</Text>;

  if (!username) {
    return <Text>No user! Must be a bug.</Text>;
  }

  return (
    <Container>
      {content}
    </Container>
  );
});

// @ts-ignore
DeckDetailsScreen.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Deck Items',
};

export default DeckDetailsScreen;
