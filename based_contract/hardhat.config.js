require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  // solidity: "0.8.27",

  solidity: {
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

    // customChains: [
    //   {
    //     network: "scrollSepolia",
    //     chainId: 534351,
    //     urls: {
    //       apiURL: "https://api-sepolia.scrollscan.com/api",
    //       browserURL: "https://sepolia.scrollscan.com/",
    //     },
    //   },
    // ],
  },
};

//0x94b38F87880912aa4F46b4A7631315B933f67A2c
