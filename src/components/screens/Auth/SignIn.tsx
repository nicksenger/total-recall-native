import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
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

const SignInScreen = ({ attemptLogin, loading }: SignInProps) => {
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
      <SubmitButton block={true} onPress={() => attemptLogin(username, password)}>
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
};

const connected = connect(
  ({ authentication }: TRState) => ({ loading: authentication.loading }),
  { attemptLogin: AuthenticationActions.attemptLogin },
)(React.memo(SignInScreen));

// @ts-ignore
connected.navigationOptions = {
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Existing User',
};

export default connected;
