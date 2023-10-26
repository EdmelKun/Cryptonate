/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
module.exports = {
  solidity: {
    version: "0.8.17",
    defaultNetwork: "linea_goerli",
    networks: {
      hardhat: {},
      linea_goerli: {
        url: "https://explorer.goerli.linea.build/api",
        accounts: [`0x${process.env.PRIVATE_KEY}`],
      },
    },
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
