---
title: Code Examples
description: Practical examples for building on Lumen
order: 6
category: Developers
---

# Code Examples

Examples below are aligned with the real SDK API in `integrations/npm/sdk` (`@lumen-chain/sdk`).

## Connect (Read-Only) + Height

```ts
import { LumenClient } from '@lumen-chain/sdk';

const client = await LumenClient.connect(); // defaults to local endpoints + chainId "lumen"
console.log('Height:', await client.getHeight());
```

## Balance (RPC)

```ts
import { LumenClient, utils } from '@lumen-chain/sdk';

const client = await LumenClient.connect();
const balance = await client.getBalance('lmn1address...', 'ulmn');
console.log('Balance:', balance ?? utils.coin.ulmn('0'));
```

## New Block Callback (Polling)

```ts
import { LumenClient } from '@lumen-chain/sdk';

const client = await LumenClient.connect();
const stop = client.onNewBlock((height) => console.log('new height', height), 1_000);

// later:
// stop();
```

## DNS Resolve (REST)

```ts
import { LumenClient } from '@lumen-chain/sdk';

const client = await LumenClient.connect();
const res = await client.dns().resolve('demo', 'lmn'); // demo.lmn
console.log(res);
```

## Gateways: List Gateways / Contracts (REST)

```ts
import { LumenClient } from '@lumen-chain/sdk';

const client = await LumenClient.connect();
console.log(await client.gateways().gateways({ limit: 10 }));
console.log(await client.gateways().contracts({ limit: 10 }));
```

## Bank Send (Signing)

This is a plain Cosmos bank send. On Lumen, pass an explicit zero-fee.

```ts
import { LumenSigningClient, LUMEN, utils } from '@lumen-chain/sdk';

const signer = await utils.walletFromMnemonic(process.env.MNEMONIC!, LUMEN.bech32Prefix);
const [account] = await signer.getAccounts();

const signing = await LumenSigningClient.connectWithSigner(signer);

const msg = utils.msg.bankSend(
  account.address,
  'lmn1recipient...',
  [utils.coin.ulmn('1000000')], // 1 LMN
);

const res = await signing.signAndBroadcast(account.address, [msg], utils.gas.zeroFee(), 'hello');
console.log(res.transactionHash);
```

## DNS Register (Signing)

DNS messages are gasless in the SDK (it will automatically use a zero fee).

```ts
import { LumenSigningClient, LUMEN, utils } from '@lumen-chain/sdk';

const signer = await utils.walletFromMnemonic(process.env.MNEMONIC!, LUMEN.bech32Prefix);
const [account] = await signer.getAccounts();

const signing = await LumenSigningClient.connectWithSigner(signer);

const msg = signing.dns().msgRegister(account.address, {
  domain: 'mydomain',
  ext: 'lmn',
  durationDays: 365,
  records: [],
});

const res = await signing.signAndBroadcast(account.address, [msg]);
console.log(res.transactionHash);
```

## More

- [SDK Documentation](/docs/sdk)
- [Integrations Repo](https://github.com/network-lumen/integrations)
