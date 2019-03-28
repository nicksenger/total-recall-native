import { Container, Form, Input, Item, Text  } from 'native-base';
import * as React from 'react';
import { NavigationTabScreenOptions } from 'react-navigation';

import { PaddedContent, SubmitButton } from 'components/styled';

export default class InitialScreen extends React.Component<{}> {
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

  public render() {
    return (
      <Container>
        <PaddedContent>
          <Form>
            <Item>
              <Input
                placeholder="Username"
              />
            </Item>
            <Item>
              <Input
                placeholder="Password"
                secureTextEntry={true}
              />
            </Item>
            <Item last={true}>
              <Input
                placeholder="Confirm Password"
                secureTextEntry={true}
              />
            </Item>
            <SubmitButton block={true}>
              <Text>Create Account</Text>
            </SubmitButton>
          </Form>
        </PaddedContent>
      </Container>
    );
  }
}
