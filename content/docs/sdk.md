---
title: SDK Documentation
description: Complete guide to the Lumen SDK
order: 5
category: Developers
---

# Lumen SDK

Official JavaScript/TypeScript SDK for interacting with the Lumen chain (Cosmos SDK + Lumen modules).

This page is aligned with the real SDK source at `integrations/npm/sdk` (package `@lumen-chain/sdk`).

## Installation

```bash
npm install @lumen-chain/sdk
```

Or with yarn:

```bash
yarn add @lumen-chain/sdk
```

## Quick Start

### Read-only client (RPC + REST)

```typescript
import { LumenClient, LUMEN } from '@lumen-chain/sdk';

// Defaults target a local node (see LUMEN.defaultRpc/defaultRest).
const endpoints = { rpc: LUMEN.defaultRpc, rest: LUMEN.defaultRest };
const client = await LumenClient.connect(endpoints, LUMEN.chainId);

console.log('height', await client.getHeight());
console.log('dns resolve', await client.dns().resolve('demo', 'lmn'));
```

### Signing client (OfflineSigner + PQC)

```typescript
import { LumenSigningClient, utils } from '@lumen-chain/sdk';

const signer = await utils.walletFromMnemonic(process.env.MNEMONIC!, 'lmn');
const [account] = await signer.getAccounts();

const signing = await LumenSigningClient.connectWithSigner(signer, endpoints, LUMEN.chainId);

// DNS is a gasless module tx: you can pass utils.gas.zeroFee(), or let the client auto-detect it.
const msg = signing.dns().msgRegister(account.address, { domain: 'demo', ext: 'lmn', durationDays: 30 });
const res = await signing.signAndBroadcast(account.address, [msg], utils.gas.zeroFee());
console.log('tx hash', res.transactionHash);
```

## Addresses, chain id, endpoints

- **bech32 prefix**: `lmn` (addresses look like `lmn1...`).
- **chain id**: `lumen` by default (`LUMEN.chainId`).
- **default local endpoints**:
  - RPC: `http://127.0.0.1:27657`
  - REST: `http://127.0.0.1:2327`
  - gRPC: `http://127.0.0.1:9190`

> You can override endpoints to point at a remote node/gateway. Some older nodes still expose 26657/1317; the SDK supports both.

## Common patterns

### Query balance

```typescript
const bal = await client.getBalance('lmn1...');
console.log(bal);
```

### Send tokens (bank MsgSend)

The SDK does not wrap bank sends into a `sendTokens()` helper. Use `utils.msg.bankSend`:

```typescript
import { LumenSigningClient, utils } from '@lumen-chain/sdk';

const signer = await utils.walletFromMnemonic(process.env.MNEMONIC!, 'lmn');
const [account] = await signer.getAccounts();
const signing = await LumenSigningClient.connectWithSigner(signer);

const msg = utils.msg.bankSend(
  account.address,
  'lmn1recipient...',
  [utils.coin.ulmn('1000000')], // 1 LMN
);

// Bank txs are not in the "gaslessTypeUrls" allowlist, so either pass an explicit zero fee,
// or provide a GasPrice=0 and let the client estimate gas.
const res = await signing.signAndBroadcast(account.address, [msg], utils.gas.zeroFee());
console.log(res.transactionHash);
```

### DNS queries + tx composers

```typescript
// Queries (REST)
const resolved = await client.dns().resolve('demo', 'lmn');
const domains = await client.dns().domainsByOwner('lmn1...');

// Tx composers (EncodeObject)
const msgRegister = client.dns().msgRegister('lmn1...', { domain: 'demo', ext: 'lmn', durationDays: 30 });
```

## PQC (Dilithium)

Lumen can require Dilithium signatures for EOAs. The SDK can manage a local PQC keystore (`~/.lumen/pqc_keys`) and add
the `lumen.pqc.v1.PQCSignatures` extension during `signAndBroadcast`.

```ts
import { pqc } from '@lumen-chain/sdk';

const { publicKey, privateKey } = pqc.createKeyPair(); // Dilithium3
const store = await pqc.PqcKeyStore.open();            // defaults to ~/.lumen/pqc_keys
await store.saveKey({ name: 'my-key', scheme: 'dilithium3', publicKey, privateKey, createdAt: new Date() });
await store.linkAddress('lmn1...', 'my-key');
```

## Resources

- [NPM Package](https://www.npmjs.com/package/@lumen-chain/sdk)
- [SDK Source (integrations)](https://github.com/network-lumen/integrations/tree/master/npm/sdk)
- [Examples](/docs/examples)
