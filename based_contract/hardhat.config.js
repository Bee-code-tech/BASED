require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
require("hardhat-contract-sizer");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
  },
  contractSizer: {
    //npx hardhat size-contracts
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true,
  },

  networks: {
    base: {
      url: vars.get("BASE_URL"),
      accounts: [`0x${vars.get("PRIVATE_KEY")}`],
    },
  },
  etherscan: {
    apiKey: vars.get("BASE_SCAN_API"),
  },
};

// payment: 0x527caBd4bb83F94f1Fc1888D0691EF95e86795A1
// https://sepolia.basescan.org/address/0x527caBd4bb83F94f1Fc1888D0691EF95e86795A1#code

// based: 0xf36f55D6Df2f9d5C7829ed5751d7E88FD3E82c2E
// https://sepolia.basescan.org/address/0xf36f55D6Df2f9d5C7829ed5751d7E88FD3E82c2E#code
