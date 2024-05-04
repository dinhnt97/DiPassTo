import {BigNumber, ContractInterface, Wallet} from 'ethers';
import {ethers} from 'ethers';
import {RPC_PROVIDER} from '../constants';
import erc20 from '../abis/erc20';

export const convertBigNumberToNormal = (bigNumber: BigNumber): string => {
  return ethers.utils.formatEther(bigNumber);
};

export const web3Provider = new ethers.providers.JsonRpcProvider(RPC_PROVIDER);

export const getSigner = async (privateKey: string) => {
  const signer = new ethers.Wallet(privateKey, web3Provider);
  return signer;
};

export const getWalletFromPrivateKey = (privateKey: string) => {
  const wallet = new ethers.Wallet(privateKey, web3Provider);
  console.log(wallet.mnemonic);
  return wallet;
};

export const getNativeTokenBalance = async (address: string) => {
  if (address) {
    try {
      const bigNumberBalance = await web3Provider.getBalance(address);
      return convertBigNumberToNormal(bigNumberBalance);
    } catch (error: any) {
      throw new Error(error.message);
    }
  } else {
    throw new Error('Address is required');
  }
};

export const getContract = (
  contractAddress: string,
  contractAbi: ContractInterface,
) => {
  const contract = new ethers.Contract(
    contractAddress,
    contractAbi,
    web3Provider,
  );
  const readMethods = (methodName: string, args: any[]) => {
    return contract[methodName](...args);
  };
  const writeMethods = async (
    privateKey: string,
    methodName: string,
    args: any[],
  ) => {
    const estimatedGas = await contract.estimateGas[methodName](...args);
    const gasPrice = await web3Provider.getGasPrice();
    return contract
      .connect(new ethers.Wallet(privateKey, web3Provider))
      [methodName](...args, {value: 0, gasPrice, gasLimit: estimatedGas});
  };
  return {readMethods, writeMethods};
};

export const createNewWeb3Account = (): Wallet => {
  return ethers.Wallet.createRandom().connect(web3Provider);
};

export const transferErc20Token = async (
  amount: number,
  tokenAddress: string,
  receiverAddress: string,
  privateKey: string,
) => {
  const {writeMethods} = getContract(tokenAddress, erc20);
  return writeMethods(privateKey, 'transfer', [receiverAddress, amount]);
};

export const getErc20TokenBalance = async (
  tokenAddress: string,
  owner: string,
) => {
  const {readMethods} = getContract(tokenAddress, erc20);
  const bigNumberUSDCBalance = await readMethods('balanceOf', [owner]);
  return convertBigNumberToNormal(bigNumberUSDCBalance);
};

export const transferNativeToken = async (
  to: string,
  amount: string,
  privateKey: string,
) => {
  try {
    const gasPrice = await web3Provider.getGasPrice();
    const signer = await getSigner(privateKey);
    const tx = await signer.sendTransaction({
      to,
      value: ethers.utils.parseUnits(amount.toString(), 18),
      gasPrice,
    });
    return tx;
  } catch (error) {
    throw error;
  }
};

export const getTransactionState = async (
  txHash: string,
): Promise<'PROCESSING' | 'FAILED' | 'SUCCESS'> => {
  const tx = await web3Provider.getTransactionReceipt(txHash);
  if (!tx) {
    return 'PROCESSING';
  }
  return tx.status === 1 ? 'SUCCESS' : 'FAILED';
};
