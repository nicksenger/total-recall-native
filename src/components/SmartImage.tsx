import { Spinner, View } from 'native-base';
import React from 'react';
import { Image, ImageProps } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

import { CacheActions, TRActions } from 'actions';
import { TRState } from 'reducer';

export interface SmartImageProps extends ImageProps {
  source: { uri: string };
}

export default React.memo((props: SmartImageProps) => {
  const { source } = props;
  const dispatch = useDispatch<Dispatch<TRActions>>();
  const path = useSelector<TRState, string | undefined>(state => state.cache.cache[source.uri]);

  React.useEffect(
    () => {
      dispatch(CacheActions.fetchImage(source.uri));
    },
    [source],
  );

  if (path) {
    return (
      <Image
        {
          ...{
            ...props,
            source: {
              uri: path,
            },
          }
        }
      />
    );
  }

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Spinner />
    </View>
  );
});
