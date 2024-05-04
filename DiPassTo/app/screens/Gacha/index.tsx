import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, {
  FC,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {tokenIcon, uploadSucess} from '../../assets/images';
import {finishRoll} from '../../assets/jsons';
import SpinWheel from './components/SpinWheel';
import Services from './services';
import {WIDTH_SCREEN} from './constants';

const poolInfo = {
  totalPoolPrize: 1000,
  dayEnd: '2025-10-10',
  ticketPrice: 10,
  mintedTickets: 100,
  totalMintedTickets: 1000,
  poolName: 'Pool 1',
  image: 'https://via.placeholder.com/150',
  ticketBalance: 100,
  tokenBalance: 1000,
};

type IHistory = {id: string; address: string; reward: number};

const dumpHistories: IHistory[] = [
  {
    id: '1',
    address: '0x225...89d0',
    reward: 300,
  },
  {
    id: '2',
    address: '0x235...e9d0',
    reward: 500,
  },
  {
    id: '3',
    address: '0x225...89d5',
    reward: 800,
  },
  {
    id: '4',
    address: '0x225...89de',
    reward: 1200,
  },
];

const Gacha: FC = ({}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const {
    totalPoolPrize,
    dayEnd,
    ticketPrice,
    mintedTickets,
    totalMintedTickets,
    poolName,
    image,
    ticketBalance,
    tokenBalance,
  } = poolInfo;

  const [balance, setBalance] = useState(0);
  const [balanceTicket, setBalanceTicket] = useState(0);

  const services = new Services();

  const getBalance = async () => {
    const servicesB: any = await services.getBalance();
    const blanceTicket = await services.getPriceTicket();
    setBalance(servicesB);
    console.log(blanceTicket, '___balanceTicket');
    setBalanceTicket(blanceTicket);
  };

  const isDisableBuyTicket = tokenBalance === 0;
  const isDisableSpin = ticketBalance === 0;

  const [histories, setHistories] = useState<IHistory[]>([]);

  useEffect(() => {
    getBalance();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dumpHistories.length);
      setHistories(state =>
        [dumpHistories[randomIndex], ...state]
          .slice(0, 6)
          .sort((a, b) => b.reward - a.reward),
      );
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toastRewardRef = useRef<{showReward: (message: string) => void}>(null);

  const onShowReward = () => {
    console.log('onShowReward');
    toastRewardRef.current?.showReward('You got 1000 token');
  };

  const onBuyTicket = async () => {
    console.log('on buy');
    const hash = await services.buyTicket();
    console.log(hash, '___hashhash');
    if (hash) {
      toastRewardRef.current?.showReward('You got 1 ticket');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.rowCenter, styles.field, styles.spaceBetween]}>
        <Pressable style={styles.back} onPress={goBack}>
          <Feather name={'chevron-left'} size={28} color="#fff" />
        </Pressable>
        <View style={styles.rowCenter}>
          <Text style={styles.ticketBalance}>
            <FontAwesome name={'ticket'} size={18} /> {balanceTicket?.length}
          </Text>
          <View style={styles.rowCenter}>
            <Image source={tokenIcon} style={styles.tokenIcon} />
            <Text style={styles.ticketBalance}>{balance}</Text>
          </View>
        </View>
      </View>
      <View style={styles.poolInfo}>
        <View style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
          <View style={[styles.rowCenter]}>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.name}>{poolName}</Text>
          </View>
          <Pressable
            style={[
              styles.buyTicketBtn,
              isDisableBuyTicket && styles.disableBtn,
            ]}
            onPress={onBuyTicket}>
            <Text style={styles.buyTicketText}>Buy Ticket</Text>
          </Pressable>
        </View>
        <View style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
          <Text style={styles.textField}>Total pool: {totalPoolPrize}</Text>
          <Text style={styles.textField}>Day end: {dayEnd}</Text>
        </View>
        <View style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
          <Text style={styles.textField}>Ticket price: {ticketPrice}</Text>
          <Text style={styles.textField}>
            Tickets: {mintedTickets}/{totalMintedTickets}
          </Text>
        </View>
      </View>
      <SpinWheel onShowReward={onShowReward} />
      <ToastReward ref={toastRewardRef} />
      {histories.length > 0 && (
        <View style={{padding: 16}}>
          <Text style={styles.name}>History</Text>
          {histories.map(history => {
            return (
              <View
                style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
                <Text style={styles.textField}>{history.address}</Text>
                <View style={styles.rowCenter}>
                  <Text style={[styles.textField, {marginRight: 8}]}>
                    {history.reward}
                  </Text>
                  <Image source={tokenIcon} style={styles.tokenIcon} />
                </View>
              </View>
            );
          })}
        </View>
      )}
    </SafeAreaView>
  );
};

const ToastReward = forwardRef(
  ({}, ref: Ref<{showReward: (message: string) => void}>) => {
    const [showReward, setShowReward] = useState(false);
    const [rewardMessage, setRewardMessage] = useState('');

    const hideToast = () => {
      setShowReward(false);
    };

    useImperativeHandle(
      ref,
      () => ({
        showReward: (message: string) => {
          setShowReward(true);
          setRewardMessage(message);
        },
      }),
      [],
    );
    if (!showReward) {
      return null;
    }
    return (
      <Pressable
        pointerEvents={'box-none'}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          zIndex: 1,
          top: '10%',
        }}
        onPress={hideToast}>
        <View
          style={{
            width: WIDTH_SCREEN - 64,
            backgroundColor: '#121212',
            alignItems: 'center',
            borderRadius: 16,
            position: 'absolute',
            marginTop: 150,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowRadius: 6,
            shadowOpacity: 0.1,
            elevation: 1,
            shadowColor: '#fff',
          }}>
          <LottieView
            style={{
              width: WIDTH_SCREEN,
              height: WIDTH_SCREEN,
              position: 'absolute',
              top: -100,
            }}
            source={finishRoll}
            autoPlay={true}
            loop={false}
            speed={1}
          />
          <Image
            style={{
              width: 120,
              height: 120,
              marginBottom: 20,
              marginTop: 16,
            }}
            source={uploadSucess}
          />
          <Text
            style={[
              styles.textField,
              {
                fontSize: 20,
                fontWeight: 600,
                marginBottom: 8,
              },
            ]}>
            Congratulation
          </Text>
          <Text
            style={[
              {
                textAlign: 'center',
                width: WIDTH_SCREEN / 1.5,
                marginBottom: 16,
              },
              styles.textField,
            ]}>
            {rewardMessage}
          </Text>
          <Pressable
            style={{
              width: '100%',
              paddingVertical: 16,
              borderTopWidth: 0.5,
              borderColor: '#434343',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={hideToast}>
            <Text style={styles.textField}>Ok</Text>
          </Pressable>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {flex: 1},
  name: {fontSize: 20, fontWeight: 'bold', color: '#fff', marginBottom: 8},
  rowCenter: {flexDirection: 'row', alignItems: 'center'},
  image: {width: 40, height: 40, marginRight: 16},
  field: {marginBottom: 8, width: '100%'},
  spaceBetween: {justifyContent: 'space-between'},
  ticketBalance: {fontSize: 18, color: '#fff', marginRight: 8},
  back: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
  },
  buyTicketBtn: {
    backgroundColor: '#6631FF',
    padding: 10,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  buyTicketText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  poolInfo: {padding: 16, alignItems: 'center'},
  disableBtn: {backgroundColor: '#DCDCDC'},
  tokenIcon: {width: 18, height: 18, marginRight: 4},
  textField: {
    fontSize: 16,
    color: '#fff',
  },
});

export default Gacha;
