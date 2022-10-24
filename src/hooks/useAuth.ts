import { shortenAddress } from '@/utils/formatters';
import { Router, useRouter } from 'next/router';
import {
  useDisconnect,
  useAccount,
  useBalance,
  useNetwork,
  useEnsAvatar,
  useProvider,
  useSigner,
  useEnsName,
} from 'wagmi';


export function useAuth() {
  const router = useRouter()
  const provider = useProvider()
  const { chain } = useNetwork()
  const { disconnect } = useDisconnect({
    onSuccess() {
      console.log('disconnected')
      router.push('/')
    }
  })
  const { data: signer } = useSigner()

  const { address, isConnecting, isConnected } = useAccount()


  const { data: ensName } = useEnsName({
    address,
    chainId: 5
  })
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
    ensName: ensName ?? shortenAddress(address),
    ensAvatar: ensAvatar ?? null,
    displayName: ensName ?? shortenAddress(address),
    balance: balance,
    loading: isConnecting,
    isConnected: isConnected,
    disconnect,
    chain,
  }
}