---
title: White Paper
description: Lumen Network white paper - architecture, specifications, tokenomics and governance
order: 3
category: Resources
---

# Lumen Network White Paper

**The browser layer for a decentralized internet.**

Version 1.0 — August 2026

---

## 1. Abstract

The decentralized web has solved storage, settlement, and identity at the protocol level, but the path a user actually takes to reach it is still owned by centralized intermediaries: the browser, DNS, hosted gateways, and app stores. Protocol decentralization without access decentralization is incomplete.

Lumen addresses the access layer directly. It is a single integrated stack — a native desktop browser, an IPFS gateway network, and a Cosmos SDK blockchain — designed so that decentralized content can be resolved, verified, and displayed without routing back through Web2 choke points.

This document describes the problem Lumen targets, the architecture of the stack, the technical specifications of the chain, the `$LMN` token model, and the governance system.

---

## 2. The Problem

Decentralized protocols are reached through centralized doors.

**The browser is not neutral.** Users reach the web through browsers built and distributed by a handful of companies. Decentralized protocols are supported, when they are supported at all, through extensions — a second-class integration that cannot own address resolution, content verification, or the trust indicators users rely on.

**Gateways recentralize content.** IPFS and similar networks are decentralized in theory, but most users reach them through a small number of hosted HTTP gateways. When those gateways filter, fail, or disappear, the content is effectively unreachable, regardless of how many nodes still hold it.

**Naming still resolves through DNS.** Decentralized naming systems exist, but resolving them in a normal browsing session generally requires falling back to a centralized resolver or a proxy service.

**The UX gap is real.** Seed phrases, gas fees, network switching, and manual RPC configuration remain the default onboarding experience. Each is a point where a mainstream user stops.

**The layers are fragmented.** A user assembling decentralized access today needs a browser, an extension wallet, a gateway, a naming resolver, and a chain — five tools, five trust assumptions, five failure modes, none of which were designed together.

---

## 3. Design Principles

The Lumen architecture follows five principles:

1. **Own the entry point.** Decentralized access must be delivered as a product a user can open, not as a protocol a user must assemble.
2. **Verify at the edge.** Content integrity and name resolution are checked on the client, not trusted from a hosted endpoint.
3. **Remove the fee barrier.** Gas fees are a UX tax on onboarding. Lumen has no gas market at all; spam resistance is handled by a flat transfer tax instead, so a user never needs to acquire a fee token or reason about gas.
4. **Assume a post-quantum future.** Signature schemes are an infrastructure decision with a long tail. Lumen requires post-quantum signatures at the protocol level rather than deferring the migration.
5. **Decentralize governance from the start.** Founder voting power is 0%; network parameters are set by the validator set through on-chain governance.

---

## 4. Architecture

![Architecture Diagram](/docs/architecture_overview.png)

The stack has four layers. Each is usable on its own, but the design intent is that they reinforce each other: the browser creates distribution, the gateways make content available, the chain coordinates and settles, and the wallet removes onboarding friction.

### 4.1 Lumen Browser

A native desktop browser (currently in public beta) rather than a browser extension. Being the browser rather than a guest inside one allows Lumen to:

- Resolve Lumen URLs natively in the address bar, without a hosted resolver
- Retrieve and verify decentralized content before rendering it
- Embed the wallet in the browser trust boundary instead of an extension sandbox
- Surface verification state as part of the chrome, not as an overlay

The browser is the distribution wedge for the rest of the stack. It is the layer a non-technical user interacts with, and the only layer they need to install.

### 4.2 Gateway Network

A network of IPFS-aware gateway agents handling pinning, retrieval, routing, and content availability. Rather than depending on a single hosted endpoint, retrieval is spread across independently operated agents whose participation is tied to on-chain incentives.

The gateway agent is open source and operable by anyone: [github.com/network-lumen/gateway-agent](https://github.com/network-lumen/gateway-agent)

### 4.3 Lumen Chain

A dedicated Cosmos SDK blockchain (chain id `lumen`) providing the settlement and coordination layer: validator security, domain registration and routing parameters, gateway incentives, and governance over network parameters.

The chain is not the product surface — it is the coordination substrate that makes the browser and gateway layers trustworthy without a central operator.

### 4.4 Wallet and UX Layer

The wallet is embedded in the browser and also available as a standalone extension. Two decisions define the UX posture:

- **No gas.** Users do not need to acquire a fee token, estimate gas, or top up a balance before their first action.
- **Post-quantum signing built in.** PQC key management is handled by the wallet rather than exposed as a user concern.

---

## 5. Technical Specifications

### 5.1 Chain Identity

| Parameter | Value |
| --- | --- |
| Chain ID | `lumen` |
| Bech32 prefix | `lmn` (addresses look like `lmn1...`) |
| Base denom | `ulmn` (1 LMN = 1,000,000 ulmn) |
| Framework | Cosmos SDK / CometBFT (Tendermint) |

### 5.2 Consensus and Network Parameters

Lumen's network constants are defined by configuration and genesis, not by marketing figures. The authoritative values live in genesis and node config.

| Parameter | Value | Source |
| --- | --- | --- |
| Block time (configured) | 4 seconds | `timeout_commit` in `~/.lumen/config/config.toml` |
| Block time (observed) | ~5.15 seconds | measured over 10,000 consecutive blocks |
| Block max bytes | 22,020,096 | genesis `consensus.params.block.max_bytes` |
| Evidence max bytes | 1,048,576 | genesis `consensus.params.evidence.max_bytes` |
| Block max gas | `-1` (unmetered) | genesis `consensus.params.block.max_gas` |
| Max validators | 100 | staking params |
| Unbonding period | 21 days | staking params |
| Minimum commission rate | 0% | staking params |
| Community tax | 2% | distribution params |

`timeout_commit` is configured at 4 seconds, but observed cadence including consensus round-trip is closer to 5.15 seconds. All time-denominated projections in this document use the observed figure.

### 5.3 Fee Model: No Gas, Flat Transfer Tax

Lumen has **no gas market**. `block.max_gas` is set to `-1`, nodes run with `--minimum-gas-prices 0ulmn`, and transactions must carry an explicit zero fee (`--fees="0ulmn"`). Non-zero minimum gas price configurations are rejected outright.

This removes the most common onboarding failure — a user holding an asset but unable to move it for lack of a separate fee token — and makes gasless application flows the default rather than a subsidized special case.

Spam resistance does not disappear with the gas market; it moves to a simpler mechanism. The `x/tokenomics` module applies a flat **1% transfer tax** (`tx_tax_rate`) to eligible transfers through an ante handler, alongside a dust guard (`min_send_ulmn`, default `1000 ulmn`) that blocks economically meaningless transfers used to inflate transaction counts.

The distinction matters: gas prices make cost unpredictable and require users to hold a specific token in a specific amount before acting. A percentage tax on the amount transferred is proportional, predictable, and self-denominated — a user moving 100 LMN pays 1 LMN, and never needs to think about it in advance.

Both `tx_tax_rate` and `min_send_ulmn` are adjustable by on-chain governance through `MsgUpdateParams`, so the network can tune spam resistance without a chain upgrade.

### 5.4 Cryptography

| Function | Algorithm |
| --- | --- |
| Consensus keys | Ed25519 (CometBFT) |
| Account / transaction signatures | Secp256k1 (Cosmos-style EOAs) |
| Post-quantum extension | Dilithium3, **required** for outbound transactions |
| Hashing | SHA-256 |
| Key derivation | BIP39 / BIP44 |

**Post-quantum policy.** PQC is required at genesis (`PQC_POLICY_REQUIRED`, `min_scheme=dilithium3`). Every outbound transaction is dual-signed: a classical Secp256k1 signature plus a Dilithium3 signature.

Linking a PQC key requires a minimum balance of `1000 ulmn`. An account can receive funds without a linked PQC key, but signing and broadcasting requires one.

The rationale is migration risk. Retrofitting post-quantum signatures onto a chain with an established account base is a coordination problem with no clean solution. Requiring dual-signing from genesis means Lumen never has to run that migration.

---

## 6. Tokenomics — $LMN

![Token Emission](/docs/tokenemission_overview.png)

### 6.1 Utility

`$LMN` is the coordination asset of the network. It has utility everywhere the network has work to do:

- **Security.** Validators bond `$LMN`; delegators stake to validators. Bonded stake is what secures consensus.
- **Gateway incentives.** Gateway operators are compensated for pinning, retrieval, and availability.
- **Domains and routing.** Domain registration and routing parameters are settled on-chain.
- **Governance.** Emissions, network parameters, grants, and protocol priorities are decided by stake-weighted vote.

### 6.2 Denomination

The base denomination is `ulmn`, with 1 LMN = 1,000,000 ulmn. All on-chain amounts are expressed in `ulmn`.

### 6.3 Issuance

Issuance is tied directly to block production. The chain mints **1 LMN per block** starting at height 1, halving every **31,536,000 blocks**, with a hard cumulative cap of **63,072,000 LMN**.

| Parameter | Value | Mutability |
| --- | --- | --- |
| `initial_reward_per_block_lumn` | 1 LMN | Genesis-locked |
| `halving_interval_blocks` | 31,536,000 | Genesis-locked |
| `supply_cap_lumn` | 63,072,000 LMN | Genesis-locked |
| `denom` / `decimals` | `ulmn` / 6 | Genesis-locked |

These five parameters are **immutable**. They are fixed at genesis and cannot be altered by governance vote, by validator majority, or by the founder. The supply schedule is not a policy that can be revised under pressure — it is a property of the chain.

The practical consequence is that issuance is fully auditable from chain state alone: total supply tracks block height exactly (`supply = height + 2`, accounting for the genesis allocation). There is no off-chain schedule to reconcile and no trusted party attesting to the float.

At the observed ~5.15-second block time, current issuance is approximately **16,800 LMN per day**, and the first halving lands roughly 5.1 years after genesis. Note that the halving interval is denominated in *blocks*, not time — a slower cadence stretches the schedule proportionally rather than changing the total.

### 6.4 Validator Revenue

Validators are not compensated by a gas market, because there isn't one. Two flows fund them instead:

1. **Block emission** — the per-block reward described above.
2. **Transfer tax** — the 1% `tx_tax_rate` is deposited into the fee collector account and distributed to validators through the Cosmos distribution module, on a `distribution_interval_blocks` cadence (every 10 blocks by default).

A 2% community tax is withheld from distribution and routed to the community pool for governance-directed spending.

This gives validator economics a second revenue source tied to network usage rather than to emission alone — which matters increasingly as the halving schedule reduces block rewards over time.

---

## 7. Governance

![Governed Parameters](/docs/governedparameters_overview.png)

### 7.1 Voting Power

![Voting Power](/docs/votingpower_overview.png)

Voting power is stake-weighted:

```
Voting Power = Validator Self-Stake + Delegated Stake
```

**Founder voting power is 0%.** The founder holds no governance weight; every parameter change is decided by the validator set and their delegators. This is a structural property of the network, not a policy commitment — there is no founder allocation to unwind.

### 7.2 Governance Parameters

| Parameter | Value |
| --- | --- |
| Minimum deposit | 10 LMN (`10,000,000 ulmn`) |
| Maximum deposit period | 2 days |
| Voting period | 2 days |
| Quorum | 67% |
| Pass threshold | 75% |
| Veto threshold | 33.4% |

These thresholds are deliberately strict. A 67% quorum and 75% pass threshold mean parameter changes require broad validator agreement rather than a motivated minority.

### 7.3 Scope and Limits of Governance

Governance is deliberately bounded. The governed-parameters diagram above enumerates what the DAO controls — staking and distribution settings, the transfer tax and dust guard, gateway incentive rates, domain and routing parameters, and community pool spending.

What governance **cannot** touch is equally important:

| Governable | Genesis-locked |
| --- | --- |
| `tx_tax_rate` | `initial_reward_per_block_lumn` |
| `min_send_ulmn` | `halving_interval_blocks` |
| `distribution_interval_blocks` | `supply_cap_lumn` |
| Staking, distribution, gov params | `denom`, `decimals` |

Monetary policy sits on the immutable side. Governance can tune how the network defends itself against spam and how rewards are routed, but it cannot mint beyond the cap, change the halving schedule, or redenominate the token. This is what makes the supply guarantee in §6.3 credible: it does not depend on the good behaviour of a future voter majority.

---

## 8. Network Status

The following figures are a snapshot as of August 2026. Live values are available on the [metrics page](/metrics), which queries public REST endpoints directly.

| Metric | Value |
| --- | --- |
| Blocks produced | 4.1M+ |
| Observed block time | ~5.15 s |
| Active validators | 42 (of 100 slots) |
| Total supply | ~4.17M LMN (of 63,072,000 cap) |
| Founder voting power | 0% |
| Native browser | Public beta |

The validator set is independently operated and geographically distributed. Validator slots remain open; see the [Validator Guide](/docs/validators) to join.

---

## 9. Market and Positioning

Every decentralized network eventually faces the same bottleneck: users have to reach it. Storage networks, DePIN projects, and application chains all produce infrastructure that ultimately needs a user-facing door — and today that door is a centralized browser and a hosted gateway.

Lumen is not competing with those networks; it is the access layer they lack. The browser is the distribution surface, the gateway network is the availability surface, and the chain is what makes both verifiable without a central operator.

The differentiators are architectural rather than featural, which is what makes them difficult to replicate piecemeal:

- **Native browser distribution** instead of extension-only integration
- **Post-quantum-ready dual-signing** required at the protocol level
- **No gas market** as a chain property, not an application-level subsidy
- **Incentivized gateway agents** tied to on-chain economics
- **On-chain verification** for domains, routing, and content integrity
- **Genesis-locked monetary policy** that governance cannot revise

---

## 10. Ecosystem and Source Code

All Lumen repositories are open source under the MIT license.

| Component | Repository |
| --- | --- |
| Blockchain core | [network-lumen/blockchain](https://github.com/network-lumen/blockchain) |
| Validator kit | [network-lumen/validator-kit](https://github.com/network-lumen/validator-kit) |
| Gateway agent | [network-lumen/gateway-agent](https://github.com/network-lumen/gateway-agent) |
| Integrations & SDK | [network-lumen/integrations](https://github.com/network-lumen/integrations) |

The JavaScript/TypeScript SDK is published as [`@lumen-chain/sdk`](https://www.npmjs.com/package/@lumen-chain/sdk).

---

## 11. References

- Blockchain documentation (source of truth): [github.com/network-lumen/blockchain/tree/master/docs](https://github.com/network-lumen/blockchain/tree/master/docs)
- Tokenomics: [docs/tokenomics.md](https://github.com/network-lumen/blockchain/blob/master/docs/tokenomics.md)
- Module parameters: [docs/params.md](https://github.com/network-lumen/blockchain/blob/master/docs/params.md)
- Governance: [docs/governance.md](https://github.com/network-lumen/blockchain/blob/master/docs/governance.md)
- Security posture: [docs/security.md](https://github.com/network-lumen/blockchain/blob/master/docs/security.md)
- Cosmos SDK documentation: [docs.cosmos.network](https://docs.cosmos.network/)
- Getting started: [/docs/getting-started](/docs/getting-started)
- Validator guide: [/docs/validators](/docs/validators)
- SDK documentation: [/docs/sdk](/docs/sdk)
- Live network metrics: [/metrics](/metrics)
- Download the browser beta: [/downloads](/downloads)

---

*This document describes the Lumen Network as designed and currently deployed. Network parameters are subject to on-chain governance and may change. For exact, source-of-truth values, query the chain directly or consult the blockchain documentation.*
