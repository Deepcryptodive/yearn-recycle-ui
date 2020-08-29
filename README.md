# Recycler

Deposit stablecoins into yearn yCrv vault in one transaction. This is a UI for the "yearn-recycle" contract by Banteg.

## Demo

https://vaults.finance

## Screenshot

![alt Recycler](https://i.imgur.com/tBNhfZs.png)

## Installation

```
npm install
npm start
```

## Supported tokens

- USDC
- DAI
- USDT
- TUSD
- YCRV

## Deposit Usage

- Click "Deposit all"
- Approve all tokens with balance (you only have to do this once)
- Approve deposit
- All tokens transferred to yCrv vault

## Withdrawal usage

- Click "Withdraw all"
- Approve withdrawal
- All tokens transferred from yCrv vault to yCrv token

## References/Credits

- UI author: [x48](https://twitter.com/x48114)
- Contract author: [Banteg](https://twitter.com/bantg)
- Contract address: [0x5F07257145fDd889c6E318F99828E68A449A5c7A](https://etherscan.io/address/0x5F07257145fDd889c6E318F99828E68A449A5c7A#code)
- Contract code: [yearn-recycle](https://github.com/banteg/yearn-recycle)
- Code boilerplate: [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate)
