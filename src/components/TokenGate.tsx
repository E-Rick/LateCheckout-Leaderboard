import { useTokenGate } from '@/hooks/useTokenGate'
import { ReactNode } from 'react'
import { Card } from './Card'

type TokenGateProps = {
	children?: ReactNode
}
const TokenGate = ({ children }: TokenGateProps) => {
	const { hasEnoughToken } = useTokenGate()

	return (
		<div className="flex justify-center align-center ">
			<Card>
				{hasEnoughToken ? (
					<>{children}</>
				) : (
					<section className="flex flex-col justify-center p-10 text-3xl Winning-text text-bold">
						<div>🥺 You need 50 $LC</div>
						<div>
							Ask{' '}
							<a href="mailto:lucas@latecheckout.studio" className="hover:underline-offset-0 hover:">
								lucas@latecheckout.studio
							</a>{' '}
							for some.
						</div>
					</section>
				)}
			</Card>
		</div>
	)
}

export default TokenGate
