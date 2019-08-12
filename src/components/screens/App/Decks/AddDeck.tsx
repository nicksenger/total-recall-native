import { Container, Form, Input, Item, Picker, Spinner, Text } from 'native-base';
import * as React from 'react';

import { LanguageCode, Languages } from '_constants/languages';
import { DecksActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';

export interface AddDeckScreenProps {
  addDeck: typeof DecksActions['addDeck'];
  loading: boolean;
  username?: string;
}

const AddDeckScreen = ({ addDeck, loading, username }: AddDeckScreenProps) => {
  const [language, setLanguage] = React.useState<LanguageCode>('en');
  const [name, setName] = React.useState('');

  if (!username) {
    return <Text>No user! Must be a bug.</Text>;
  }

  const content = loading ? <Spinner /> : (
    <Form>
      <Item>
        <Input
          placeholder="Name"
          onChangeText={setName}
          value={name}
        />
      </Item>
      <Item picker={true}>
        <Picker
          mode="dropdown"
          style={{ width: undefined }}
          placeholder="Select language"
          placeholderStyle={{ color: '#bfc6ea' }}
          placeholderIconColor="#007aff"
          selectedValue={language}
          onValueChange={setLanguage}
        >
          {Object.keys(Languages).map((key: string) => (
            <Picker.Item key={key} label={Languages[key]} value={key} />
          ))}
        </Picker>
      </Item>
      <SubmitButton block={true} onPress={() => addDeck(name, language, username)}>
        <Text>Add Deck</Text>
      </SubmitButton>
    </Form>
  );

  return (
    <Container>
      <PaddedContent>
        {content}
      </PaddedContent>
    </Container>
  );
};

const connected = connect(
  ({ authentication, ui }: TRState) => ({
    loading: ui.addDeckScreen.loading,
    username: authentication.username,
  }),
  { addDeck: DecksActions.addDeck },
)(React.memo(AddDeckScreen));

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
  title: 'Add Deck',
};

export default connected;
