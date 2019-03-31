import { Ionicons } from '@expo/vector-icons';
import { openDrawer } from 'navigation/service';
import * as React from 'react';

export default class Burger extends React.Component<{}> {
  public render() {
    return (
      <Ionicons
        name="md-menu"
        onPress={this.toggleMenu}
        size={25}
        style={{
          color: 'white',
          marginRight: 15,
        }}
      />
    );
  }

  private toggleMenu() {
    openDrawer();
  }
}
