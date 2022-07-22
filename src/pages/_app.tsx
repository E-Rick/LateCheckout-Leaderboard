import type { AppProps } from 'next/app'

import '@rainbow-me/rainbowkit/styles.css'
import '../styles/global.css'

import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import { chain, configureChains, createClient, WagmiConfig } from 'wagmi'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import { APP_NAME, FATHOM_ID } from '@/lib/consts'
import Layout from '@/components/Layout'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import * as Fathom from 'fathom-client'

const { chains, provider } = configureChains(
	[chain.rinkeby],
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
	const router = useRouter()

	useEffect(() => {
		Fathom.load(FATHOM_ID, {
			includedDomains: ['lc-leaderboard.vercel.app, www.lc-leaderboard.vercel.app'],
		})

		function onRouteChangeComplete() {
			Fathom.trackPageview()
		}
		// Record a pageview when route changes
		router.events.on('routeChangeComplete', onRouteChangeComplete)

		// Unassign event listener
		return () => {
			router.events.off('routeChangeComplete', onRouteChangeComplete)
		}
	}, [])

	return (
		<WagmiConfig client={wagmiClient}>
			<RainbowKitProvider chains={chains}>
				<Layout title={APP_NAME}>
					<Component {...pageProps} />
				</Layout>
			</RainbowKitProvider>
		</WagmiConfig>
	)
	return
}

export default MyApp
