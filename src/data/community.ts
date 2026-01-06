export const explorers = [
  { name: 'ChainTools', url: 'https://explorer.chaintools.tech/lumen' },
  { name: 'BlockSync', url: 'https://dashboard.blocksync.me/lumen' },
  { name: 'MekongLabs', url: 'https://explorer.mekonglabs.com/lumen-mainnet' },
  { name: 'OneNov', url: 'https://explorer.onenov.xyz/lumen' },
  { name: 'WinScan', url: 'https://winscan.winsnip.xyz/lumen-mainnet' },
  { name: 'DNSarz Ping', url: 'https://ping.dnsarz.xyz/Lumen' },
  { name: 'Maouam', url: 'https://explorer.maouam.xyz/lumen-mainnet' },
  { name: 'Astrostake', url: 'https://stake.astrostake.xyz/lumen' },
  { name: 'Gombezzz', url: 'https://explorer.gombezzz.xyz/lumen-mainnet' },
  { name: 'Node9x', url: 'https://explorer.node9x.com/lumen' },
  { name: 'OV Explorer', url: 'https://ov-explorer.onenov.xyz/network/lumen' },
  { name: 'UTSA Staking', url: 'https://exp.utsa.tech/lumen/staking' },
]

export const endpoints = [
  {
    name: 'RPC',
    description: 'Remote Procedure Call endpoints for blockchain interaction',
    items: [
        { provider: 'AstroStake', url: 'https://lumen-rpc.linknode.org' },
        { provider: 'Chaintools', url: 'https://rpc.lumen.chaintools.tech'},
        { provider: 'BlockSync', url: 'https://lumen.blocksync.me/rpc' },
        { provider: 'MekongLabs', url: 'https://lumen-mainnet-rpc.mekonglabs.tech' },
        { provider: 'Node9x', url: 'https://lumen-rpc.node9x.com' },
        { provider: 'UTSA', url: 'https://m-lumen.rpc.utsa.tech' }
    ],
  },
  {
    name: 'API',
    description: 'REST API endpoints for querying blockchain data',
    items: [
        { provider: 'AstroStake', url: 'https://lumen-api.linknode.org' },
        { provider: 'Chaintools', url: 'https://api.lumen.chaintools.tech:443'},
        { provider: 'BlockSync', url: 'https://lumen.blocksync.me/api' },
        { provider: 'MekongLabs', url: 'https://lumen-mainnet-api.mekonglabs.tech' },
        { provider: 'Node9x', url: 'https://lumen-api.node9x.com'},
        { provider: 'UTSA', url: 'https://m-lumen.api.utsa.tech' }
    ],
  },
  {
    name: 'gRPC',
    description: 'gRPC endpoints for high-performance communication',
    items: [
      { provider: 'AstroStake', url: 'lumen-grpc.linknode.org:443' },
      { provider: 'BlockSync', url: 'lumen-grpc.blocksync.me:443' },
      { provider: 'MekongLabs', url: 'lumen-mainnet-grpc.mekonglabs.tech:35090' }
    ],
  },
]