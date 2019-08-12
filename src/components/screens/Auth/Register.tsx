import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';

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

const RegisterScreen = ({ loading, register }: RegisterScreenProps) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');

  const content = loading ? <Spinner /> : (
    <Form>
      <Item>
        <Input
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      </Item>
      <Item>
        <Input
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
      </Item>
      <Item last={true}>
        <Input
          placeholder="Confirm Password"
          secureTextEntry={true}
          onChangeText={setPasswordConfirm}
          value={passwordConfirm}
        />
      </Item>
      <SubmitButton
        block={true}
        disabled={!isValidInput({ username, password, passwordConfirm })}
        onPress={() => register(username, password)}
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
};

const connected = connect(
  ({ ui }: TRState) => ({ loading: ui.registerScreen.loading }),
  { register: AuthenticationActions.register },
)(React.memo(RegisterScreen));

// @ts-ignore
connected.navigationOptions = {
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'New User',
};

export default connected;

function isValidInput(state: RegisterScreenState) {
  return state.username.length > 0 && state.password.length > 0 &&
    state.password === state.passwordConfirm;
}
