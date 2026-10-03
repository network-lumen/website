---
title: Trackers & Listings
description: Everything a price tracker, aggregator or exchange needs to list and integrate LMN, in one place
order: 7
category: Resources
---

# Trackers & Listings

This page collects everything a price tracker, market aggregator, wallet or exchange needs to list and integrate **Lumen (LMN)**: identity, descriptions, official links, chain parameters, supply endpoints, markets and IBC routes.

Figures marked as a snapshot were read from chain state on **October 3, 2026 (block 4,979,494)**. For live values, use the [supply endpoints](#supply-endpoints) below, which read directly from chain state.

Questions or corrections: **contact@lumen-browser.com**. Any request about LMN listings comes from that address or from the official channels listed below.

## At a Glance

| Field | Value |
| --- | --- |
| Project name | Lumen Network |
| Token name | Lumen |
| Ticker | **LMN** |
| Asset type | Coin, the native asset of its own blockchain |
| Contract address | None. LMN is a native coin, not a smart-contract token |
| Platform / chain | Lumen, an independent Cosmos SDK chain (chain ID `lumen`) |
| Base denom | `ulmn` (1 LMN = 1,000,000 ulmn) |
| Decimals | 6 |
| Max supply | 63,072,000 LMN (hard cap, fixed at genesis) |
| Mainnet launch | November 26, 2025, 16:46 UTC |
| Categories | Layer 1, Cosmos Ecosystem, Web3 Infrastructure, IPFS / Storage, Browser |
| Consensus | Proof of Stake (CometBFT) |
| Mineable | No |
| Team | Lumen DAO (on-chain governance by validators and delegators) |
| License | MIT, fully open source |
| Contact | contact@lumen-browser.com |

## Logo & Brand Assets

| Size | Link |
| --- | --- |
| 200 × 200 | https://lumen-browser.com/logo_200x200.png |
| 400 × 400 | https://lumen-browser.com/logo_400x400.png |
| 500 × 500 | https://lumen-browser.com/logo_500x500.png |
| 512 × 512 | https://lumen-browser.com/logo.png |

## Descriptions

Three lengths, ready to paste into tracker forms.

### Tagline

> Lumen Network – The Decentralized Internet Stack

### Short description (about 50 words)

> Lumen Network is an internet access stack combining a native browser, a network of IPFS gateways and a Cosmos SDK blockchain. It lets users resolve, verify and display decentralized content without centralized intermediaries. LMN is the native token, used for staking, transfers, domain registration and on-chain governance.

### Detailed description

**What is Lumen Network (LMN)?**

Lumen Network is an internet access stack that combines a native browser, a network of IPFS gateways and a dedicated blockchain built with the Cosmos SDK. The project targets the access layer of Web3: the browser, naming resolution and hosted gateways through which users reach decentralized content. Its aim is to let users resolve, verify and display that content without relying on centralized intermediaries.

The Lumen Browser, currently in public beta, is available for Windows, macOS, Linux and Android. It resolves Lumen URLs directly in the address bar, verifies content before rendering it and includes an embedded wallet. It is distributed as signed binaries with published checksums through GitHub rather than through app stores. The gateway network consists of independently operated agents that handle pinning and content retrieval. Operators set their own storage prices and can apply to be listed in the browser's built-in gateway directory.

LMN is the native token of the Lumen chain. It is used for staking, transfers, domain registration and routing, and on-chain governance.

**Who is behind Lumen Network?**

The Lumen mainnet launched on November 26, 2025. The project is governed by a DAO made up of validators and their delegators, who decide network parameters, grants and community pool spending through stake-weighted on-chain votes. The founder holds 0% of governance voting power. All components, including the chain, browser, gateway agent, SDK and validator tooling, are open source under the MIT license and developed publicly on GitHub.

**What makes Lumen Network unique?**

Lumen has no gas market. Users do not need to estimate gas or acquire a separate fee token before their first action. Spam resistance comes from a small fixed fee per transfer, currently 0.001 LMN (1000 ulmn), paid to the community pool and adjustable by DAO vote. The fee is a flat amount, not a percentage of the value transferred.

The chain requires post-quantum cryptography from genesis. Every outbound transaction is dual-signed with a classical Secp256k1 signature and a Dilithium3 signature, which removes the need for a later migration of the account base to quantum-resistant signatures.

Monetary policy is fixed at genesis. The block reward, halving interval, supply cap and denomination cannot be changed by governance, validators or the founder.

**How many LMN tokens are in circulation?**

LMN has a maximum supply of 63,072,000 tokens. Apart from a genesis allocation of 2 LMN, all tokens are issued through block rewards. Issuance starts at 1 LMN per block and halves every 31,536,000 blocks, so total supply can be verified directly from chain state. There was no pre-mine, team allocation, ICO or private sale.

**How is the Lumen Network secured?**

Lumen uses CometBFT proof-of-stake consensus. Validators bond LMN and delegators stake to them. Up to 100 validators can be active. Validators are rewarded through block emissions, with 2% of distributions directed to a community pool. Governance proposals require a 67% quorum and a 75% approval threshold to pass.

**Where can you buy LMN?**

LMN trades on Tokpie (LMN/USDT) and, via IBC, on Osmosis and the BeeZee DEX.

## Official Links

### Project

| Resource | Link |
| --- | --- |
| Website | https://lumen-browser.com |
| Documentation | https://lumen-browser.com/docs |
| White paper | https://lumen-browser.com/docs/whitepaper |
| Live metrics | https://lumen-browser.com/metrics |
| Browser download | https://lumen-browser.com/downloads |
| Community & infrastructure | https://lumen-browser.com/community |
| Wallet extension (Chrome) | https://chromewebstore.google.com/detail/lumen-wallet/lfinoahnjndcbgjjfnaefcmpaglglbph |

### Social

| Channel | Link |
| --- | --- |
| X (Twitter) | https://x.com/LumenStack |
| Discord | https://discord.gg/DwK6V9shKc |
| Telegram | https://t.me/+HBWh_cUJCrZiODE0 |

### Source code

| Resource | Link |
| --- | --- |
| GitHub organization | https://github.com/network-lumen |
| Blockchain source | https://github.com/network-lumen/blockchain |
| Browser source & releases | https://github.com/network-lumen/browser |
| Validator kit | https://github.com/network-lumen/validator-kit |
| Mainnet genesis file | https://github.com/network-lumen/validator-kit/blob/master/networks/mainnet/genesis.json |
| SDK (npm) | https://www.npmjs.com/package/@lumen-chain/sdk |

## Block Explorers

All explorers are run by independent community operators.

| Operator | Link |
| --- | --- |
| ChainTools | https://explorer.chaintools.tech/lumen |
| MekongLabs | https://explorer.mekonglabs.com/lumen-mainnet |
| OneNov | https://explorer.onenov.xyz/lumen |
| NodeGod20 | https://explorer.nodegod20.cloud/lumen-mainnet |
| WinScan | https://winscan.winsnip.xyz/lumen-mainnet |
| Maouam | https://explorer.maouam.xyz/lumen-mainnet |
| Astrostake | https://stake.astrostake.xyz/lumen |
| OV Explorer | https://ov-explorer.onenov.xyz/network/lumen |
| UTSA | https://explorer.utsa.tech/networks/lumen-mainnet |
| Indonode | https://explorer.indonode.net/lumen/ |

## Supply Endpoints

All values are returned in `ulmn`. **Divide by 1,000,000 to get LMN.**

| Metric | Endpoint |
| --- | --- |
| Total supply | https://api.lumen.chaintools.tech/cosmos/bank/v1beta1/supply/by_denom?denom=ulmn |
| Bonded (staked) | https://api.lumen.chaintools.tech/cosmos/staking/v1beta1/pool |
| Community pool | https://api.lumen.chaintools.tech/cosmos/distribution/v1beta1/community_pool |
| Token parameters | https://api.lumen.chaintools.tech/lumen/tokenomics/v1/params |
| Latest block | https://api.lumen.chaintools.tech/cosmos/base/tendermint/v1beta1/blocks/latest |

Example response for total supply:

```json
{ "amount": { "denom": "ulmn", "amount": "4979493000000" } }
```

`4979493000000 ulmn` = **4,979,493 LMN**.

### Circulating supply

**Circulating supply = total supply.** There is no team, investor, vesting or treasury allocation to exclude: every LMN in existence beyond the 2 LMN genesis allocation was issued as a block reward.

If your methodology excludes protocol-controlled funds, use **total supply minus the community pool**. The community pool is spent only by governance vote.

## Tokenomics

| Field | Value |
| --- | --- |
| Max supply | 63,072,000 LMN (hard cap, genesis-locked) |
| Total supply (snapshot) | 4,979,493 LMN |
| Circulating supply (snapshot) | 4,979,493 LMN |
| Bonded / staked (snapshot) | 3,315,303 LMN |
| Community pool (snapshot) | 101,580 LMN |
| Genesis allocation | 2 LMN |
| Emission | 1 LMN per block, halving every 31,536,000 blocks |
| Daily issuance | About 16,800 LMN at the observed block time |
| Pre-mine / team allocation | None |
| ICO / IEO / private sale | None |
| Token utility | Staking, transfers, domain registration and routing, governance |

The block reward, halving interval, supply cap, decimals and denom cannot be changed by governance. Only the chain binary can change them, and they have been fixed since genesis.

## Chain Technical Details

| Field | Value |
| --- | --- |
| Chain ID | `lumen` |
| Framework | Cosmos SDK v0.53, CometBFT |
| Node binary | `lumend` v2.0.0 |
| Bech32 prefix | `lmn` (addresses start with `lmn1…`, validators with `lmnvaloper1…`) |
| Block time | About 5.15 seconds (observed) |
| Active validators | 31 of up to 100 (snapshot) |
| Unbonding period | 21 days |
| Signatures | Secp256k1 + Dilithium3 (post-quantum signature mandatory on every outbound transaction) |
| Interoperability | IBC (Osmosis, BeeZee) |
| Governance | 67% quorum, 75% threshold, 33.4% veto |
| Chain fork | No. Lumen is an independent chain launched from its own genesis (initial height 1) |

### Fees

Lumen has **no gas market**. The transaction fee field is always zero (`--fees="0ulmn"`). Spam is handled with small fixed per-message fees instead:

| Parameter | Current value | Applies to |
| --- | --- | --- |
| `transfer_fee_ulmn` | **1000 ulmn (0.001 LMN)** | `MsgSend`, each output of `MsgMultiSend`, IBC `MsgTransfer` |
| `delegate_fee_ulmn` | 1000 ulmn | `MsgDelegate` |
| `redelegate_fee_ulmn` | 1000 ulmn | `MsgBeginRedelegate` |
| `set_withdraw_addr_fee_ulmn` | 1000 ulmn | `MsgSetWithdrawAddress` |
| `min_send_ulmn` | 1000 ulmn | Minimum amount per transfer |
| `tx_tax_rate` | 0 | No percentage tax on transfers |

These fees are:

- **Flat:** the same amount whatever the value moved.
- **Paid by the signer, on top of the amount sent:** sending 10 LMN costs 10.001 LMN, and the recipient receives exactly 10 LMN.
- **Routed to the community pool**, not to validators.
- **Set by the DAO:** governance can change each fee by on-chain vote (from 0 up to a 10 LMN ceiling) without a chain upgrade. Check the [token parameters endpoint](https://api.lumen.chaintools.tech/lumen/tokenomics/v1/params) for current values.

### Public endpoints

| Type | Provider | Endpoint |
| --- | --- | --- |
| REST | ChainTools | https://api.lumen.chaintools.tech |
| REST | UTSA | https://m-lumen.api.utsa.tech |
| REST | AstroStake | https://lumen-api.linknode.org |
| REST | OneNov | https://api-lumen.onenov.xyz |
| REST | Indonode | https://api.lumen.indonode.net |
| RPC | ChainTools | https://rpc.lumen.chaintools.tech |
| RPC | UTSA | https://m-lumen.rpc.utsa.tech |
| RPC | AstroStake | https://lumen-rpc.linknode.org |
| RPC | OneNov | https://rpc-lumen.onenov.xyz |
| RPC | MekongLabs | https://lumen-mainnet-rpc.mekonglabs.com |
| gRPC | AstroStake | `lumen-grpc.linknode.org:443` |
| gRPC | MekongLabs | `lumen-mainnet-grpc.mekonglabs.com:443` |
| gRPC | UTSA | `m-lumen.rpc.utsa.tech:9090` |

## Markets

| Market | Type | Pair | Link |
| --- | --- | --- | --- |
| Tokpie | CEX | LMN/USDT | https://tokpie.com/view_exchange/LMN-USDT/ |
| Osmosis | DEX (IBC) | LMN pools | https://app.osmosis.zone/assets/ibc/88DBE57372690630D2DD9779C247479CE124E777C5D695FA90699F3140CEC59F |
| BeeZee DEX | DEX (IBC, order book) | LMN market | [dex.getbze.com](https://dex.getbze.com/exchange/market?id=ibc/693DDB2D9B4260D67C8136C22D837F37488E0FBD81857D8E9C6022332EA26E33/ibc/6490A7EAB61059BFC1CDDEB05917DD70BDF3A611654162A1A47DB930D40D8AF4) |

### IBC denoms

On other chains, LMN appears as an IBC voucher. Map these denoms to LMN:

| Chain | LMN denom |
| --- | --- |
| Osmosis (`osmosis-1`) | `ibc/88DBE57372690630D2DD9779C247479CE124E777C5D695FA90699F3140CEC59F` |
| BeeZee (`beezee-1`) | `ibc/693DDB2D9B4260D67C8136C22D837F37488E0FBD81857D8E9C6022332EA26E33` |

### IBC channels

| Counterparty | Chain ID | Lumen channel | Counterparty channel |
| --- | --- | --- | --- |
| Osmosis | `osmosis-1` | `channel-1` | `channel-109674` |
| BeeZee | `beezee-1` | `channel-0` | `channel-10` |

## Standard Answers

| Question | Answer |
| --- | --- |
| Is this a fork? | No. Lumen is an independent Cosmos SDK chain launched from its own genesis block on November 26, 2025, with no shared block history. |
| ICO / IEO dates | None. No ICO, IEO or private sale was held. All LMN are issued through block rewards, apart from a 2 LMN genesis allocation. |
| Token standard / contract | None. LMN is the native coin of the Lumen chain. |
| Mineable | No. LMN is issued through proof-of-stake block rewards. |
| Audit | Open source under the MIT license; no third-party audit published yet. |
| Team / ownership | Governed by the Lumen DAO. The founder holds 0% of governance voting power. |
| Verification | All information on this page matches the official website, white paper and X account. Official requests come from contact@lumen-browser.com. |

## Further Reading

- [White Paper](/docs/whitepaper): architecture, tokenomics and governance in detail
- [Validator Guide](/docs/validators): running a node and validator
- [Code Repositories](/docs/repositories): every Lumen repository
- [Tokenomics module reference](https://github.com/network-lumen/blockchain/blob/master/docs/tokenomics.md)
- [IBC integration guide](https://github.com/network-lumen/blockchain/blob/master/docs/ibc_integration.md)
