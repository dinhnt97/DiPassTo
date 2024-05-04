import {createContext} from 'react';

export const initialAccount: Web3Account = {
  isSaved: false,
  name: '',
  address: '',
  privateKey: '',
  nmenomic: '',
};
type Web3Account = {
  isSaved: boolean;
  name: string;
  address: string;
  privateKey: string;
  nmenomic: string;
};

export type AppContextType = {
  currentAccount: Web3Account;
  setCurrentAccount?: React.Dispatch<React.SetStateAction<Web3Account>>;
};
export const AppContext = createContext<AppContextType>({
  currentAccount: initialAccount,
  setCurrentAccount: undefined,
});
