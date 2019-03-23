import { NavigationActions, NavigationParams, NavigationProp } from 'react-navigation';

let navigator: NavigationProp<{}>;

export const setNavigator = (ref: NavigationProp<{}>) => { navigator = ref; };

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
