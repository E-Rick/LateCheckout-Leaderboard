import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import TransitionPane from './animations/TransitionPane'
import { NextLink } from './NextLink'

const CustomConnect = () => {
	return (
		<ConnectButton.Custom>
			{({ account, chain, openConnectModal, mounted }) => {
				return (
					<div
						{...(!mounted && {
							'aria-hidden': true,
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
						})}
					>
						{(() => {
							if (!mounted || !account || !chain) {
								return (
									<TransitionPane>
										<button
											className="clip btn btn-text mb-8"
											type="button"
											onClick={openConnectModal}
										>
											Must hold 50 $LC to unlock
										</button>
									</TransitionPane>
								)
							}

							return (
								<div className="buttons flex gap-x-5 align-center justify-center mb-8">
									<NextLink href={'/add'} className="clip btn btn-text">
										Add peers
									</NextLink>
									<NextLink href={'/send'} className="clip btn2 btn-text">
										Send funds
									</NextLink>
								</div>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}

export default CustomConnect
