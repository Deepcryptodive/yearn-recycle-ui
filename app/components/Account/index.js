import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import Blockies from 'react-blockies';
import { useSelector, useDispatch } from 'react-redux';
import * as a from 'containers/App/actions';
import * as s from 'containers/App/selectors';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-self: end;
  cursor: pointer;
  padding: 15px;
`;

const Address = styled.div`
  display: block;
  overflow: hidden;
  margin-left: 10px;
  margin-right: 10px;
  font-weight: bold;
  text-overflow: ellipsis;
  justify-self: flex-end;
`;

const transformAddress = address => {
  if (!address) {
    return '';
  }
  const beginning = address.substr(0, 6);
  const end = address.substr(address.length - 4, address.length);
  return `${beginning}...${end}`;
};

export default function Account() {
  const web3Context = useWeb3React();
  const connected = useSelector(s.selectConnected());
  const { account } = web3Context;
  const dispatch = useDispatch();
  const showConnectorModal = () => dispatch(a.showConnectorModal(true));

  let content;
  if (connected && account) {
    content = (
      <React.Fragment>
        <Blockies
          seed={account}
          size={10}
          scale={3}
          color="#07fdd7"
          bgColor="#b54cc4"
          spotColor="#a3a8e3"
          className="identicon"
        />
        <Address>{transformAddress(account)}</Address>
        <svg
          stroke="currentColor"
          fill="currentColor"
          viewBox="0 0 512 512"
          height="1.1em"
          width="1.1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M128 192l128 128 128-128z" />
        </svg>
      </React.Fragment>
    );
  }

  return <Wrapper onClick={showConnectorModal}>{content}</Wrapper>;
}
