//@ts-nocheck
import {ethers} from 'ethers';
import {
  getContract,
  transferErc20Token,
} from '../../components/walletCore/ethers';
import numeral from 'numbro';
import ABIToken from './ABI/ABIToken';
import ABIWheel from './ABI/ABIWheel';
import ABIPool from './ABI/ABIPool';
import {get} from 'lodash';

const formatNumberBro = (number, mantissa = 4, options: any) => {
  const trimMantissa = get(options, 'trimMantissa', true);
  const isReturnNaN = get(options, 'isReturnNaN');
  const textNa = get(options, 'textNa');

  if (
    number !== true &&
    number !== false &&
    number !== 'null' &&
    number !== null &&
    !isNaN(number) &&
    number !== undefined &&
    number !== 'NaN' &&
    number !== Infinity
  ) {
    const realNumber = number.numerator ? number.toSignificant(6) : number;
    if (typeof realNumber === 'string' || typeof realNumber === 'number') {
      if (realNumber.toString().length > 0) {
        return numeral(realNumber.toString().replace(/\,/g, '')).format({
          trimMantissa,
          thousandSeparated: true,
          mantissa: parseInt(mantissa),
        });
      }
    }
  }
  return isReturnNaN ? textNa || 'N/A' : trimMantissa ? 0 : '0.00';
};

// address: '0xB39DD05EBB39a78Cf834917Ed3D2D5619B830328',
// isSaved: false,
// name: 'Account',
// nmenomic:
//   'inherit quantum sorry company pioneer must puppy cloud fuel truth border hip',
// privateKey:
//   '0x78be31e0e7707c347ace5e538cf0b7656845b7bf3db8ae9992b3676c649b8949',

export default class GachaServices {
  provider: any;
  addressToken = '0xafdbaE21A4a28061A1AB2Ce7f961df38434C291e';
  addressPool = '0xBdEaF433764Ce47a73F6f5584DF631D96E59Db76';
  addressWheel = '0x2DE95d2E6C20f1e6aa2Eb978F67cC34D7629D2Cd';
  contractToken: any;
  addressWallet: string;
  signer: ethers.Wallet;
  constructor() {
    this.provider = new ethers.providers.JsonRpcProvider(
      'https://ethereum-sepolia-rpc.publicnode.com',
    );

    this.addressWallet = '0xB39DD05EBB39a78Cf834917Ed3D2D5619B830328';
    this.signer = new ethers.Wallet(
      '0x78be31e0e7707c347ace5e538cf0b7656845b7bf3db8ae9992b3676c649b8949',
      this.provider,
    );
    this.contractToken = getContract(this.addressToken, ABIToken);
    this.contractWheel = getContract(this.addressWheel, ABIWheel);
    this.contractPool = getContract(this.addressPool, ABIPool);
  }

  async getBalance() {
    const address = await this.signer.getAddress();
    console.log(this.contractToken, 'this.contractToken');
    const balance = await this.contractToken.readMethods('balanceOf', [
      address,
    ]);

    console.log(balance, '_balancebalance');
    const balanceFormatted = ethers.utils.formatUnits(balance, 18);

    return formatNumberBro(balanceFormatted);
  }

  // async getTicket(){
  //   const balanceTicket = await this.contractPool.userTickets(address)
  // }

  async buyTicket() {
    // const signer = await this.signer;
    try {
      // const balanceTicket = await transferErc20Token(
      //   2000000,
      //   '0xafdbaE21A4a28061A1AB2Ce7f961df38434C291e',
      //   '0xB39DD05EBB39a78Cf834917Ed3D2D5619B830328',
      //   signer.privateKey,
      // );
      const balanceTicket = await this.contractPool.contract;
      const connect = balanceTicket.connect(this.signer);
      const hash = await connect.register();
      console.log(hash, 'hashhashhashhashhash');

      return hash;
      // const createpool = await this.contractWheel.writeMethods(
      //   signer.privateKey,
      //   'createPool',
      //   [
      //     '2000000000000000000000',
      //     5,
      //     1714830032,
      //     1728047150,
      //     [5, 10, 30, 55],
      //     [50, 30, 15, 5],
      //   ],
      // );
      // console.log(createpool, '___balanceTicketbalanceTicket');
      // return balanceTicket;
    } catch (err) {
      console.log(err, '__e rrorr');
    }
  }

  async getPriceTicket() {
    const contract = this.contractPool.contract;
    const connect = contract.connect(this.signer);

    const address = await this.signer.getAddress();

    const balance = await connect.getUserTickets(address);

    return balance;
  }

  async rollWheel() {
    const tickets = await this.getPriceTicket();
    console.log(tickets);
    return;
    const contract = this.contractPool.contract;
    const connect = contract.connect(this.signer);
    const hash = await connect.roll(0);
    return hash;
  }
}
