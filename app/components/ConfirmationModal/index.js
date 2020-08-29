import React from 'react';
import Modal from 'react-bootstrap/Modal';
import WalletConnectButtons from 'components/WalletConnectButtons';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import TokenIcon from 'components/TokenIcon';
import ApprovalIcon from 'components/ApprovalIcon';
import Spinner from 'components/Spinner';
import * as s from 'containers/App/selectors';
import SuccessIcon from './success.png';
import ErrorIcon from './error.png';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  margin-bottom: 70px;
  margin-top: 20px;
`;

const TokenTable = styled.table``;

const Td = styled.td`
  padding: 10px 30px;
  vertical-align: middle;
`;

const Th = styled.th`
  padding: 10px 30px;
`;

const TokenWrap = styled.div`
  display: flex;
  align-items: center;
`;

const Waiting = styled.div`
  text-align: center;
`;

const WaitingText = styled.div`
  font-size: 21px;
  margin-bottom: 60px;
`;

const Symbol = styled.div`
  display: inline;
  padding-left: 10px;
`;

const Img = styled.img`
  width: 60px;
  margin: 0 auto;
  display: block;
`;

const ErrorText = styled.div`
  font-size: 15px;
  margin-bottom: 30px;
`;

export default function ConfirmationModal(props) {
  const { show, onHide } = props;
  const confirmationTokens = _.reverse(
    useSelector(s.selectConfirmationModalTokens()),
  );
  const tokensWithoutUserApproval = _.filter(
    confirmationTokens,
    token => !token.approved,
  );
  const nbrUnapprovedTokens = _.size(tokensWithoutUserApproval);
  let confirmationIcon;

  const web3Waiting = useSelector(s.selectWeb3Waiting());
  const modalState = useSelector(s.selectModalState());
  const modalMetadata = useSelector(s.selectModalMetadata());

  const renderToken = (token, idx) => {
    if (nbrUnapprovedTokens > 0) {
      confirmationIcon = <ApprovalIcon />;
    } else {
      confirmationIcon = <ApprovalIcon approved={token.confirmed} />;
    }
    return (
      <tr key={idx}>
        <Td>
          <TokenWrap>
            <TokenIcon token={token} />
            <Symbol>{token.symbol}</Symbol>
          </TokenWrap>
        </Td>
        <Td>
          <Waiting>
            <ApprovalIcon approved={token.approved} />
          </Waiting>
        </Td>
        <Td>
          <Waiting>{confirmationIcon}</Waiting>
        </Td>
      </tr>
    );
  };
  const tokenEls = _.map(confirmationTokens, renderToken);
  let tokenTable;
  if (modalState === 'tokens') {
    tokenTable = (
      <TokenTable>
        <thead>
          <tr>
            <Th />
            <Th>Approved</Th>
            <Th>Confirmed</Th>
          </tr>
        </thead>
        <tbody>{tokenEls}</tbody>
      </TokenTable>
    );
  } else if (modalState === 'success') {
    tokenTable = (
      <div>
        <Img src={SuccessIcon} />
      </div>
    );
  } else if (modalState === 'error') {
    tokenTable = (
      <div>
        <ErrorText>{modalMetadata}</ErrorText>
        <Img src={ErrorIcon} />
      </div>
    );
  } else if (modalState === 'spinner') {
    tokenTable = (
      <div>
        <Spinner />
      </div>
    );
  }
  return (
    <Modal
      dialogClassName="connectModal"
      show={show}
      onHide={onHide}
      centered
      animation={false}
    >
      <Modal.Header closeButton />
      <Modal.Body>
        <Wrapper>
          <WaitingText>{web3Waiting}</WaitingText>
          {tokenTable}
        </Wrapper>
      </Modal.Body>
    </Modal>
  );
}
