const { ethers } = require("hardhat")
const Web3 = require("web3");
const Bridge = require("../build/contracts/Bridge.json");
const BRIDGE_ETH_ADDRESS = process.env.BRIDGE_ETH_ADDRESS;
const BRIDGE_BSC_ADDRESS = process.env.BRIDGE_BSC_ADDRESS;
const BRIDGE_MATIC_ADDRESS = process.env.BRIDGE_MATIC_ADDRESS;

const web3EthWebSocket = new Web3(
    `wss://sepolia.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);
const web3MumWebSocket = new Web3(
    `wss://polygon-mumbai.infura.io/ws/v3/${process.env.INFURA_API_KEY}`
);
const web3BscWebSocket = new Web3("wss://bsc-testnet-rpc.publicnode.com");
const bridgeEthListener = new web3EthWebSocket.eth.Contract(
    Bridge.abi,
    BRIDGE_ETH_ADDRESS
);
const bridgeMumListener = new web3MumWebSocket.eth.Contract(
    Bridge.abi,
    BRIDGE_MATIC_ADDRESS
);
const bridgeBscListener = new web3BscWebSocket.eth.Contract(
    Bridge.abi,
    BRIDGE_BSC_ADDRESS
);

const web3Eth = new Web3(
    `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const web3Mum = new Web3(
    `https://polygon-mumbai.infura.io/v3/${process.env.INFURA_API_KEY}`
);
const web3Bsc = new Web3("https://bsc-testnet-rpc.publicnode.com");

const adminPrivKey = process.env.PRIVATE_KEY;
const { address: adminEth } = web3Eth.eth.accounts.wallet.add(adminPrivKey);
const { address: adminMum } = web3Mum.eth.accounts.wallet.add(adminPrivKey);
const { address: adminBsc } = web3Bsc.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(Bridge.abi, BRIDGE_ETH_ADDRESS);
const bridgeMum = new web3Mum.eth.Contract(Bridge.abi, BRIDGE_MATIC_ADDRESS);
const bridgeBsc = new web3Bsc.eth.Contract(Bridge.abi, BRIDGE_BSC_ADDRESS);

const TestChainID_ETH = 11155111;
const TestChainID_BSC = 97;
const TestChainID_MATIC = 80001;
async function signMessage(
    from,
    to,
    value,
    nonce,
    chainId,
    symbol,
    validator,
) {
    const messageHash = ethers.utils.solidityKeccak256(
        ["address", "address", "uint256", "uint256", "uint256", "string"],
        [from, to, value, nonce, chainId, symbol]
    );
    const messageArray = ethers.utils.arrayify(messageHash);
    const rawSignature = await validator.signMessage(messageArray);
    return rawSignature;
}

console.log("Listening for SwapInitialized events...");
// interface Props {
//   redeemData: {
//     from: string;
//     to: string;
//     amount: string;
//     nonce: string;
//     chainId: string;
//     symbol: string;
//     messageHash: string;
//   };
//   bridge: any;
//   web3Instance: any;
//   admin: string;
// }
const redeemFunction = async ({
    redeemData,
    bridge,
    web3Instance,
    admin,
}) => {
    const { from, to, amount, nonce, chainId, symbol, messageHash } = redeemData;
    const tx = await bridge.methods.redeem(
        from,
        to,
        amount,
        nonce,
        chainId,
        symbol,
        messageHash
    );
    const [gasPrice, gasCost] = await Promise.all([
        web3Instance.eth.getGasPrice(),
        tx.estimateGas({ from: admin }),
    ]);
    const data = tx.encodeABI();
    const txData = {
        from: admin,
        to: bridge.options.address,
        data,
        gasLimit: 3000000,
        gas: gasCost,
        gasPrice,
    };
    const receipt = await web3Instance.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash} in ${chainId}`);
    console.log(`
        Processed transfer:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - nonce ${nonce}
        - chainId ${chainId}
        - symbol ${symbol}
        `);
};
bridgeEthListener.events.SwapInitialized().on("data", async (event) => {
    const [acc0] = await ethers.getSigners();
    const { from, to, amount, nonce, chainId, symbol } = event.returnValues;
    const messageHash = await signMessage(
        acc0.address,
        to,
        amount,
        nonce,
        chainId,
        symbol,
        acc0
    );
    console.log(`
        SwapInitialized event:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - nonce ${nonce}
        - chainId ${chainId}
        - symbol ${symbol}
        `);
    try {
        if (Number(chainId) === TestChainID_MATIC) {
            await redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeMum,
                web3Instance: web3Mum,
                admin: adminMum,
            });
        } else if (Number(chainId) === TestChainID_BSC) {
            console.log("redeem in BSC");
            await redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeBsc,
                web3Instance: web3Bsc,
                admin: adminBsc,
            });
        }
    } catch (error) {
        console.error("Error processing SwapInitialized event:", error);
    }
});
bridgeMumListener.events.SwapInitialized().on("data", async (event) => {
    const [acc0] = await ethers.getSigners();
    const { from, to, amount, nonce, chainId, symbol } = event.returnValues;
    const messageHash = await signMessage(
        acc0.address,
        to,
        amount,
        nonce,
        chainId,
        symbol,
        acc0
    );
    console.log(`
        SwapInitialized event:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - nonce ${nonce}
        - chainId ${chainId}
        - symbol ${symbol}
        `);
    try {
        if (Number(chainId) === TestChainID_ETH) {
            redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeEth,
                web3Instance: web3Eth,
                admin: adminEth,
            });
        } else if (Number(chainId) === TestChainID_BSC) {
            redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeBsc,
                web3Instance: web3Bsc,
                admin: adminBsc,
            });
        }
    } catch (error) {
        console.error("Error processing SwapInitialized event:", error);
    }
});
bridgeBscListener.events.SwapInitialized().on("data", async (event) => {
    const [acc0] = await ethers.getSigners();
    const { from, to, amount, nonce, chainId, symbol } = event.returnValues;
    const messageHash = await signMessage(
        acc0.address,
        to,
        amount,
        nonce,
        chainId,
        symbol,
        acc0
    );
    console.log(`
        SwapInitialized event:
        - from ${from}
        - to ${to}
        - amount ${amount} tokens
        - nonce ${nonce}
        - chainId ${chainId}
        - symbol ${symbol}
        `);

    try {
        if (Number(chainId) === TestChainID_ETH) {
            redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeEth,
                web3Instance: web3Eth,
                admin: adminEth,
            });
        } else if (Number(chainId) === TestChainID_MATIC) {
            redeemFunction({
                redeemData: {
                    from,
                    to,
                    amount,
                    nonce,
                    chainId,
                    symbol,
                    messageHash,
                },
                bridge: bridgeMum,
                web3Instance: web3Mum,
                admin: adminMum,
            });
        }
    } catch (error) {
        console.error("Error processing SwapInitialized event:", error);
    }
});
