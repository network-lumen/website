---
title: Technical Overview
description: High-level architecture and technical diagrams
order: 3
category: Resources
---

# Technical Overview

High-level diagrams & pointers for understanding how Lumen fits together. For exact, source-of-truth details, see the `blockchain/docs` folder.

## Project Architecture

A comprehensive overview of the Lumen blockchain architecture.

![Architecture Diagram](/docs/architecture_overview.png)

## Token Emission

Understanding tokenomics and the emission schedule.

![Token Emission](/docs/tokenemission_overview.png)

## DAO-Governed Parameters

Parameters that can be adjusted through governance proposals.

![Governed Parameters](/docs/governedparameters_overview.png)

## Voting Power Overview

How voting power is calculated and distributed.

![Voting Power](/docs/votingpower_overview.png)

Conceptually:

```
Voting Power = Validator Self-Stake + Delegated Stake
```

## Network Parameters (Where to Look)

Lumen’s “network constants” are defined by configuration and genesis, not marketing numbers.

- Block time: configured by Tendermint `timeout_commit` in `~/.lumen/config/config.toml` (the tokenomics docs assume ~4-second blocks).
- Block max bytes: in genesis under `consensus.params.block.max_bytes` (mainnet genesis currently uses `22,020,096` bytes).
- Evidence max bytes: in genesis under `consensus.params.evidence.max_bytes` (mainnet genesis uses `1,048,576` bytes).
- Gas/fees: Lumen is a zero-fee chain (no gas price market). Genesis sets `consensus.params.block.max_gas = -1`.

## Cryptographic Algorithms

- Consensus keys: Ed25519 (Tendermint)
- Account/tx signatures: Secp256k1 (Cosmos-style EOAs) + required Dilithium3 PQC extension for outbound transactions
- PQC policy: required at genesis (`PQC_POLICY_REQUIRED`, `min_scheme=dilithium3`)
- PQC key linking requires a minimum balance of `1000 ulmn` (you can receive funds without a linked key; signing/broadcasting requires PQC)
- Hashing: SHA-256
- Key derivation: BIP39/BIP44

## Further Reading

- Blockchain docs: https://github.com/network-lumen/blockchain/tree/master/docs
- Cosmos SDK: https://docs.cosmos.network/
