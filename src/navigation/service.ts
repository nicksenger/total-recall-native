import {
  NavigationActions,
  NavigationParams,
  NavigationProp,
  NavigationScreenProps,
} from 'react-navigation';

let navigator: NavigationProp<{}>;
let drawerNav: NavigationScreenProps['navigation'];

export const setNavigator = (ref: NavigationProp<{}>) => { navigator = ref; };
export const setDrawerNavigator = (ref: NavigationScreenProps['navigation']) => {
  if (!drawerNav) {
    drawerNav = ref;
  }
};

export const navigate = (routeName: string, params?: NavigationParams) => {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.navigate({
        params,
        routeName,
      }),
    );
  }
};

export const goBack = (options?: NavigationParams) => {
  if (navigator) {
    navigator.dispatch(
      NavigationActions.back(options),
    );
  }
};

export const openDrawer = () => {
  if (drawerNav) {
    drawerNav.toggleDrawer();
  }
};
