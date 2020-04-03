import { Container, Form, Input, Item, Spinner, Text  } from 'native-base';
import * as React from 'react';
import { connect } from 'react-redux';

import { CardsActions } from 'actions';
import Burger from 'components/Burger';
import { PaddedContent, SubmitButton } from 'components/styled';
import { TRState } from 'reducer';
import { Card } from 'reducer/entities';

export interface EditCardLinkProps {
  card?: Card;
  editCardLink: typeof CardsActions['editCardLink'];
  loading: boolean;
}

const EditCardLinkScreen = ({ card, editCardLink, loading }: EditCardLinkProps) => {
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
        <SubmitButton block={true} onPress={() => editCardLink(card.id, link)}>
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
};

const connected = connect(
  ({ ui: { editCardLinkScreen } }: TRState) => ({
    card: editCardLinkScreen.selectedCard,
    loading: editCardLinkScreen.loading,
  }),
  { editCardLink: CardsActions.editCardLink },
)(React.memo(EditCardLinkScreen));

// @ts-ignore
connected.navigationOptions = {
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

export default connected;
