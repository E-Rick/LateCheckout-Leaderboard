import React, { ReactNode } from 'react'

import Head from 'next/head'
import ConnectWallet from './ConnectWallet'
import { NextLink } from './NextLink'

type Props = {
	children?: ReactNode
	title?: string
}

const Layout = ({ children, title = 'This is the default title' }: Props) => (
	<>
		<Head>
			<title>{title}</title>
			<meta charSet="utf-8" />
			<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			<link rel="shortcut icon" href="/images/favicon.ico" />
		</Head>

		<header className="flex justify-end p-4">
			<ConnectWallet show={'connected'} />
		</header>

		<section className="pt-4 px-2 min-h-screen">
			<div className="flex justify-center">
				<NextLink href="/">
					<h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-10 h1 font-iPixelU uppercase text-[#ebf9fe]">
						Leaderboard
					</h1>
				</NextLink>
			</div>

			{children}
		</section>
	</>
)

export default Layout
