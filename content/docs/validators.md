---
title: Validator Guide
description: Complete guide to running a Lumen validator
order: 4
category: Validators
---

# Validator Documentation

This page focuses on the pieces that are Lumen-specific (chain id, denom, genesis source, and fee rules). For deeper ops tooling and scripts, use the Validator Kit. For the most complete reference, see the blockchain docs.

- Blockchain validator guide: https://github.com/network-lumen/blockchain/blob/master/docs/validators.md

## Quick Facts

- Chain id: `lumen`
- Bech32 prefix: `lmn`
- Base denom: `ulmn` (1 LMN = 1,000,000 ulmn)
- Gasless chain: tx fee must be exactly `0` (use `--fees="0ulmn"` when submitting tx)

## Prerequisites

- Hardware: 4+ CPU, 16GB+ RAM, SSD storage, stable network
- Linux admin basics (systemd, firewall, logs)
- Minimum stake: `1 LMN` (`1,000,000 ulmn`) is typically ~`1` voting power (Cosmos default power reduction)

## Setup

### 1) Install and build `lumend`

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install build-essential git curl -y

git clone https://github.com/network-lumen/blockchain
cd blockchain
make install

lumend version
```

### 2) Init with the correct chain id

```bash
MONIKER="your-validator-name"
lumend init "$MONIKER" --chain-id lumen
```

### 3) Install genesis (source of truth)

```bash
curl -L https://raw.githubusercontent.com/network-lumen/validator-kit/master/config/genesis.json > ~/.lumen/config/genesis.json
```

### 4) Configure gasless settings

Lumen nodes should run with `--minimum-gas-prices 0ulmn` (non-zero values are rejected).

Edit `~/.lumen/config/app.toml`:

```toml
minimum-gas-prices = ""
```

Important: transactions must still set a zero fee (example: `--fees="0ulmn"`).

### 5) Run as a systemd service

```bash
sudo tee /etc/systemd/system/lumend.service > /dev/null <<EOF
[Unit]
Description=Lumen Node
After=network.target

[Service]
User=$USER
ExecStart=$(which lumend) start --minimum-gas-prices 0ulmn
Restart=on-failure
RestartSec=3
LimitNOFILE=4096

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl enable lumend
sudo systemctl start lumend
sudo journalctl -u lumend -f
```

## Create a validator

Once synced:

```bash
lumend tx staking create-validator \
  --amount=1000000ulmn \
  --pubkey=$(lumend tendermint show-validator) \
  --moniker="$MONIKER" \
  --chain-id=lumen \
  --fees="0ulmn" \
  --from=<your-key-name>
```

## Delegation / Undelegation

```bash
lumend tx staking delegate <validator-address> 1000000ulmn \
  --from=<your-key-name> \
  --chain-id=lumen \
  --fees="0ulmn"
```

```bash
lumend tx staking unbond <validator-address> 1000000ulmn \
  --from=<your-key-name> \
  --chain-id=lumen \
  --fees="0ulmn"
```

## Troubleshooting

### Validator jailed

```bash
lumend tx slashing unjail \
  --from=<your-key-name> \
  --chain-id=lumen \
  --fees="0ulmn"
```

## Resources

- Validator Kit: https://github.com/network-lumen/validator-kit
- Blockchain: https://github.com/network-lumen/blockchain

## Validator Kit docs:

- How to become a validator: https://github.com/network-lumen/validator-kit/blob/master/ops/become_validator.md
- Stake bootstrap & decentralization: https://github.com/network-lumen/validator-kit/blob/master/ops/stake_bootstrap.md
- Validator & sentry specifications: https://github.com/network-lumen/validator-kit/blob/master/ops/validator_specs.md
- Learn folder: https://github.com/network-lumen/validator-kit/tree/master/learn
