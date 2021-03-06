const HDWalletProvider = require("@truffle/hdwallet-provider")
require("dotenv").config()

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1", // Localhost (default: none)
      port: 9545, // Custom port
      network_id: "*", // Custom network
      gas: 6721975, // Gas sent with each transaction (default: ~6700000)
      // gasPrice: 20000000000,  // 20 gwei (in wei) (default: 100 gwei)
      // from: <address>,        // Account to send txs from (default: accounts[0])
      // websockets: true, // Enable EventEmitter interface for web3 (default: false)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.mnemonic,
          `https://ropsten.infura.io/v3/${process.env.infuraKey}`
        ),
      network_id: 3, // Ropsten's id
    },

    rinkeby: {
      provider: () => {
        return new HDWalletProvider(
          process.env.mnemonic,
          `https://rinkeby.infura.io/v3/${process.env.infuraKey}`
        )
      },
      network_id: 4, // rinkeby's id
      skipDryRun: true,
    },

    matic: {
      provider: () =>
        new HDWalletProvider(
          process.env.mnemonic,
          `https://rpc-mumbai.matic.today`
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    harmony: {
      provider: () => {
        return new HDWalletProvider({
          mnemonic: process.env.mnemonic,
          providerOrUrl: "https://api.s0.b.hmny.io", // https://api.s0.t.hmny.io for mainnet
          derivationPath: `m/44'/1023'/0'/0/`,
        })
      },
      network_id: 1666700000, // 1666600000 for mainnet
    },
    // Useful for private networks
    // private: {
    // provider: () => new HDWalletProvider(mnemonic, `https://network.io`),
    // network_id: 2111,   // This network is yours, in the cloud.
    // production: true    // Treats this network as if it was a public net. (default: false)
    // }
  },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    reporter: "eth-gas-reporter",
    reporterOptions: {
      excludeContracts: ["Migrations"],
    },
  },
  plugins: ["solidity-coverage"],
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.2", // Fetch exact version from solc-bin (default: truffle's version)
      // docker: false, // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {
      //   // See the solidity docs for advice about optimization and evmVersion
      optimizer: {
        enabled: true,
        runs: 200,
      },
      // },
    },
  },
}
