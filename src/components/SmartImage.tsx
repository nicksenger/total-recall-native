import React from 'react';
import { Image, ImageProps } from 'react-native';
import { connect } from 'react-redux';

import { CacheActions } from 'actions';
import { Spinner, View } from 'native-base';
import { TRState } from 'reducer';

export interface SmartImageProps extends ImageProps {
  fetchImage: typeof CacheActions['fetchImage'];
  source: { uri: string };
  path?: string;
}

const SmartImage = (props: SmartImageProps) => {
  const { fetchImage, path, source } = props;

  React.useEffect(
    () => {
      fetchImage(source.uri);
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
};

interface OwnProps extends ImageProps {
  source: { uri: string };
}

export default connect(
  ({ cache }: TRState, { source: { uri } }: OwnProps) => ({ path: cache.cache[uri] }),
  { fetchImage: CacheActions.fetchImage },
)(React.memo(SmartImage));
