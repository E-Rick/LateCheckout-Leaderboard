import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import '../styles/global.css'

import { getDefaultWallets, RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME } from '@/lib/consts'
import Layout from '@/components/Layout'
import { useAnalytics } from '@/hooks/useAnalytics'
import { AnimatePresence } from 'framer-motion'

const { chains, provider } = configureChains(
	[chain.goerli],
	[alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }), publicProvider()]
)

const { connectors } = getDefaultWallets({
	appName: APP_NAME,
	chains,
})

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
})

function MyApp({ Component, pageProps }: AppProps) {
	useAnalytics()

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains} theme={darkTheme()}>
				<AnimatePresence>
					<Layout title={APP_NAME}>
						<Component {...pageProps} />
					</Layout>
				</AnimatePresence>
			</RainbowKitProvider>
		</WagmiConfig>
	)
	return
}

export default MyApp
