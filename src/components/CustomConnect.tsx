import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import TransitionPane from './animations/TransitionPane'
import { NextLink } from './common/NextLink'

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
											className="mb-8 clip btn btn-text"
											type="button"
											onClick={openConnectModal}
										>
											Must hold 50 $LC to unlock
										</button>
									</TransitionPane>
								)
							}

							return (
								<TransitionPane>
									<div className="flex justify-center mb-8 buttons gap-x-5">
										<NextLink href={'/add'} className="clip btn btn-text">
											Add peers
										</NextLink>
										<NextLink href={'/send'} className="clip btn2 btn-text">
											Send funds
										</NextLink>
									</div>
								</TransitionPane>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}

export default CustomConnect
