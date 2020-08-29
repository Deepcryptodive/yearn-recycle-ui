import React from 'react';
import connectors from 'utils/connectors';
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ConnectionManager from 'containers/ConnectionManager';

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 8000;
  return library;
}

export default function ConnectionProvider({ children }) {
  return (
    <Web3ReactProvider connectors={connectors} getLibrary={getLibrary}>
      <ConnectionManager>{children}</ConnectionManager>
    </Web3ReactProvider>
  );
}
