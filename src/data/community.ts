export const explorers = [
  { name: 'ChainTools', url: 'https://explorer.chaintools.tech/lumen' },
  { name: 'MekongLabs', url: 'https://explorer.mekonglabs.com/lumen-mainnet' },
  { name: 'OneNov', url: 'https://explorer.onenov.xyz/lumen' },
  { name: 'NodeGod20', url: 'https://explorer.nodegod20.cloud/lumen-mainnet' },
  { name: 'WinScan', url: 'https://winscan.winsnip.xyz/lumen-mainnet' },
  { name: 'Maouam', url: 'https://explorer.maouam.xyz/lumen-mainnet' },
  { name: 'Astrostake', url: 'https://stake.astrostake.xyz/lumen' },
  { name: 'OV Explorer', url: 'https://ov-explorer.onenov.xyz/network/lumen' },
  { name: 'UTSA', url: 'https://explorer.utsa.tech/networks/lumen-mainnet' },
  { name: 'Indonode', url: 'https://explorer.indonode.net/lumen/' },
]

export const guides = [
  { name: 'Indonode Guide', description: 'Complete Lumen setup guide', url: 'https://beta.indonode.net/networks/lumen' },
]

export const endpoints = [
  {
    name: 'RPC',
    description: 'Remote Procedure Call endpoints for blockchain interaction',
    items: [
        { provider: 'AstroStake', url: 'https://lumen-rpc.linknode.org' },
        { provider: 'Chaintools', url: 'https://rpc.lumen.chaintools.tech'},
        { provider: 'UTSA', url: 'https://m-lumen.rpc.utsa.tech' },
        { provider: 'OneNov', url: 'https://rpc-lumen.onenov.xyz' },
        { provider: 'MekongLabs', url: 'https://lumen-mainnet-rpc.mekonglabs.com' }
    ],
  },
  {
    name: 'API',
    description: 'REST API endpoints for querying blockchain data',
    items: [
        { provider: 'Chaintools', url: 'https://api.lumen.chaintools.tech:443'},
        { provider: 'UTSA', url: 'https://m-lumen.api.utsa.tech' },
        { provider: 'AstroStake', url: 'https://lumen-api.linknode.org' },
        { provider: 'OneNov', url: 'https://api-lumen.onenov.xyz' },
        { provider: 'Indonode', url: 'https://api.lumen.indonode.net' }
    ],
  },
  {
    name: 'gRPC',
    description: 'gRPC endpoints for high-performance communication',
    items: [
      { provider: 'AstroStake', url: 'lumen-grpc.linknode.org:443' },
      { provider: 'MekongLabs', url: 'lumen-mainnet-grpc.mekonglabs.com:443' },
      { provider: 'UTSA', url: 'm-lumen.rpc.utsa.tech:9090' }
    ],
  },
]

export const tools = [
  { name: 'STAVR Decentralization Map', description: 'Decentralization map', url: 'https://tools.stavr.tech/Map/lumenm/' },
  { name: 'Indonode Guide', description: 'Complete Lumen setup guide', url: 'https://beta.indonode.net/networks/lumen' },
  { name: 'Posthuman', description: 'Lumen chain page and community infrastructure', url: 'https://nodes.posthuman.digital/chains/lumen' },
]
