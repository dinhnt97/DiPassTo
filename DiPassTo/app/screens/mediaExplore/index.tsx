import React, {useCallback, useEffect, useRef, useState} from 'react';
import {FlatList, View, ViewToken} from 'react-native';

import _ from 'lodash';
import LottieView from 'lottie-react-native';
import {NestingMainTabsScreenProps} from '../../MainNavigation';
import {loading} from '../../assets/jsons';
import {PostSingle} from './components/PostVideo';
import {PostInfoType, postList} from './types';
import {getRendererVideos} from './utils';

const MediaExplore = ({navigation}: NestingMainTabsScreenProps<'Home'>) => {
  const [renderData, setRenderData] = useState<PostInfoType[]>([]);
  const [viewableItemKey, setViewableItemKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [itemHeight, setItemHeight] = useState<number>(0);
  useEffect(() => {
    const updateReaction = async () => {
      const renderPosts = await getRendererVideos(postList);
      setRenderData(renderPosts);
      _.debounce(() => {
        setIsLoading(false);
      }, 300)();
    };
    updateReaction();
  }, []);
  const onViewableItemsChanged = useRef(
    (info: {viewableItems: Array<ViewToken>; changed: Array<ViewToken>}) => {
      const {changed} = info;
      changed.forEach((element: ViewToken) => {
        if (element.isViewable) {
          setViewableItemKey(element.key);
        }
      });
    },
  );

  const renderItem = ({item}: {item: PostInfoType; index: number}) => {
    return (
      <PostSingle
        item={item}
        key={item.id}
        itemHeight={itemHeight}
        isViewable={viewableItemKey === item.id}
      />
    );
  };

  const getItemLayout = useCallback(
    (data, index) => ({
      length: itemHeight,
      offset: itemHeight * index,
      index,
    }),
    [itemHeight],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'black'}}>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
          }}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            setItemHeight(height);
          }}>
          <LottieView
            style={{
              alignSelf: 'center',
              width: 150,
              height: 150,
            }}
            source={loading}
            autoPlay={true}
            speed={1}
            loop={true}
          />
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={renderData}
          windowSize={4}
          maxToRenderPerBatch={3}
          removeClippedSubviews
          viewabilityConfig={{
            itemVisiblePercentThreshold: 90,
          }}
          renderItem={renderItem}
          getItemLayout={getItemLayout}
          pagingEnabled
          keyExtractor={item => item.id}
          decelerationRate={'normal'}
          updateCellsBatchingPeriod={1000}
          onViewableItemsChanged={onViewableItemsChanged.current}
          onEndReachedThreshold={0.5}
        />
      )}
    </View>
  );
};

export default MediaExplore;
