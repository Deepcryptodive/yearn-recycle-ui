import { chainNameFromHexId } from 'utils/string';
import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectRouter = state => state.router;
const selectApp = state => state.app || initialState;

export const selectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const selectTokens = () =>
  createSelector(
    selectApp,
    substate => substate.tokens,
  );

export const selectTransactions = () =>
  createSelector(
    selectApp,
    substate => substate.transactions,
  );

export const selectAccount = () =>
  createSelector(
    selectApp,
    substate => substate.account,
  );

export const selectLibrary = () =>
  createSelector(
    selectApp,
    substate => substate.library,
  );

export const selectConnector = () =>
  createSelector(
    selectApp,
    substate => substate.connector,
  );

export const selectAddress = () =>
  createSelector(
    selectApp,
    substate => substate.address,
  );

export const selectChainId = () =>
  createSelector(
    selectApp,
    substate => substate.chainId,
  );

export const selectLoading = () =>
  createSelector(
    selectApp,
    substate => substate.loading,
  );

export const selectReady = () =>
  createSelector(
    selectApp,
    substate => substate.ready,
  );

export const selectNetwork = () =>
  createSelector(
    selectApp,
    ({ chainId }) => {
      const chainName = chainNameFromHexId(chainId);
      return chainName;
    },
  );

export const selectVaults = () =>
  createSelector(
    selectApp,
    substate => substate.vaults,
  );

export const selectContract = () =>
  createSelector(
    selectApp,
    substate => substate.contract,
  );

export const selectWalletBalance = () =>
  createSelector(
    selectApp,
    substate => substate.walletBalance,
  );

export const selectVaultBalance = () =>
  createSelector(
    selectApp,
    substate => substate.vaultBalance,
  );

export const selectContractAbi = () =>
  createSelector(
    selectApp,
    substate => substate.contractAbi,
  );

export const selectContractSourceCode = () =>
  createSelector(
    selectApp,
    substate => substate.contractSourceCode,
  );

export const selectWeb3Waiting = () =>
  createSelector(
    selectApp,
    substate => substate.web3Waiting,
  );

export const selectConnected = () =>
  createSelector(
    selectApp,
    substate => substate.connected,
  );

export const selectShowConnectorModal = () =>
  createSelector(
    selectApp,
    substate => substate.showConnectorModal,
  );

export const selectShowConfirmationModal = () =>
  createSelector(
    selectApp,
    substate => substate.showConfirmationModal,
  );

export const selectConfirmationModalTokens = () =>
  createSelector(
    selectApp,
    substate => substate.confirmationModalTokens,
  );

export const selectModalState = () =>
  createSelector(
    selectApp,
    substate => substate.modalState,
  );

export const selectModalMetadata = () =>
  createSelector(
    selectApp,
    substate => substate.modalMetadata,
  );
