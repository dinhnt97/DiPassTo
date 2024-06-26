import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";
import "hardhat-dependency-compiler";
import "hardhat-deploy";
import "hardhat-gas-reporter";
import { HardhatUserConfig } from "hardhat/config";

dotenv.config();

const privateKey =
  process.env.PRIVATE_KEY ||
  "0x0000000000000000000000000000000000000000000000000000000000000000";
const infuraKey = process.env.INFURA_API_KEY || "";
const etherscanApi = process.env.ETHERSCAN_API_KEY || "";

const metadataConfig = {
  bytecodeHash: "none",
  useLiteralContent: false,
};
const outputSelectionConfig = {
  "*": {
    "": ["ast"],
    "*": [
      "abi",
      "metadata",
      "devdoc",
      "userdoc",
      "storageLayout",
      "evm.legacyAssembly",
      "evm.bytecode",
      "evm.deployedBytecode",
      "evm.methodIdentifiers",
      "evm.gasEstimates",
      "evm.assembly",
    ],
  },
};

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        version: "0.8.20",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
          metadata: metadataConfig,
          outputSelection: outputSelectionConfig,
        },
      },
    ],
  },

  networks: {
    hardhat: {
      allowUnlimitedContractSize: true,
      allowBlocksWithSameTimestamp: true,
    },
    mainnet: {
      url: `https://mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    sepolia: {
      url: `https://sepolia.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    arbitrumRinkeby: {
      url: `https://arbitrum-rinkeby.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    arbitrum: {
      url: `https://arbitrum-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    bnb: {
      url: `https://bsc-dataseed.binance.org/`,
      accounts: [privateKey],
    },
    mumbai: {
      url: `https://polygon-mumbai.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    optimism: {
      url: `https://optimism-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    optimismKovan: {
      url: `https://optimism-kovan.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    polygon: {
      url: `https://polygon-mainnet.infura.io/v3/${infuraKey}`,
      accounts: [privateKey],
    },
    devnet: {
      url: "https://rpc.vnet.tenderly.co/devnet/newchain/1ab8d43a-debb-4294-bdcf-fcf9546cd10c",
      accounts: [privateKey],
    },
  },
  etherscan: {
    apiKey: etherscanApi,
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    deploy: "./deploy",
    sources: "./contracts",
    tests: "./tests",
  },
  dependencyCompiler: {
    paths: [],
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    gasPrice: 10,
    token: "ETH",
  },
  mocha: {
    timeout: 60000,
  },
};

export default config;
