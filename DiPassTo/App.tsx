/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import MainNavigator from './app/MainNavigation';
import {AppContext, initialAccount} from './app/context';

function App(): JSX.Element {
  const [account, setAccount] = useState(initialAccount);
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
