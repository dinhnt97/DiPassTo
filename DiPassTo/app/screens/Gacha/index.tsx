import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import moment from 'moment';
import React, {
  FC,
  Ref,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {tokenIcon, uploadSucess} from '../../assets/images';
import {finishRoll} from '../../assets/jsons';
import SpinWheel from './components/SpinWheel';
import {WIDTH_SCREEN} from './constants';

const poolInfo = {
  totalPoolPrize: 1000,
  dayEnd: '2025-10-10',
  ticketPrice: 10,
  mintedTickets: 100,
  totalMintedTickets: 1000,
  poolName: 'Harry Jacob',
  image:
    'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRbIx8Tfdj8Myye_psedy7_bGTFUqDSf8ipoBjSAFD7bRJAbuY4Y7OMU5VWbjqcPtKwnJtIrVwcw-7HwLg',
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

const dumpAddress = [
  '0x225...89d0',
  '0x235...e9d0',
  '0x225...89d5',
  '0x225...89de',
];

const Gacha: FC = ({}) => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };
  const {dayEnd, poolName, image} = poolInfo;

  const [balance, setBalance] = useState(8000);
  const [ticketBalance, setTicketBalance] = useState(0);
  const [totalPoolPrize, setTotalPoolPrize] = useState(10000);
  const ticketPoolRatePrice = 5;
  const ticketPrice = useMemo(() => {
    return totalPoolPrize * (ticketPoolRatePrice / 100);
  }, [totalPoolPrize]);

  const [isBuyingTicket, setIsBuyingTicket] = useState(false);

  const isDisableBuyTicket = balance === 0;

  const [histories, setHistories] = useState<IHistory[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * dumpHistories.length);
      const address = dumpAddress[randomIndex];
      const rewards = [0.5, 0.3, 0.15, 0.05];
      const randomReward =
        rewards[Math.floor(Math.random() * rewards.length)] * totalPoolPrize;
      const dumpHistory = {
        id: Math.random().toString(),
        address,
        reward: randomReward,
      };
      setTotalPoolPrize(state => state - randomReward + ticketPrice);
      setHistories(state =>
        [dumpHistory, ...state].slice(0, 6).sort((a, b) => b.reward - a.reward),
      );
    }, 50 * 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const toastRewardRef = useRef<{showReward: (message: string) => void}>(null);

  const onShowReward = (reward: string, randomReward: number) => {
    const randomIndex = Math.floor(Math.random() * dumpHistories.length);
    const address = dumpAddress[randomIndex];
    const dumpHistory = {
      id: Math.random().toString(),
      address,
      reward: randomReward,
    };
    setHistories(state =>
      [dumpHistory, ...state].slice(0, 6).sort((a, b) => b.reward - a.reward),
    );
    setBalance(state => state + randomReward);
    setTotalPoolPrize(state => state - randomReward);
    toastRewardRef.current?.showReward(reward);
  };

  const onBuyTicket = async () => {
    setIsBuyingTicket(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setBalance(state => state - ticketPrice);
    setTotalPoolPrize(state => state + ticketPrice);
    setTicketBalance(state => state + 1);
    toastRewardRef.current?.showReward('You got 1 ticket');
    setIsBuyingTicket(false);
  };

  const rollTicket = async () => {
    setTicketBalance(state => state - 1);
    await new Promise(resolve => setTimeout(resolve, 3000));
    const rewardIds = ['A', 'B', 'C', 'D'];
    const randomRewardId =
      rewardIds[Math.floor(Math.random() * rewardIds.length)];

    return randomRewardId;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.rowCenter, styles.field, styles.spaceBetween]}>
        <Pressable style={styles.back} onPress={goBack}>
          <Feather name={'chevron-left'} size={28} color="#fff" />
        </Pressable>
        <View style={styles.rowCenter}>
          <Text style={styles.ticketBalance}>
            <FontAwesome name={'ticket'} size={18} /> {ticketBalance}
          </Text>
          <View style={styles.rowCenter}>
            <Image source={tokenIcon} style={styles.tokenIcon} />
            <Text style={styles.ticketBalance}>{Math.floor(balance)}</Text>
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
              (isDisableBuyTicket || isBuyingTicket) && styles.disableBtn,
            ]}
            disabled={isDisableBuyTicket || isBuyingTicket}
            onPress={onBuyTicket}>
            {isBuyingTicket ? (
              <ActivityIndicator size={18} />
            ) : (
              <Text style={styles.buyTicketText}>Buy Ticket</Text>
            )}
          </Pressable>
        </View>
        <View style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
          <View style={styles.rowCenter}>
            <Text style={styles.textField}>
              Total pool: {Math.floor(totalPoolPrize)}{' '}
            </Text>
            <Image source={tokenIcon} style={styles.tokenIcon} />
          </View>

          <Text style={styles.textField}>
            Day end: {moment(dayEnd).format('DD/MM/YYYY')}
          </Text>
        </View>
        <View style={[styles.rowCenter, styles.spaceBetween, styles.field]}>
          <View style={styles.rowCenter}>
            <Text style={styles.textField}>
              Ticket price: {Math.floor(ticketPrice)}{' '}
            </Text>
            <Image source={tokenIcon} style={styles.tokenIcon} />
          </View>
          <View />
        </View>
      </View>
      <SpinWheel
        onShowReward={onShowReward}
        ticketBalance={ticketBalance}
        rollTicket={rollTicket}
        poolPrize={totalPoolPrize}
      />
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
                    {Math.floor(history.reward)}
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
