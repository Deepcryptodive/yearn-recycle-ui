import React from 'react';
import Web3 from 'web3';
import styled from 'styled-components';
import { roundFloat } from 'utils/string';
import TokenIcon from 'components/TokenIcon';
import { useWeb3React } from '@web3-react/core';
import recyclerAbi from 'abi/recycler.json';
import BigNumber from 'big-number';
import ConnectButton from 'components/ConnectButton';
import { useDispatch, useSelector } from 'react-redux';
import * as s from 'containers/App/selectors';
import * as a from 'containers/App/actions';

const RecycleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column !important;
`;

const StyledTokenIcon = styled(TokenIcon)`
  max-width: 30px;
  min-width: 30px;
  margin-right: 10px;
`;

const A = styled.a`
  text-decoration: underline;
  color: rgba(43, 57, 84, 0.5);
  &:hover {
    color: rgba(43, 57, 84, 0.5);
  }
`;

const Td = styled.td`
  padding: 10px 0px;
  font-size: 20px;
  &:last-of-type {
    text-align: right;
  }
`;
const Tr = styled.tr`
  &:first-of-type {
    > ${Td} {
      margin-top: 0px;
    }
  }
`;

const Table = styled.table`
  width: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-gap: 80px;
  flex-direction: column;
  grid-template-columns: 1fr 1fr 1fr;
`;

const Icon = styled.img`
  height: 240px;
`;

const Vault = styled.div``;

const VaultText = styled.div`
  font-size: 24px;
`;

const VaultDescription = styled.div`
  font-size: 16px;
  color: rgba(43, 57, 84, 0.5);
`;

const VaultTextWrapper = styled.div`
  margin: 0 auto;
  margin-bottom: 20px;
`;

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
  background-color: transparent;
  border-radius: 50px;
  padding: 10px 24px;
  border: 2px solid rgba(47, 128, 237, 0.7);
  color: rgba(47, 128, 237, 0.7);
  &:focus {
    outline: 0 !important;
  }
`;

const TableWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
`;

const Warning = styled.div`
  margin-top: 120px;
  font-size: 27px;
`;

const WarningSmall = styled.div`
  margin-bottom: 140px;
  font-size: 17px;
  color: rgba(43, 57, 84, 0.5);
`;

const MAX_UINT256 = new BigNumber(2)
  .pow(256)
  .minus(1)
  .toString();

export default function Recycler() {
  const recyclerContractAddress = '0x5F07257145fDd889c6E318F99828E68A449A5c7A';
  const dispatch = useDispatch();
  const selectedTokens = useSelector(s.selectTokens());
  const connected = useSelector(s.selectConnected());
  const account = useSelector(s.selectAccount());
  const walletBalance = useSelector(s.selectWalletBalance());
  const vaultBalance = useSelector(s.selectVaultBalance());
  const walletBalanceAsStr = roundFloat(walletBalance, 2);
  const vaultBalanceAsStr = roundFloat(vaultBalance, 2);
  const web3Context = useWeb3React();
  const { library } = web3Context;
  let unapprovedTokens = [];
  let web3;

  if (library) {
    web3 = new Web3(library.provider);
  }

  const tokensWithBalance = _.filter(
    selectedTokens,
    token => token.balance > 0 && !token.vault,
  );

  const getAllowance = async token => {
    const { abi, address } = token;
    const tokenContract = new web3.eth.Contract(abi, address);
    const allowance = await tokenContract.methods
      .allowance(account, recyclerContractAddress)
      .call({
        from: account,
      });
    return allowance;
  };

  const getApprovalForToken = async token => {
    const allowance = await getAllowance(token);
    const approved = _.toNumber(allowance) > 0;
    return approved;
  };

  const checkIfDoneWithUserApprovals = () => {
    const tokensWithoutUserApproval = _.filter(
      unapprovedTokens,
      token => !token.approved,
    );
    const nbrUnapprovedTokens = _.size(tokensWithoutUserApproval);
    if (nbrUnapprovedTokens === 0) {
      dispatch(a.web3Waiting('Waiting for transactions...'));
    }
  };

  const approveToken = async token => {
    const { abi, address } = token;
    const tokenContract = new web3.eth.Contract(abi, address);
    const newToken = token;
    newToken.approved = false;
    dispatch(a.updateApprovedTokens(unapprovedTokens));
    await tokenContract.methods
      .approve(recyclerContractAddress, MAX_UINT256)
      .send({
        from: account,
      })
      .on('transactionHash', () => {
        newToken.approved = true;
        newToken.confirmed = false;
        checkIfDoneWithUserApprovals();
        dispatch(a.updateApprovedTokens(unapprovedTokens));
      })
      .on('receipt', () => {
        newToken.confirmed = true;
        dispatch(a.updateApprovedTokens(unapprovedTokens));
      });
    const approved = await getApprovalForToken(token);
    return approved;
  };

  const getUnapprovedTokens = async () => {
    const checkApproval = async token => {
      const approved = await getApprovalForToken(token);
      if (!approved) {
        unapprovedTokens.push(token);
      }
    };
    for (const token of tokensWithBalance) {
      await checkApproval(token);
    }
    return unapprovedTokens;
  };

  const approveTokens = async () => {
    unapprovedTokens = await getUnapprovedTokens();
    const nbrUnapprovedTokens = _.size(unapprovedTokens);
    if (nbrUnapprovedTokens === 0) {
      console.log('All tokens with balance approved');
      return true;
    }
    try {
      dispatch(a.updateApprovedTokens(unapprovedTokens));
      dispatch(a.updateModalState('tokens'));
      dispatch(a.web3Waiting('Waiting for token approvals...'));
      await Promise.all(_.map(_.reverse(unapprovedTokens), await approveToken));
      return true;
    } catch (err) {
      console.log('Error approving tokens:', err);
      return false;
    }
  };

  const deposit = async () => {
    const approved = await approveTokens();
    if (!approved) {
      dispatch(a.web3Waiting('Tokens not approved'));
      dispatch(
        a.updateModalState('error', 'Please approve tokens and try again.'),
      );
      console.log('Tokens not approved. Refusing deposit.');
      return false;
    }
    dispatch(a.web3Waiting('Waiting for deposit...'));
    dispatch(a.updateModalState('spinner'));

    const recyclerContract = new web3.eth.Contract(
      recyclerAbi,
      recyclerContractAddress,
    );

    await recyclerContract.methods
      .recycle()
      .send({
        from: account,
      })
      .then(() => {
        dispatch(a.web3Waiting('Deposit successful'));
        dispatch(a.updateModalState('success'));
        dispatch(a.fetchWallet());
      })
      .catch(err => {
        dispatch(a.web3Waiting('Deposit failed'));
        dispatch(a.updateModalState('error', err.message));
      });
  };

  const withdraw = async () => {
    const vault = _.find(selectedTokens, token => token.symbol === 'YUSD');
    const { address, abi, balance } = vault;
    const vaultContract = new web3.eth.Contract(abi, address);
    dispatch(a.web3Waiting('Waiting for withdrawal...'));
    dispatch(a.updateModalState('spinner'));

    try {
      await vaultContract.methods.withdraw(balance).send({
        from: account,
      });
    } catch (err) {
      dispatch(a.web3Waiting('Withdrawal failed'));
      dispatch(a.updateModalState('error', err.message));
      return;
    }

    dispatch(a.web3Waiting('Withdrawal successful'));
    dispatch(a.updateModalState('success'));
    dispatch(a.fetchWallet());
  };

  const renderToken = token => {
    const { symbol, address, balance, vault, decimals } = token;
    if (vault) {
      return;
    }
    const balanceFloat = balance / 10 ** decimals;
    const normalizedBalance = roundFloat(balanceFloat, '2');
    return (
      <Tr key={address}>
        <Td>
          <StyledTokenIcon token={token} /> {symbol}
        </Td>
        <Td>{normalizedBalance}</Td>
      </Tr>
    );
  };
  const tokenRows = _.map(selectedTokens, renderToken);
  const balance = (
    <TableWrapper>
      <VaultTextWrapper>
        <VaultText>
          <b>Wallet</b> (stablecoins)
        </VaultText>
        <VaultDescription>Balance: {walletBalanceAsStr}</VaultDescription>
      </VaultTextWrapper>
      <Table>
        <tbody>{tokenRows}</tbody>
      </Table>
    </TableWrapper>
  );

  const vault = (
    <Vault>
      <VaultTextWrapper>
        <VaultText>
          <b>Vault</b>: curve.fi/y LP
        </VaultText>
        <VaultDescription>Balance: {vaultBalanceAsStr}</VaultDescription>
      </VaultTextWrapper>
      <Icon src="https://yearn.finance/static/media/yCRV-logo.64055e3f.png" />
    </Vault>
  );

  let middle;
  if (!connected) {
    middle = <ConnectButton />;
  } else {
    middle = (
      <ButtonWrap>
        <Button type="button" onClick={deposit}>
          Deposit All
        </Button>
        <Button type="button" onClick={withdraw}>
          Withdraw All
        </Button>
      </ButtonWrap>
    );
  }
  return (
    <RecycleWrapper>
      <Warning>Deposit stable coins into yCrv vault.</Warning>
      <WarningSmall>
        <A
          href={`https://etherscan.io/address/${recyclerContractAddress}#code`}
          target="_blank"
        >
          Contract
        </A>{' '}
        unaudited. Use at your own risk.
      </WarningSmall>
      <Content>
        {balance}
        {middle}
        {vault}
      </Content>
    </RecycleWrapper>
  );
}
