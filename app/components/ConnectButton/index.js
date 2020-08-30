import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import * as a from 'containers/App/actions';

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Button = styled.button`
  width: 180px;
  margin: 10px;
  padding: 5px;
  &:focus {
    outline: 0;
  }
  background-color: transparent;
  border-radius: 50px;
  padding: 10px 24px;
  border: 2px solid rgba(47, 128, 237, 0.7);
  color: rgba(47, 128, 237, 0.7);
`;

export default function ConnectButton() {
  const dispatch = useDispatch();

  const connect = () => {
    dispatch(a.showConnectorModal(true));
  };

  return (
    <ButtonWrap>
      <Button type="button" onClick={connect}>
        Connect
      </Button>
    </ButtonWrap>
  );
}
