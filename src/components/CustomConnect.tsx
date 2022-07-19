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
										<div className="actions flex align-center justify-center">
											<button className="clip btn p-4" type="button" onClick={openConnectModal}>
												<p className="btn-text">Must hold 50 $LC to unlock</p>
											</button>
										</div>
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
