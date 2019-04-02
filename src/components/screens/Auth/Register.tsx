import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { AuthenticationActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';

export interface RegisterScreenProps {
  loading: boolean;
  register: typeof AuthenticationActions.register;
}

export interface RegisterScreenState {
  username: string;
  password: string;
  passwordConfirm: string;
}

export class RegisterScreen extends React.PureComponent<RegisterScreenProps, RegisterScreenState> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'New User',
  } as unknown as NavigationTabScreenOptions;

  public state: RegisterScreenState = {
    password: '',
    passwordConfirm: '',
    username: '',
  };

  public render() {
    const content = this.props.loading ? <Spinner /> : (
      <Form>
        <Item>
          <Input
            placeholder="Username"
            onChangeText={this.handleUsernameChange}
            value={this.state.username}
          />
        </Item>
        <Item>
          <Input
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={this.handlePasswordChange}
            value={this.state.password}
          />
        </Item>
        <Item last={true}>
          <Input
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={this.handlePasswordConfirmChange}
            value={this.state.passwordConfirm}
          />
        </Item>
        <SubmitButton
          block={true}
          disabled={!isValidInput(this.state)}
          onPress={this.handleSubmit}
        >
          <Text>Create Account</Text>
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

  private handleUsernameChange = (username: string) => {
    this.setState({ username });
  }

  private handlePasswordChange = (password: string) => {
    this.setState({ password });
  }

  private handlePasswordConfirmChange = (passwordConfirm: string) => {
    this.setState({ passwordConfirm });
  }

  private handleSubmit = () => {
    this.props.register(this.state.username, this.state.password);
  }
}

export default connect(
  ({ ui }: TRState) => ({ loading: ui.registerScreen.loading }),
  { register: AuthenticationActions.register },
)(RegisterScreen);

function isValidInput(state: RegisterScreenState) {
  return state.username.length > 0 && state.password.length > 0 &&
    state.password === state.passwordConfirm;
}
