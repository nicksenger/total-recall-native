import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { CardsActions, TRActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Card } from 'reducer/entities';

const EditCardLinkScreen = React.memo(() => {
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const card = useSelector<TRState, Card | undefined>(
    state => state.ui.editCardLinkScreen.selectedCard,
  );
  const loading = useSelector<TRState, boolean>(({ ui }) => ui.editCardLinkScreen.loading);
  const [link, setLink] = React.useState(card && card.link || '');

  let content;
  if (loading) {
    content = <Spinner />;
  } else if (!card) {
    return <Text>Oops, this is a bug.</Text>;
  } else {
    content = (
      <Form>
        <Item>
          <Input
            placeholder="Link"
            onChangeText={setLink}
            value={link}
          />
        </Item>
        <SubmitButton
          block={true}
          onPress={() => dispatch(CardsActions.editCardLink(card.id, link))}
        >
          <Text>Set Link for "{card.back}"</Text>
        </SubmitButton>
      </Form>
    );
  }

  return (
    <Container>
      <PaddedContent>
        {content}
      </PaddedContent>
    </Container>
  );
});

// @ts-ignore
EditCardLinkScreen.navigationOptions = {
  headerRight: <Burger />,
  headerStyle: {
    backgroundColor: '#1f6899',
  },
  headerTintColor: 'white',
  headerTitleStyle: {
    color: 'white',
    fontWeight: 'bold',
  },
  title: 'Edit Card Link',
};

export default EditCardLinkScreen;
