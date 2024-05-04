import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {PostInfoType} from '../types';

export default function PostSingleOverlay({
  post,
  videoState,
  height,
  onHandleClick,
}: {
  post: PostInfoType;
  videoState: 'pause' | 'play' | 'stop';
  height: number;
  onHandleClick: () => void;
}) {
  const {title, shareCount, reactionCount, commentCount} = post;
  const styles = getStyles();

  return (
    <Pressable
      //activeOpacity={1}
      style={[styles.container, {height, width: '100%'}]}
      onPress={onHandleClick}
      //onPressIn={onHandleUser}
      //onTouchStart={onHandleUser}
    >
      {videoState === 'pause' ? (
        <FontAwesome5
          name={'play'}
          size={80}
          color={'#00000030'}
          style={{
            position: 'absolute',
            top: height / 2 - 50,
            alignSelf: 'center',
          }}
        />
      ) : null}
      <View
        style={{
          position: 'absolute',
          left: 16,
          bottom: 46,
          width: '70%',
        }}>
        {post.title ? (
          <Text style={styles.displayName} numberOfLines={2}>
            {title}
          </Text>
        ) : null}
        {post.content ? (
          <Text style={styles.description} numberOfLines={1}>
            {post.content}
          </Text>
        ) : null}
      </View>

      <View style={styles.rightCol}>
        <PostUserImage post={post} />

        <PostActions
          commentCount={commentCount}
          reactionCount={reactionCount}
          shareCount={shareCount}
        />
      </View>
    </Pressable>
  );
}

export const PostActions = ({
  commentCount,
  reactionCount,
  shareCount,
}: {
  commentCount: number;
  reactionCount: number;
  shareCount: number;
}) => {
  return (
    <View>
      <Pressable
        style={{
          marginTop: 15,
          alignItems: 'center',
        }}>
        {/* <Feather name={'heart'} size={24} color={'white'} /> */}
        <AntDesignIcon name={'hearto'} size={24} color={'white'} />
        <Text
          style={[
            {
              marginTop: 6,
              fontSize: 14,
              lineHeight: 16,
              color: '#FFFFFF',
              textShadowColor: '#00000050',
              textShadowRadius: 3,
              textShadowOffset: {
                height: 0.5,
                width: 0.5,
              },
            },
          ]}>
          {reactionCount}
        </Text>
      </Pressable>

      <Pressable style={{marginTop: 15, alignItems: 'center'}}>
        <FontAwesome5 name={'comment-dots'} size={24} color={'white'} />
        <Text
          style={[
            {
              fontSize: 14,
              lineHeight: 16,
              color: '#FFFFFF',
              marginTop: 6,
              textShadowColor: '#00000050',
              textShadowRadius: 3,
              textShadowOffset: {
                height: 0.5,
                width: 0.5,
              },
            },
          ]}>
          {commentCount}
        </Text>
      </Pressable>

      <Pressable
        style={{
          marginTop: 15,
          alignItems: 'center',
        }}>
        <Entypo name={'share'} size={24} color={'white'} />
        <Text
          style={{
            color: 'white',
            marginTop: 6,
            textShadowColor: '#00000050',
            textShadowRadius: 3,
            textShadowOffset: {
              height: 0.5,
              width: 0.5,
            },
          }}>
          {shareCount}
        </Text>
      </Pressable>
    </View>
  );
};

export const PostUserImage = ({post}: {post: PostInfoType}) => {
  const styles = getStyles();
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.normalAvatarContainer,
          {
            borderWidth: 2,
            borderColor: 'white',
            borderRadius: 999,
          },
        ]}>
        <Image
          style={styles.avatar}
          source={{
            uri: post.userAvatar,
          }}
        />
      </View>
    </TouchableOpacity>
  );
};
const getStyles = () => {
  return StyleSheet.create({
    handleView: {
      flex: 1,
      width: '100%',
      alignItems: 'center',
    },
    infoWrapper: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginBottom: 16,
    },
    loading: {
      alignSelf: 'center',
      width: 50,
      height: 50,
    },
    marqueeContainer: {
      width: '50%',
      height: 30,
      justifyContent: 'center',
      paddingHorizontal: 10,
    },
    musicIconContainer: {
      height: 30,
      paddingRight: 10,
      width: '50%',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
    avatarContainer: {
      width: 50,
      height: 50,
      borderWidth: 1,
      borderColor: '#F4F4F4',
      borderRadius: 8,
      transform: [{skewY: '-5deg'}],
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    normalAvatarContainer: {
      width: 45,
      height: 45,
      borderWidth: 1,
      borderColor: '#F4F4F4',
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 999,
    },
    container: {
      position: 'absolute',
      zIndex: 1,
      bottom: 0,
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    musicContainer: {
      height: 30,
      backgroundColor: '#F4F4F430',
      width: '100%',
      flexDirection: 'row',
      // zIndex: 3,
      // bottom: 0,
      // position: 'absolute',
    },
    actionTxt: {
      color: '#F4F4F4',
      justifyContent: 'center',
      alignItems: 'center',
    },
    actionContainer: {
      flex: 1,
      height: 34,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: '#F4F4F4',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'rgba( 255, 255, 255, 0.1 )',
    },
    displayName: {
      fontWeight: 'bold',
      fontSize: 16,
      color: '#FFFFFF',
      textShadowColor: '#00000050',
      textShadowRadius: 3,
      textShadowOffset: {
        height: 0.5,
        width: 0.5,
      },
    },
    description: {
      marginTop: 8,
      //color: colors.text.default,
      color: '#FFFFFF',
      textShadowColor: '#00000050',
      textShadowRadius: 3,
      textShadowOffset: {
        height: 0.5,
        width: 0.5,
      },
    },

    leftContainer: {
      alignItems: 'center',
    },
    actionButton: {
      paddingBottom: 16,
    },
    actionButtonText: {
      color: 'white',
      textAlign: 'center',
      marginTop: 4,
    },
    actionGroupContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    textShadow: {
      textShadowColor: '#0E0230',
      textShadowRadius: 20,
    },
    eventBtn: {
      height: 30,
      backgroundColor: '#33333350',
      alignItems: 'center',
      alignSelf: 'flex-start',
      paddingHorizontal: 5,
      flexDirection: 'row',
      borderRadius: 4,
      maxWidth: 200,
      marginBottom: 10,
    },
    rightCol: {
      position: 'absolute',
      right: 10,
      bottom: 70,
      alignItems: 'center',
    },
  });
};
