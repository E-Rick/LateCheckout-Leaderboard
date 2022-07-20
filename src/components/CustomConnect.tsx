import { ConnectButton } from '@rainbow-me/rainbowkit'
import React from 'react'
import TransitionPane from './animations/TransitionPane'

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
										<button className="clip btn btn-text" type="button" onClick={openConnectModal}>
											Must hold 50 $LC to unlock
										</button>
									</TransitionPane>
								)
							}
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}

export default CustomConnect
