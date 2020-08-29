import produce from 'immer';
import tokens from 'tokens';
import * as c from './constants';

// The initial state of the App
export const initialState = {
  vaults: [],
  tokens,
  walletBalance: '0.00',
  vaultBalance: '0.00',
  connected: false,
  ready: false,
  loading: {
    tokens: true,
  },
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    // Utility functions
    const updateTokens = (tokensToUpdate, tokenKeys) => {
      const oldTokens = state.tokens || [];
      const updateToken = newToken => {
        const oldToken = _.find(oldTokens, { address: newToken.address }) || {};
        const updatedToken = _.clone(oldToken);
        _.each(tokenKeys, key => {
          updatedToken[key] = newToken[key];
        });
        return updatedToken;
      };
      const updatedTokens = _.map(tokensToUpdate, updateToken);
      const merged = _.merge(
        _.keyBy(oldTokens, 'address'),
        _.keyBy(updatedTokens, 'address'),
      );
      const abc = _.values(merged);

      draft.tokens = abc;
    };
    const setReadyState = () => {
      const { loading } = draft;
      const ready = !loading.vaults;
      draft.ready = ready;
    };

    // Reducer
    switch (action.type) {
      case c.CONNECTION_CONNECTED:
        draft.account = action.account;
        draft.connector = action.connector;
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = true;
        draft.ready = false;
        break;
      case c.CONNECTION_UPDATED:
        draft.library = action.library;
        draft.chainId = action.chainId;
        draft.connected = action.active;
        break;
      case c.WEB3_WAITING: {
        const { waiting } = action;
        draft.web3Waiting = waiting;
        if (waiting) {
          draft.showConfirmationModal = true;
        } else {
          draft.showConfirmationModal = false;
        }
        break;
      }
      case c.SHOW_CONNECTOR_MODAL:
        draft.showConnectorModal = action.showModal;
        break;
      case c.SHOW_CONFIRMATION_MODAL:
        draft.showConfirmationModal = action.showModal;
        break;
      case c.UPDATE_APPROVED_TOKENS:
        draft.confirmationModalTokens = _.clone(action.tokens);
        break;
      case c.UPDATE_MODAL_STATE:
        draft.modalState = action.newState;
        draft.modalMetadata = action.metadata;
        break;
      case c.WALLET_LOADED: {
        const walletTokens = action.payload;
        const getBalance = (acc, token) => {
          const { balance, decimals, vault } = token;
          const balanceFloat = balance / 10 ** decimals;
          if (vault) {
            acc.vaultBalance += balanceFloat;
          } else {
            acc.walletBalance += balanceFloat;
          }
          return acc;
        };
        const { vaultBalance, walletBalance } = _.reduce(
          walletTokens,
          getBalance,
          { vaultBalance: 0, walletBalance: 0 },
        );
        _.reduce();
        draft.tokens = walletTokens;
        draft.walletBalance = walletBalance;
        draft.vaultBalance = vaultBalance;
        draft.loading.wallet = false;
        break;
      }
      case c.TOKENS_LOADED: {
        updateTokens(action.tokens, ['image']);
        draft.loading.tokens = false;
        break;
      }
      case c.START_LOADING_WALLET:
        draft.loading.wallet = true;
        break;
    }

    // Set ready state
    setReadyState();
  });

export default appReducer;
