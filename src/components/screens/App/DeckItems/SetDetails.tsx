import { Container, Form, Text } from 'native-base';
import * as React from 'react';
import { Alert } from 'react-native';
import { NavigationTabScreenOptions } from 'react-navigation';

import { SetsActions } from 'actions';
import { PaddedContent, SubmitButton } from 'components/styled';
import { connect } from 'react-redux';
import { TRState } from 'reducer';
import { Set } from 'reducer/entities';

export interface SetDetailsScreenProps {
  deleteSet: typeof SetsActions.deleteSet;
  set?: Set;
}

export class SetDetailsScreen extends React.Component<SetDetailsScreenProps> {
  public static navigationOptions: NavigationTabScreenOptions = {
    headerStyle: {
      backgroundColor: '#1f6899',
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      color: 'white',
      fontWeight: 'bold',
    },
    title: 'Set Details',
  } as unknown as NavigationTabScreenOptions;

  public render() {
    const { set } = this.props;

    if (!set) {
      return <Text>No set! Must be a bug.</Text>;
    }

    return (
      <Container>
        <PaddedContent>
          <Form>
            <Text>Name: {set.name}</Text>
            <SubmitButton block={true} onPress={this.handleDelete}>
              <Text>Delete Set</Text>
            </SubmitButton>
          </Form>
        </PaddedContent>
      </Container>
    );
  }

  private handleDelete = () => {
    const { set } = this.props;
    if (set) {
      Alert.alert(
        'Delete Set',
        'Are you sure you want to delete this set?',
        [
          { text: 'No' },
          {
            onPress: () => { this.props.deleteSet(set.id); },
            text: 'Yes',
          },
        ],
      );
    }
  }
}

export default connect(
  ({ ui }: TRState) => ({
    set: ui.setDetailsScreen.selectedSet,
  }),
  { deleteSet: SetsActions.deleteSet },
)(SetDetailsScreen);
