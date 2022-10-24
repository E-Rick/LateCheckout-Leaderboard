import { FC } from 'react'
import { useAccount } from 'wagmi'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useIsMounted } from '@/hooks/useIsMounted'

type Visibility = 'always' | 'connected' | 'not_connected'

const ConnectWallet: FC<{ show?: Visibility }> = ({ show = 'always' }) => {
	const mounted = useIsMounted()
	const { address } = useAccount()

	if ((show == 'connected' && !address && mounted) || (show == 'not_connected' && address)) return null

	return <ConnectButton />
}

export default ConnectWallet
