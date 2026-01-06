---
title: Getting Started
description: Quick start guide to Lumen Network
order: 1
category: Getting Started
---

# Getting Started with Lumen Network

Welcome to Lumen Network! This guide will help you get started with the SDK and basic on-chain interactions.

## What is Lumen?

Lumen is a Cosmos SDK-based blockchain with:

- `chain_id`: `lumen`
- Bech32 prefix: `lmn` (addresses look like `lmn1...`)
- Base denom: `ulmn` (1 LMN = 1,000,000 ulmn)

## Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js v18 or higher
- Git
- A code editor (VS Code recommended)

### Installation

Install the Lumen SDK using npm:

```bash
npm install @lumen-chain/sdk
```

Or using yarn:

```bash
yarn add @lumen-chain/sdk
```

### Read-Only Query

By default, the SDK targets a local node (`127.0.0.1`). You can override endpoints if you need to connect to a remote node.

```javascript
import { LumenClient, LUMEN } from '@lumen-chain/sdk';

const client = await LumenClient.connect(); // defaults to local endpoints + chainId "lumen"

console.log('Chain ID:', LUMEN.chainId);
console.log('Height:', await client.getHeight());
```

### Your First Transaction (Signing)

The SDK exposes a signing client compatible with CosmJS. For a simple bank send, you must pass an explicit zero-fee (Lumen expects 0 fees).

```typescript
import { LumenSigningClient, LUMEN, utils } from '@lumen-chain/sdk';

const signer = await utils.walletFromMnemonic(process.env.MNEMONIC!, LUMEN.bech32Prefix);
const [account] = await signer.getAccounts();

const signing = await LumenSigningClient.connectWithSigner(signer);

const msg = utils.msg.bankSend(
  account.address,
  'lmn1recipientaddresshere...',
  [utils.coin.ulmn('1000000')], // 1 LMN
);

const res = await signing.signAndBroadcast(account.address, [msg], utils.gas.zeroFee(), 'Hello Lumen');
console.log('TX hash:', res.transactionHash);
```

## Next Steps

- [Explore the SDK Documentation](/docs/sdk)
- [Learn about Validators](/docs/validators)
- [Check out Code Examples](/docs/examples)
- [Join the Community](/community)

## Need Help?

If you run into any issues:

- Join our [Discord](https://discord.gg/DwK6V9shKc)
- Ask questions on [Telegram](https://t.me/+HBWh_cUJCrZiODE0)
- Open an issue on [GitHub](https://github.com/network-lumen/)
