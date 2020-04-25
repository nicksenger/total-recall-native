import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';

import { AuthenticationActions, TRActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { useDispatch, useSelector } from 'react-redux';
import { TRState } from 'reducer';
import { Dispatch } from 'redux';

export interface RegisterScreenState {
  username: string;
  password: string;
  passwordConfirm: string;
}

const RegisterScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const loading = useSelector<TRState, boolean>(({ ui }) => ui.registerScreen.loading);
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
        onPress={() => dispatch(AuthenticationActions.register(username, password))}
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
});

// @ts-ignore
RegisterScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'New User',
};

export default RegisterScreen;

function isValidInput(state: RegisterScreenState) {
  return state.username.length > 0 && state.password.length > 0 &&
    state.password === state.passwordConfirm;
}
