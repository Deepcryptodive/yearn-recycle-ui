export const decimalToHex = nbr => {
  if (nbr) {
    return `0x${nbr.toString(16)}`;
  }
  return null;
};

export const chainNameFromDecimalId = chainIdAsDecimal => {
  const chainIdAsHex = decimalToHex(chainIdAsDecimal);
  const chainName = chainNameFromHexId(chainIdAsHex);
  return chainName;
};

export const chainNameFromHexId = chainIdAsHex => {
  if (chainIdAsHex === '0x1') {
    return 'mainnet';
  }
  if (chainIdAsHex === '0x3') {
    return 'ropsten';
  }
  if (chainIdAsHex === '0x2a') {
    return 'kovan';
  }
};

export const roundFloat = (val, digits) => {
  if (Number.isNaN(val)) {
    return '0.00';
  }
  return parseFloat(val)
    .toFixed(digits)
    .toString();
};
