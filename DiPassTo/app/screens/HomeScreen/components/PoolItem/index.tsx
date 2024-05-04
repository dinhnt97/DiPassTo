import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from 'react-native-elements';
import {truncate} from '../../../../helpers/string';
import {formatDate} from '../../../../helpers/time';
import {IPoolInfo} from '../../../../types';
import {useNavigation} from '@react-navigation/native';
type Props = {
  data: IPoolInfo;
};
export default function PoolItem({data}: Props) {
  const navigation = useNavigation();
  function handlePress() {
    // navigate();
    navigation.navigate('Gacha');
  }
  return (
    <View style={styles.shadow}>
      <TouchableOpacity
        style={styles.container}
        // onPress={() => {
        //   navigation.navigate('Gacha');
        // }}
        activeOpacity={0.9}>
        <View>
          <Image
            style={styles.poolImage}
            source={{
              uri: data.imageUrl,
            }}
          />
          <View style={styles.poolInfo}>
            <Text numberOfLines={1} style={styles.txtName}>
              {data.title}
            </Text>
            <Text numberOfLines={1} style={styles.txtDes}>
              {formatDate(data.startTime)} - {formatDate(data.endTime)}
            </Text>
            <Text numberOfLines={1} style={styles.txtDes}>
              Created By: {truncate(data.createdBy || '')}
            </Text>
            <Text numberOfLines={1} style={styles.txtDes}>
              Total: {data.totalMinted || 0} / {data.totalTicket || 0}
            </Text>
            <Button
              buttonStyle={{
                marginTop: 4,
                backgroundColor: '#6631FF',
              }}
              title="Detail"
              onPress={handlePress}
            />

            {/* <View style={styles.poolInfoRight}>
            <View>
              <Text>Remaining: {data.remaining}</Text>
            </View>
          </View> */}
          </View>
        </View>
      </TouchableOpacity>
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
    shadowOpacity: 0.2,
    shadowRadius: 16.0,

    elevation: 24,
  },
  container: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#121212',
  },
  poolImage: {
    aspectRatio: 16 / 9,
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
  txtName: {
    color: '#fff',
    fontSize: 18,
    flex: 1,
  },
  txtDes: {
    color: '#DCDCDC',
  },
});
