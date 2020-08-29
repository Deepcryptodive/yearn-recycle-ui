import erc20Abi from 'abi/erc20.json';
import tusdAbi from 'abi/tusd.json';
import yVaultAbi from 'abi/yVault.json';

export default [
  {
    symbol: 'DAI',
    address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    abi: erc20Abi,
  },
  {
    symbol: 'USDC',
    address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    abi: erc20Abi,
  },
  {
    symbol: 'TUSD',
    address: '0x0000000000085d4780B73119b644AE5ecd22b376',
    abi: tusdAbi,
  },
  {
    symbol: 'USDT',
    address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
    abi: erc20Abi,
  },
  {
    symbol: 'YUSD',
    address: '0x5dbcF33D8c2E976c6b560249878e6F1491Bca25c',
    abi: yVaultAbi,
    vault: true,
  },
  {
    symbol: 'yCRV',
    address: '0xdF5e0e81Dff6FAF3A7e52BA697820c5e32D806A8',
    image: 'https://etherscan.io/token/images/Curvefi_yCrv_32.png',
    abi: erc20Abi,
  },
];
