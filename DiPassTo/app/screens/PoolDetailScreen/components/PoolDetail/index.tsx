import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-elements';
import {IPoolInfo} from '../../../../types';
type Props = {
  data: IPoolInfo;
};
export function PoolDetail({data}: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <Image
          style={styles.poolImage}
          source={{
            uri: data.imageUrl,
          }}
        />
        <View style={styles.poolInfoCtn}>
          <Text numberOfLines={1}>{data.title}</Text>

          <View>
            <Text>Remaining: {data.remaining}</Text>
            <Text>Created by: </Text>
          </View>

          {/* <View style={styles.poolInfo}>
            <Text numberOfLines={1} style={styles.txtName}>
              {data.title}
            </Text>

            <View>
                <Text>Remaining: {data.remaining}</Text>
              </View>
          </View> */}
          <Button style={styles.flex1} title="Join pool" />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  // flex1: {
  //   flex: 1,
  // },
  container: {},
  cardContent: {
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  poolImage: {
    aspectRatio: 16 / 9,
  },
  poolInfoCtn: {
    padding: 8,
    rowGap: 8,
  },
  poolInfo: {
    // flexDirection: 'row',
    // alignItems: 'flex-start',
    // columnGap: 16,
  },
  // poolInfoRight: {
  //   flexShrink: 0,
  // },
  txtName: {
    fontSize: 16,
    flex: 1,
    fontWeight: 500,
  },
  flex1: {flex: 1},
});
