import Web3 from 'web3';
import tokens from 'tokens';
import * as r from 'redux-saga/effects';
import * as s from './selectors';
import * as a from './actions';
import * as c from './constants';

const pollPeriod = 30000;

function readContract(contract, methodName) {
  return contract.methods[methodName]().call();
}

function readBalanceFromContract(contract, account) {
  return contract.methods.balanceOf(account).call();
}

function* fetchAccountBalance(token, web3, account, library) {
  const { address, symbol, abi } = token;
  let balance;
  let name;
  let decimals;
  try {
    const contract = new web3.eth.Contract(abi, address);
    balance = yield readBalanceFromContract(contract, account);
    decimals = yield readContract(contract, 'decimals');
  } catch (err) {
    console.log('Err reading token balance:', token, err);
  }
  return { ...token, balance, name, symbol, decimals, address };
}

export function* fetchAccountBalances() {
  const account = yield r.select(s.selectAccount());
  const library = yield r.select(s.selectLibrary());
  const web3 = new Web3(library.provider);
  const balances = yield r.all(
    tokens.map(token =>
      r.call(fetchAccountBalance, token, web3, account, library),
    ),
  );
  return balances;
}

export function* fetchWallet() {
  const balances = yield fetchAccountBalances();
  yield r.put(a.walletLoaded(balances));
}

export function* poll() {
  const connected = yield r.select(s.selectConnected());
  if (!connected) {
    yield r.put(a.walletLoaded(tokens));
    return false;
  }
  while (true) {
    try {
      yield fetchWallet();
    } catch (err) {
      console.log('Error reading balances', err);
    }
    yield r.delay(pollPeriod);
  }
}

export function* startPolling() {
  yield r.put(a.startLoadingWallet());
}

export default function* initialize() {
  yield r.takeLatest(c.FETCH_WALLET, fetchWallet);
  yield r.takeLatest(c.CONNECTION_UPDATED, startPolling);
  while (true) {
    yield r.take(c.START_LOADING_WALLET);
    yield r.race([r.call(poll), r.take(c.CONNECTION_UPDATED)]);
  }
}
