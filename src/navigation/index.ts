import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import Initial from 'components/screens/Initial';

export default createAppContainer(createSwitchNavigator(
    { initial: Initial },
    { initialRouteName: 'initial' },
));
