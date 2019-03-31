import { Container, Form, Input, Item, Picker, Spinner, Text } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

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

export interface AddDeckScreenState {
  name: string;
  language: LanguageCode;
}

export class AddDeckScreen extends React.Component<AddDeckScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
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
  } as unknown as NavigationTabScreenOptions;

  public state: AddDeckScreenState = { name: '', language: 'en' };

  public render() {
    if (!this.props.username) {
      return <Text>No user! Must be a bug.</Text>;
    }

    const content = this.props.loading ? <Spinner /> : (
      <Form>
        <Item>
          <Input
            placeholder="Name"
            onChangeText={this.handleNameChange}
            value={this.state.name}
          />
        </Item>
        <Item picker={true}>
          <Picker
            mode="dropdown"
            style={{ width: undefined }}
            placeholder="Select language"
            placeholderStyle={{ color: '#bfc6ea' }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.language}
            onValueChange={this.handleLanguageChange}
          >
            {Object.keys(Languages).map((key: string) => (
              <Picker.Item key={key} label={Languages[key]} value={key} />
            ))}
          </Picker>
        </Item>
        <SubmitButton block={true} onPress={this.handleSubmit}>
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
  }

  private handleLanguageChange = (language: string) => {
    this.setState({ language });
  }

  private handleNameChange = (name: string) => {
    this.setState({ name });
  }

  private handleSubmit = () => {
    const { username } = this.props;
    if (username) {
      const { name, language } = this.state;
      this.props.addDeck(name, language, username);
    }
  }
}

export default connect(
  ({ authentication, ui }: TRState) => ({
    loading: ui.addDeckScreen.loading,
    username: authentication.username,
  }),
  { addDeck: DecksActions.addDeck },
)(AddDeckScreen);
