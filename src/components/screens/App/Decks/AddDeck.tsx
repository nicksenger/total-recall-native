import { Container, Form, Input, Item, Picker, Spinner, Text } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DecksActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Language } from 'reducer/entities';

const AddDeckScreen = React.memo(() => {
  const [language, setLanguage] = React.useState<number>(0);
  const [name, setName] = React.useState('');
  const languages = useSelector<TRState, Language[]>(
    state => Object.values(state.entities.languages),
  );
  const loading = useSelector<TRState, boolean>(({ ui }) => ui.addDeckScreen.loading);
  const username = useSelector<TRState, string | undefined>(state => state.authentication.username);
  const dispatch = useDispatch();

  React.useEffect(
    () => {
      dispatch(DecksActions.getLanguages());
    },
    [],
  );

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
          {languages.map(({ id, name: languageName }) => (
            <Picker.Item key={id} label={languageName} value={id} />
          ))}
        </Picker>
      </Item>
      <SubmitButton
        block={true}
        onPress={() => dispatch(DecksActions.addDeck(name, language, username))}
      >
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
});

// @ts-ignore
AddDeckScreen.navigationOptions = {
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

export default AddDeckScreen;
