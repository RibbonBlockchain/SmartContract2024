Home page: [ribbon-app-ten.vercel.app](https://ribbon-app-ten.vercel.app)

Staging: [ribbon-app-ten.vercel.app/](https://ribbon-app-ten.vercel.app)

Production: [ribbon-app-ten.vercel.app/](https://ribbon-app-ten.vercel.app)

## [RibbonProtocol <a href="https://ibb.co/pfpWc5b"><img src="https://i.ibb.co/8rVzqtN/ribbon-app-logo-copy.png" alt="ribbon-app-logo-copy" border="0"></a>](https://ribbon-app-ten.vercel.app)

## About
Ribbon Protocol is a universal health coverage rewards and loyalty platform that aims to modify health and wellness behavior through incentivization and rewardable tasks.

The Ribbon App intertwines Universal Basic Income with Universal Health Coverage, utilizing World ID users health & socioeconomic data to enhance global well-being. The protocol rewards users for activities that help assess their wellness and socioeconomic needs, while linking them to equitable UBI and personalized services.

Rewards and Incentives are distributed in points and WLD tokens, on the Optimism Mainnet network which is a Layer 2 network of the Ethereum blockchain.


## Core contract and in scope for Audit:
1. **Points** points is an ERC20 token which is been claimed by converting the virtual points offchain and claiming it on chain with the Vault contract, Points contract
 also has a function which is used to create vaults 
2. **RibbonVault** RibbonVault is a vault contract that is created from points contract , in this contract point and worldcoin token are been deposited in it and  users 
claim their point and swap it to worldcoin at a specified rate

## Actors
These are roles of everyone on the Ribbon protocol

### Users
Users answer questioniare offchain, accumulate virtual points offchain, and can claim the points onchain. They are able to swap their claimed points 
to worldcoin at a specified rate with the permission of the admin

### Admin
This is the address that can sign some parameters offchain and pass it to the users which can be used as verification to claim points or to swap points to worldcoin

## Compatibilities

Ribbon protocol is compatible with the following:

1. Any ERC20 token

It is not compatible with:

1. Any network which is not EVM compatible
2. Any token standard other than ERC20
3. Ether (ETH)

## Setup

Clone the contest repository:

```
git clone https://github.com/RibbonBlockchain/SmartContract2024.git
cd 
code .
```
To run tests:
```
 forge test -vvvv
 
```
