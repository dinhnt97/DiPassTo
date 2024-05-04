import React, {FC, useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {createNewWeb3Account} from '../../components/walletCore';
import {Text} from 'react-native';
import {AppContext} from '../../context';

const CreateWallet: FC = () => {
  const [createWalletState, setCreateWalletState] = useState<
    'NON_CREATE' | 'CREATING' | 'CREATED'
  >('NON_CREATE');
  const {setCurrentAccount, currentAccount} = useContext(AppContext);

  const createEvmWallet = () => {
    if (createWalletState === 'CREATED') {
      return;
    }
    setCreateWalletState('CREATING');
  };
  useEffect(() => {
    if (createWalletState === 'CREATING') {
      const newWallet = createNewWeb3Account();
      console.log(newWallet);
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

  console.log(currentAccount.nmenomic);

  const WIDTH_SCREEN = Dimensions.get('screen').width - 60;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Wallet</Text>
      <Text style={styles.description}>
        Create a new wallet to start using the app. This wallet will be used to
        interact with the blockchain.
      </Text>
      <View style={{width: '100%', flexWrap: 'wrap', flexDirection: 'row'}}>
        {currentAccount.nmenomic.split(' ').map((word, index) => (
          <View
            key={index}
            style={{
              paddingVertical: 8,
              width: WIDTH_SCREEN / 3,
              backgroundColor: '#B3B3B3',
            }}>
            <Text>{word}</Text>
          </View>
        ))}
      </View>
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
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#121212',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#B3B3B3',
    textAlign: 'center',
  },
});

export default CreateWallet;
