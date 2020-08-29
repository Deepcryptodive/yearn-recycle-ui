import React, { useEffect } from 'react';
import connectors from 'utils/connectors';
import { useWeb3React } from '@web3-react/core';
import { useDispatch } from 'react-redux';
import { decimalToHex, chainNameFromHexId } from 'utils/string';
import * as a from 'containers/App/actions';

export default function ConnectionManager({ children }) {
  const connectorName = localStorage.getItem('connectorName');
  const web3Context = useWeb3React();
  const dispatch = useDispatch();
  const {
    active,
    activate,
    account,
    connector,
    library,
    chainId,
  } = web3Context;

  useEffect(() => {
    if (connectorName && !active) {
      const previousConnector = connectors[connectorName];
      if (previousConnector) {
        console.log(`Trying to reconnect to ${connectorName}`);
        activate(previousConnector);
      }
    }
  }, []);

  const connected = () => {
    if (account && active && library) {
      console.log(`Connected to: ${account}`);
      const newChainId = decimalToHex(chainId);
      dispatch(a.connectionConnected(account, connector, library, newChainId));
      localStorage.setItem('account', account);
    }
  };

  const connectionUpdated = () => {
    let newChainId;
    let chainName;
    if (chainId) {
      newChainId = decimalToHex(chainId);
      chainName = chainNameFromHexId(newChainId);
    }

    console.log(`NETWORK SWITCHED: ${chainName}`);
    dispatch(a.connectionUpdated(library, newChainId, active));
  };
  useEffect(connected, [web3Context]);
  useEffect(connectionUpdated, [account, chainId, active]);
  return <React.Fragment>{children}</React.Fragment>;
}
