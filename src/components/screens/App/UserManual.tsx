import Burger from 'components/Burger';
import { PaddedContent } from 'components/styled';
import { Container, H1, H2, Text } from 'native-base';
import * as React from 'react';

const UserManual = () => (
  <Container>
    <PaddedContent>
      <Text>Total Recall allows you to organize and study language flashcards.</Text>
      <H1 />
      <H2>Getting Started</H2>
      <Text>
        First, make a deck by pressing the big blue (+) button at the bottom right
        of the 'My Decks' screen. Choose a name and target language for your deck (Total Recall
        will download audio in the selected language for each card that you add to your deck)
      </Text>
      <H1 />
      <Text>
        Once you have a deck, view its contents by clicking the arrow next to it on the
        'My Decks' page. Your new deck will not have any cards, but you can add some by
        pressing the big blue (+) button at the bottom right of the 'Deck Items' screen.
        When creating a card, put the word in your native language on the front, and the
        foreign language word on the back.
      </Text>
      <H1 />
      <Text>
        Add some cards, then select the ones you want to study by pressing the checkbox next
        to the cards on the 'Cards' section of the 'DeckItems' screen. The blue button will
        indicate how many cards you have selected. Pressing it with cards selected will reveal
        2 new options. The green button will initiate a study session with the selected cards.
        The yellow button will create a set from the selected cards so that you can conveniently
        study them together multiple times.
      </Text>
      <H1 />
      <H2>Study Sessions</H2>
      <Text>
        You can start a study session either from selected cards or by clicking
        the study button next to a previously created set. The study session will present
        cards from the set or selection in a random order, first showing the word in your
        native language. Try to translate the word to the target language, then flip the card
        by pressing the big blue button in the bottom right.
      </Text>
      <H1 />
      <Text>
        After the card flips, the correct response will be shown along with
        an image. An audio clip from google translate for the word will also be played.
        Clicking the big blue up arrow button will allow you to rate how well you translated
        the front of the card based on the following scale:
      </Text>
      <H1 />
      <Text>0 - No recollection at all.</Text>
      <H1 />
      <Text>1 - Incorrect response, but the correct one remembered.</Text>
      <H1 />
      <Text>2 - Incorrect response, but the correct one seemed easy to recall.</Text>
      <H1 />
      <Text>3 - Correct response recalled with serious difficulty.</Text>
      <H1 />
      <Text>4 - Correct response recalled with some hesitation.</Text>
      <H1 />
      <Text>5 - Perfect response.</Text>
      <H1 />
      <Text>
        The session will continue until each card in the session receives a score of
        3 or better. Based on the initial response to each card, Total Recall will calculate
        the ideal amount of time until you should review the card again, and until that time
        it will not be shown.
      </Text>
      <H1 />
      <Text>Enjoy!</Text>
      <H1 />
      <H1 />
    </PaddedContent>
  </Container>
);

UserManual.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'User Manual',
};

export default UserManual;
