import React from 'react';
import {View, Image, Text, ImageBackground, StyleSheet} from 'react-native';

import {SYMBOL_WIDTH, SYMBOL_RATIO} from '../constants';
import {
  rewardFrame1,
  rewardFrame2,
  rewardFrame3,
  rewardFrame4,
  rewardFrame5,
  tokenIcon,
} from '../../../assets/images';
const WheelItem = ({
  prizeKey,

  rewardsConfig,
}: {
  prizeKey: string;

  rewardsConfig: {id: string; symbol: string; reward: number}[];
}) => {
  const getRewardConfig = (symbol: string) => {
    const remoteConfig = rewardsConfig.find(item => item.symbol === symbol) || {
      id: 'reward_1',
      symbol: 'A',
      reward: 1000,
    };
    switch (symbol) {
      case 'A':
        return {
          ...remoteConfig,
          ...{backgroundImage: rewardFrame1},
        };
      case 'B':
        return {
          ...remoteConfig,
          ...{backgroundImage: rewardFrame2},
        };
      case 'C':
        return {
          ...remoteConfig,
          ...{backgroundImage: rewardFrame3},
        };
      case 'D':
        return {
          ...remoteConfig,
          ...{backgroundImage: rewardFrame4},
        };
      case 'E':
        return {
          ...remoteConfig,
          ...{backgroundImage: rewardFrame5},
        };
    }
  };

  const config = getRewardConfig(prizeKey);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={config?.backgroundImage}
        style={styles.backgroundItem}>
        <Image source={tokenIcon} style={styles.tokenIcon} />
        <Text style={styles.reward}>{config?.reward}</Text>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: SYMBOL_WIDTH,
    height: SYMBOL_WIDTH * SYMBOL_RATIO,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundItem: {
    width: SYMBOL_WIDTH - 16,
    height: (SYMBOL_WIDTH - 16) * SYMBOL_RATIO,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tokenIcon: {
    width: (SYMBOL_WIDTH - 16) / 2.5,
    height: (SYMBOL_WIDTH - 16) / 2.5,
    marginBottom: 5,
  },
  reward: {fontSize: 18, fontWeight: 'bold', lineHeight: 20},
});

export default WheelItem;
