import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AuthenticationActions, TRActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Dispatch } from 'redux';

export interface SignInState {
  password: string;
  username: string;
}

const SignInScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const loading = useSelector<TRState, boolean>(({ authentication }) => authentication.loading);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const content = loading ? <Spinner /> : (
    <Form>
      <Item>
        <Input
          placeholder="Username"
          onChangeText={setUsername}
          value={username}
        />
      </Item>
      <Item last={true}>
        <Input
          placeholder="Password"
          onChangeText={setPassword}
          secureTextEntry={true}
          value={password}
        />
      </Item>
      <SubmitButton
        block={true}
        onPress={() => dispatch(AuthenticationActions.attemptLogin(username, password))}
      >
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
});

// @ts-ignore
SignInScreen.navigationOptions = {
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Existing User',
};

export default SignInScreen;
