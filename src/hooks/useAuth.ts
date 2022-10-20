import {
  useDisconnect,
  useAccount,
  useBalance,
  useNetwork,
  useEnsAvatar,
  useProvider,
  useSigner,
} from 'wagmi';


export function useAuth() {
  const provider = useProvider()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect()
  const { data: signer } = useSigner()

  const { address, isConnecting, isConnected } = useAccount()


  const { data: ensAvatar } = useEnsAvatar({
    addressOrName: address,
    chainId: 5
  })


  const { data: balance } = useBalance({
    addressOrName: address,
  })

  return {
    provider,
    signer,
    address: address,
    // ensName: ensName ?? shortenAddress(address),
    ensAvatar: ensAvatar ?? null,
    // displayName: ensName ?? shortenAddress(address),
    balance: balance,
    loading: isConnecting,
    isConnected: isConnected,
    disconnect,
    chain,
  }
}