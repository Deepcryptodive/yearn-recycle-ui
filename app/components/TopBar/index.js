import React from 'react';
import styled from 'styled-components';
import Account from 'components/Account';

const Wrapper = styled.div`
  text-align: center;
  position: relative;
  display: grid;
  width: 100%;
  height: 61px;
  grid-template-columns: 1fr 1fr 1fr;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid transparent;
`;

const Network = styled.div`
  margin-left: 10px;
  text-transform: uppercase;
  justify-self: start;
`;

export default function TopBar(props) {
  return (
    <Wrapper>
      <div />
      <div />
      <Account />
    </Wrapper>
  );
}
