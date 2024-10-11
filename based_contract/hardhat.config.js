require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */

module.exports = {  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 1000,
      },
    },
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

