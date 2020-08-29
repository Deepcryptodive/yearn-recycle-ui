import React from 'react';
import Modal from 'react-bootstrap/Modal';
import WalletConnectButtons from 'components/WalletConnectButtons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import * as a from 'containers/App/actions';
import * as s from 'containers/App/selectors';

const Button = styled.button`
  width: 250px;
  height: 55px;
  background-color: #fff;
  display: flex;
  justify-content: center;
  color: rgb(220, 107, 229);
  font-weight: bold;
  align-items: center;
  padding: 12px;
  margin: 12px auto;
  border-radius: 1rem;
  flex-wrap: wrap;
  border: 1px solid rgb(225, 225, 225);
  &:focus {
    border: 1px solid #666;
    border-radius: 1rem;
    outline: none;
  }
`;

export default function ConnectModal(props) {
  const web3Context = useWeb3React();
  const dispatch = useDispatch();
  const { deactivate } = web3Context;
  const disconnect = evt => {
    evt.preventDefault();
    localStorage.clear();
    deactivate();
    dispatch(a.showConnectorModal(false));
  };

  const { show, onHide } = props;
  const connected = useSelector(s.selectConnected());
  let disconnectButton;
  if (connected) {
    disconnectButton = <Button onClick={disconnect}>Deactivate</Button>;
  }

  return (
    <Modal
      dialogClassName="connectModal"
      show={show}
      onHide={onHide}
      centered
      animation={false}
    >
      <Modal.Body>
        <WalletConnectButtons onHide={onHide} />
        {disconnectButton}
      </Modal.Body>
    </Modal>
  );
}
