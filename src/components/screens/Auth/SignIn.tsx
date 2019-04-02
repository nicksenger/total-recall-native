import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';
import { connect } from 'react-redux';

import { AuthenticationActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';

export interface SignInProps {
  attemptLogin: typeof AuthenticationActions['attemptLogin'];
  loading: boolean;
}

export interface SignInState {
  password: string;
  username: string;
}

export class SignInScreen extends React.PureComponent<SignInProps, SignInState> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Existing User',
  } as unknown as NavigationTabScreenOptions;

  public state: SignInState = {
    password: '',
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
        <Item last={true}>
          <Input
            placeholder="Password"
            onChangeText={this.handlePasswordChange}
            secureTextEntry={true}
            value={this.state.password}
          />
        </Item>
        <SubmitButton block={true} onPress={this.handleSubmit}>
          <Text>Sign In</Text>
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

  private handleSubmit = () => {
    this.props.attemptLogin(this.state.username, this.state.password);
  }
}

export default connect(
  ({ authentication }: TRState) => ({ loading: authentication.loading }),
  { attemptLogin: AuthenticationActions.attemptLogin },
)(SignInScreen);
