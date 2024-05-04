import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, LayoutAnimation, StyleSheet, Text, View} from 'react-native';
import {Avatar, Button} from 'react-native-elements';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {truncate} from '../../../../helpers/string';
import {formatDate} from '../../../../helpers/time';
import {useBoolean} from '../../../../hooks';
import {IPoolInfo} from '../../../../types';

type Props = {
  data: IPoolInfo;
};
export default function PoolItem({data}: Props) {
  const {value: isFollow, toggle: toggleFollow} = useBoolean(
    Math.random() > 0.5,
  );
  const navigation = useNavigation();
  function handlePress() {
    // navigate();
    navigation.navigate('Gacha');
  }
  return (
    <View style={styles.shadow}>
      <View
        style={styles.container}
        // onPress={() => {
        //   navigation.navigate('Gacha');
        // }}
      >
        <View>
          <Image
            style={styles.poolImage}
            source={{
              uri: data.imageUrl,
            }}
          />
          <View style={styles.poolInfo}>
            <View style={styles.groupNameInfo}>
              <Avatar
                rounded
                size={35}
                source={{
                  uri: 'https://ui-avatars.com/api/?name=John+Doe',
                }}
              />
              <Text style={styles.txtName}>Lorem, ipsum dolor.</Text>
              {!isFollow && (
                <Button
                  title={'+ Follow'}
                  type="clear"
                  buttonStyle={styles.btnFollow}
                  titleStyle={styles.txtFollow}
                  onPress={() => {
                    LayoutAnimation.configureNext(
                      LayoutAnimation.Presets.easeInEaseOut,
                    );
                    toggleFollow();
                  }}
                />
              )}
            </View>
            <View style={styles.poolInfoRow}>
              <Text numberOfLines={1} style={styles.txtTitle}>
                {data.title}
              </Text>
              {/* <Text numberOfLines={1} style={[styles.txtDes, styles.body12]}>
                {data.totalMinted || 0} / {data.totalTicket || 0}
              </Text> */}
            </View>
            <View style={styles.groupCreatedBy}>
              <Text style={styles.txtDes}>
                Address: {truncate(data.createdBy || '')}
              </Text>
            </View>
            <View style={styles.poolInfoRow}>
              <Text
                numberOfLines={1}
                style={[styles.txtDes, styles.flex1, styles.body12]}>
                <FeatherIcon name="calendar" size={14} />{' '}
                {formatDate(data.startTime)} - {formatDate(data.endTime)}
              </Text>
              <Text numberOfLines={1} style={[styles.txtDes, styles.body12]}>
                {data.totalMinted || 0} / {data.totalTicket || 0}
              </Text>
            </View>

            {isFollow && (
              <Button
                buttonStyle={{
                  marginTop: 4,
                  backgroundColor: '#6631FF',
                }}
                title="Join"
                onPress={handlePress}
              />
            )}

            {/* <View style={styles.poolInfoRight}>
            <View>
              <Text>Remaining: {data.remaining}</Text>
            </View>
          </View> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#6631FF',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 24,
  },
  container: {
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: '#1a1a1a',
    // 1a1a1a
  },
  poolImage: {
    aspectRatio: 16 / 9,
  },
  poolInfoRow: {
    flexDirection: 'row',
    rowGap: 8,
    columnGap: 16,
    alignItems: 'center',
  },
  poolInfo: {
    // flexDirection: 'row',
    padding: 16,
    // paddingVertical: 16,
    // alignItems: 'flex-start',
    rowGap: 8,
    // columnGap: 16,
  },
  poolInfoRight: {
    flexShrink: 0,
    color: '#DCDCDC',
  },
  txtTitle: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  txtDes: {
    color: '#DCDCDC',
  },

  groupCreatedBy: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 4,
  },
  body12: {
    fontSize: 12,
  },
  groupNameInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 8,
  },
  txtName: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  txtFollow: {
    // color: 'rgba(136, 134, 246, 1)',
    fontSize: 14,
  },
  btnFollow: {
    flexShrink: 0,
    padding: 0,
    margin: 0,
  },
  flex1: {
    flex: 1,
  },
});
