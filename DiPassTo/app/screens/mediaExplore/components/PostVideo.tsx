import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';

import {useIsFocused} from '@react-navigation/native';
import Video from 'react-native-video';

import PostSingleOverlay from './PostSingleOverlay';
import {PostInfoType} from '../types';
import {useIsForeground} from '../utils';

const ScreenWidth = Dimensions.get('window').width;

export const PostSingle = ({
  item,
  itemHeight,
  isViewable,
}: {
  item: PostInfoType;
  itemHeight: number;
  isViewable: boolean;
}) => {
  const [videoState, setVideoState] = useState<'pause' | 'play' | 'stop'>(
    'stop',
  );
  const isFocussed = useIsFocused();
  const isForeground = useIsForeground();
  const isFocusExplore = isFocussed && isForeground;

  useEffect(() => {
    setVideoState(state => {
      if (!isViewable) {
        return 'stop';
      } else {
        return isFocusExplore ? 'play' : 'pause';
      }
    });
  }, [isViewable, isFocusExplore]);

  useEffect(() => {
    setVideoState(state => {
      return isViewable ? 'play' : 'stop';
    });
  }, [isViewable]);

  const handleVideoByUser = useCallback(
    (curVideoState: 'pause' | 'play' | 'stop') => {
      setVideoState(curVideoState);
    },
    [],
  );
  const onHandleClick = () => {
    if (videoState === 'pause') {
      handleVideoByUser && handleVideoByUser('play');
    }
    if (videoState === 'play') {
      handleVideoByUser && handleVideoByUser('pause');
    }
  };

  return (
    <View
      style={{
        height: itemHeight,
        width: ScreenWidth,
        backgroundColor: '#000000',
      }}>
      <PostSingleOverlay
        post={item}
        height={itemHeight}
        videoState={videoState}
        onHandleClick={onHandleClick}
      />
      {videoState === 'stop' ? (
        <Image
          source={{
            uri: item.thumbnailUrl,
          }}
          style={{
            width: ScreenWidth,
            height: itemHeight,
          }}
          resizeMode={item.videoDisplayRate > 0.7 ? 'contain' : 'cover'}
        />
      ) : (
        <Video
          ignoreSilentSwitch={'ignore'}
          style={styles.container}
          resizeMode={item.videoDisplayRate > 0.7 ? 'contain' : 'cover'}
          repeat={true}
          paused={videoState === 'pause'}
          //controls
          poster={item.thumbnailUrl || undefined}
          posterResizeMode={'cover'}
          source={{
            uri: item.videoUrl,
          }}
          bufferConfig={{
            minBufferMs: 3000,
            maxBufferMs: 30000,
            bufferForPlaybackMs: 1000,
            bufferForPlaybackAfterRebufferMs: 5000,
          }}
        />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
