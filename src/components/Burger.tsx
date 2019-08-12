import { Ionicons } from '@expo/vector-icons';
import { openDrawer } from 'navigation/service';
import * as React from 'react';

export default React.memo(() => (
  <Ionicons
    name="md-menu"
    onPress={() => openDrawer()}
    size={25}
    style={{
      color: 'white',
      marginRight: 15,
    }}
  />
));
