/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import MainNavigator from './app/MainNavigation';
import {AppContext, initialAccount} from './app/context';
import {LogBox} from 'react-native';
LogBox.ignoreAllLogs();
function App(): JSX.Element {
  const [account, setAccount] = useState(initialAccount);
  // useEffect(() => {
  //   setAccount({
  //     address: '0xB39DD05EBB39a78Cf834917Ed3D2D5619B830328',
  //     isSaved: false,
  //     name: 'Account',
  //     nmenomic:
  //       'inherit quantum sorry company pioneer must puppy cloud fuel truth border hip',
  //     privateKey:
  //       '0x78be31e0e7707c347ace5e538cf0b7656845b7bf3db8ae9992b3676c649b8949',
  //   });
  // }, []);
  return (
    <AppContext.Provider
      value={{
        currentAccount: account,
        setCurrentAccount: setAccount,
      }}>
      <MainNavigator />
    </AppContext.Provider>
  );
}
export default App;
