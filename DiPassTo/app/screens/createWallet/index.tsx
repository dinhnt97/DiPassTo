// import Clipboard from '@react-native-clipboard/clipboard';
import React, {FC, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  Clipboard,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {createNewWeb3Account} from '../../components/walletCore';
import {AppContext} from '../../context';

const SEED_PHARE_WIDTH = (Dimensions.get('screen').width - 32 - 48) / 3;
const CreateWallet: FC = () => {
  const [createWalletState, setCreateWalletState] = useState<
    'NON_CREATE' | 'CREATING' | 'CREATED'
  >('NON_CREATE');
  const {setCurrentAccount, currentAccount} = useContext(AppContext);

  const createEvmWallet = () => {
    if (createWalletState === 'CREATED') {
      setCurrentAccount?.({
        ...currentAccount,
        isSaved: true,
      });
      return;
    }
    setCreateWalletState('CREATING');
  };
  useEffect(() => {
    if (currentAccount.nmenomic) {
      setCreateWalletState('CREATED');
    }
  }, [currentAccount]);
  useEffect(() => {
    if (createWalletState === 'CREATING') {
      const newWallet = createNewWeb3Account();
      setCurrentAccount?.({
        isSaved: false,
        name: 'Account',
        address: newWallet.address,
        privateKey: newWallet.privateKey,
        nmenomic: newWallet.mnemonic.phrase,
      });
      setCreateWalletState('CREATED');
    }
  }, [createWalletState, setCurrentAccount]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Wallet</Text>
      <Text style={styles.description}>
        Create a new wallet to start using the app. This wallet will be used to
        interact with the blockchain.
      </Text>
      {!!currentAccount.nmenomic && (
        <View style={styles.seedPhareContainer}>
          {currentAccount.nmenomic.split(' ').map((word, index) => (
            <View key={index} style={styles.seedPhareItem}>
              <Text>{word}</Text>
            </View>
          ))}
        </View>
      )}
      <Text
        style={styles.textCopy}
        onPress={() => {
          Clipboard.setString(currentAccount.nmenomic);
        }}>
        <Feather name={'copy'} size={18} /> Copy seed phrase
      </Text>

      <Pressable
        onPress={createEvmWallet}
        disabled={createWalletState === 'CREATING'}
        style={[
          styles.actionBtn,
          createWalletState === 'CREATING' && {backgroundColor: '#6E6E6E'},
        ]}>
        {createWalletState === 'CREATING' ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.textBtn}>
            {createWalletState === 'NON_CREATE' ? 'Create Wallet' : 'Start Now'}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  actionBtn: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#6631FF',
    borderRadius: 8,
    minWidth: 150,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  textBtn: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#B3B3B3',
    textAlign: 'center',
  },
  seedPhareContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    marginTop: 12,
  },
  seedPhareItem: {
    paddingVertical: 8,
    width: SEED_PHARE_WIDTH,
    backgroundColor: '#DCDCDC',
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  textCopy: {color: '#6631FF', fontSize: 16, lineHeight: 20, marginTop: 12},
});

export default CreateWallet;
