import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import SpinWheel from './components/SpinWheel';

const Gacha: FC = () => {
  return (
    <View style={styles.container}>
      <View />
      <SpinWheel onShowReward={() => {}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default Gacha;
