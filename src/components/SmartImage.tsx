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

export class SmartImage extends React.PureComponent<SmartImageProps> {
  public componentDidMount() {
    const { fetchImage, source } = this.props;
    fetchImage(source.uri);
  }

  public render() {
    const { path } = this.props;

    if (path) {
      return (
        <Image
          {
            ...{
              ...this.props,
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
  }
}

interface OwnProps extends ImageProps {
  source: { uri: string };
}

export default connect(
  ({ cache }: TRState, { source: { uri } }: OwnProps) => ({ path: cache.cache[uri] }),
  { fetchImage: CacheActions.fetchImage },
)(SmartImage);
