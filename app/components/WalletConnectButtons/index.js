import React from 'react';
import styled from 'styled-components';
import connectors from 'utils/connectors';
import WalletConnectButton from 'components/WalletConnectButton';

const WalletButtonsWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0px 12px;
  justify-content: space-evenly;
`;

export default function WalletConnectButtons({ onHide }) {
  const renderButton = (connector, name) => (
    <WalletConnectButton
      onHide={onHide}
      key={name}
      connector={connector}
      name={name}
    />
  );

  const buttons = _.map(connectors, renderButton);

  return <WalletButtonsWrap>{buttons}</WalletButtonsWrap>;
}
