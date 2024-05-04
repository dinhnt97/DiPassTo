import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import _ from 'lodash';
import {Easing} from 'react-native-reanimated';

import {
  ACCELERATION,
  DEFAULT_SPEED,
  MAX_SPEED,
  MIN_SPEED,
  START_DURATION,
  START_POSITION,
  SYMBOLS,
  SYMBOL_RATIO,
  SYMBOL_WIDTH,
  WIDTH_SCREEN,
} from '../constants';

import {wheelPointResult, wheelRollBackground} from '../../../assets/images';
import WheelItem from './WheelItem';

const SpinWheel = ({
  onShowReward,
}: {
  onShowReward: (message: string) => void;
}) => {
  const [scrollPos] = useState(new Animated.Value(START_POSITION));
  const reelSymbols = SYMBOLS.repeat(20).split('');
  const currentScrollPos = useRef(START_POSITION);
  const resultRef = useRef<string>('');
  const isNeedToStopRef = useRef(false);
  const currentIndex = useRef(1);
  const speedRef = useRef(DEFAULT_SPEED);
  const isGainMaxSpeed = useRef(false);
  const isGainConditionToDecreaseSpeed = useRef(false);
  const isRollWheel = useRef(false);

  const rewardsConfig = [
    {id: 'reward_1', symbol: 'A', reward: 500},
    {id: 'reward_2', symbol: 'B', reward: 100},
    {id: 'reward_3', symbol: 'C', reward: 10},
    {id: 'reward_4', symbol: 'D', reward: 1},
    {id: 'reward_5', symbol: 'E', reward: 0.01},
  ];

  const increaseSpeed = (currentSpeed = speedRef.current) => {
    return (
      Number(
        BigInt((currentSpeed * 1e9).toFixed(0)) +
          BigInt((ACCELERATION * 1e9).toFixed(0)),
      ) / 1e9
    );
  };

  const decreaseSpeed = (currentSpeed = speedRef.current) => {
    return (
      Number(
        BigInt((currentSpeed * 1e9).toFixed(0)) -
          BigInt((ACCELERATION * 1e9).toFixed(0)),
      ) / 1e9
    );
  };

  const checkGainConditionToDecreaseSpeed = (
    currentIndex: number,
    result: string,
    currentSpeed: number,
  ) => {
    let i = currentSpeed;
    while (i >= MIN_SPEED) {
      i = decreaseSpeed(i);
      currentIndex++;
    }
    return reelSymbols[currentIndex] === result;
  };

  const startAnimation = (offset: number, duration = START_DURATION) => {
    Animated.sequence([
      Animated.timing(scrollPos, {
        toValue: currentScrollPos.current - SYMBOL_WIDTH * offset,
        duration: duration,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (!isNeedToStopRef.current) {
        if (speedRef.current >= MAX_SPEED) {
          isGainMaxSpeed.current = true;
        }
        currentScrollPos.current -= SYMBOL_WIDTH * offset;
        currentIndex.current += offset;
        if (!resultRef.current) {
          if (!isGainMaxSpeed.current) {
            speedRef.current = increaseSpeed();
          }
          startAnimation(
            offset,
            Number((offset / speedRef.current).toFixed(0)),
          );
        } else {
          if (!isGainMaxSpeed.current) {
            speedRef.current = increaseSpeed();
          } else if (!isGainConditionToDecreaseSpeed.current) {
            isGainConditionToDecreaseSpeed.current =
              checkGainConditionToDecreaseSpeed(
                currentIndex.current,
                resultRef.current,
                speedRef.current,
              );
          }
          if (isGainConditionToDecreaseSpeed.current) {
            speedRef.current = decreaseSpeed();
          }
          if (speedRef.current >= MIN_SPEED) {
            startAnimation(
              offset,
              Number((offset / speedRef.current).toFixed(0)),
            );
          } else {
            _.debounce(
              () =>
                onShowReward(
                  `You have received ${
                    rewardsConfig.find(
                      item => item.symbol === resultRef.current,
                    )?.reward
                  } CAP token`,
                ),
              300,
            )();
            _.debounce(() => {
              isRollWheel.current = false;
            }, 600)();
          }
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      isNeedToStopRef.current = true;
    };
  }, []);

  const resetAllState = () => {
    let resetIndex = 1;
    if (resultRef.current) {
      resetIndex +=
        SYMBOLS.length - 1 + (currentIndex.current % SYMBOLS.length);
    }
    const scrollPosPoint = -1 * resetIndex * SYMBOL_WIDTH - START_POSITION;
    scrollPos.setValue(scrollPosPoint);
    isNeedToStopRef.current = false;
    currentScrollPos.current = scrollPosPoint;
    speedRef.current = DEFAULT_SPEED;
    isGainMaxSpeed.current = false;
    currentIndex.current = resetIndex;
    resultRef.current = '';
    isGainConditionToDecreaseSpeed.current = false;
    scrollPos.setValue(scrollPosPoint);
  };

  const startRollWheel = async () => {
    if (isRollWheel.current) {
      return;
    }
    isRollWheel.current = true;
    try {
      resetAllState();
      startAnimation(1, 1 / DEFAULT_SPEED);
      await new Promise(resolve => setTimeout(resolve, 3000));
      resultRef.current = 'B';
    } catch (error: any) {
      isNeedToStopRef.current = true;
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={wheelRollBackground}
        style={styles.wheelBackground}>
        <View>
          {!!rewardsConfig && (
            <View style={styles.wheelContainer}>
              <Animated.View
                style={[
                  styles.wheelItemsContainer,
                  {
                    width: SYMBOL_WIDTH * reelSymbols.length,
                    transform: [{translateX: scrollPos}],
                  },
                ]}>
                {reelSymbols.map((item, index) => (
                  <WheelItem
                    prizeKey={item}
                    key={index}
                    rewardsConfig={rewardsConfig}
                  />
                ))}
              </Animated.View>
            </View>
          )}
        </View>
        <Image style={styles.spinWheelBackground} source={wheelPointResult} />
      </ImageBackground>
      <Pressable onPress={startRollWheel} style={styles.spinBtn}>
        <Text style={styles.textSpin}>Spin Now</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  textSpin: {
    fontSize: 18,
    lineHeight: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  spinBtn: {
    marginTop: 16,
    width: 180,
    height: 40,
    backgroundColor: '#6631FF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  spinWheelBackground: {
    width: WIDTH_SCREEN / 15,
    height: ((WIDTH_SCREEN / 15) * 19) / 13,
    position: 'absolute',
    bottom: ((WIDTH_SCREEN / 35) * 19) / 13 + 10,
  },
  container: {alignItems: 'center'},
  wheelBackground: {
    width: WIDTH_SCREEN,
    height: WIDTH_SCREEN * (200 / 375),
    justifyContent: 'center',
    alignItems: 'center',
  },
  wheelContainer: {
    flexDirection: 'row',
    width: WIDTH_SCREEN,
  },
  wheelItemsContainer: {
    height: SYMBOL_WIDTH * SYMBOL_RATIO,
    flexDirection: 'row',
  },
});

export default SpinWheel;
