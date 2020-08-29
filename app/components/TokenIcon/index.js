import React from 'react';
import styled from 'styled-components';
import Web3 from 'web3';
import { useSelector } from 'react-redux';
import { selectTokens } from 'containers/App/selectors';
import ReactImageFallback from 'react-image-fallback';

const imageStyles = `
  max-width: 30px;
  align-self: center;
  min-width: 30px;
`;

export default function TokenIcon(props) {
  const { token, className } = props;
  const tokens = useSelector(selectTokens());
  const { address } = token;
  const tokenAddressChecksum = Web3.utils.toChecksumAddress(address);

  const newToken = _.find(tokens, { address });
  const image = _.get(newToken, 'image');
  let imageUrl = image;
  if (!image) {
    imageUrl = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${tokenAddressChecksum}/logo.png`;
  }
  return (
    <ReactImageFallback
      className={className}
      css={imageStyles}
      src={imageUrl}
      fallbackImage="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
    />
  );
}
