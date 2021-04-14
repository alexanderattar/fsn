import { config as dotEnvConfig } from 'dotenv';
dotEnvConfig();

import { HardhatUserConfig } from 'hardhat/types';

import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import '@nomiclabs/hardhat-etherscan';
// TODO: reenable solidity-coverage when it works
// import "solidity-coverage";

const INFURA_API_KEY = process.env.INFURA_API_KEY || '';
const RINKEBY_PRIVATE_KEY =
  process.env.RINKEBY_PRIVATE_KEY! ||
  '0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3'; // well known private key
const GOERLI_PRIVATE_KEY =
  '0x8f4166fe4b2ab91d987e4655a68e75588e8fb4332c008a3e0ec1755b1b87e442';
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

const config: HardhatUserConfig = {
  defaultNetwork: 'hardhat',
  solidity: {
    compilers: [{ version: '0.7.6', settings: {} }],
  },
  networks: {
    hardhat: {},
    localhost: {},
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_API_KEY}`,
      accounts: [RINKEBY_PRIVATE_KEY],
    },
    goerli: {
      url: `https://goerli.infura.io/v3/d63c90a39ffe4d79a458710d9be86218`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
    coverage: {
      url: 'http://127.0.0.1:8555', // Coverage launches its own ganache-cli client
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: ETHERSCAN_API_KEY,
  },
};

export default config;
