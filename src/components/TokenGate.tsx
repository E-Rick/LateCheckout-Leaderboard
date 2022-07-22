import { TOKEN_ADDRESS } from '@/lib/consts'
import { ReactNode } from 'react'
import { useAccount, useBalance } from 'wagmi'
import { Card } from './Card'
type Props = {
	children?: ReactNode
}
const TokenGate = ({ children }: Props) => {
	const { address } = useAccount()
	const { data: balance } = useBalance({
		addressOrName: address,
		token: TOKEN_ADDRESS,
	})
	return (
		<div className="flex justify-center align-center ">
			<Card>
				{Number(balance?.formatted) < 50 && (
					<label className="Winning-text box-border p-10 text-3xl text-bold">
						🥺
						<div>You need 50 $LC. Ask </div>
						<div>lucas@latecheckout.studio for some.</div>
					</label>
				)}

				{Number(balance?.formatted) > 50 && <>{children}</>}
			</Card>
		</div>
	)
}

export default TokenGate
