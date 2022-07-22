import { FC, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ClipLoader from 'react-spinners/ClipLoader'
const Leaderboard = dynamic(() => import('../components/Leaderboard'))

import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { AccountType } from '@/types'
import tokenABI from '@/lib/tokenABI'
import { useAccount, useBalance, useProvider } from 'wagmi'
import CustomConnect from '@/components/CustomConnect'
import { Card } from '@/components/Card'
import { NextLink } from '@/components/NextLink'
import { supabase } from '@/utils/supabaseClient'
import { useIsMounted } from '@/hooks/useIsMounted'
import { TOKEN, TOKEN_ADDRESS } from '@/lib/consts'
import { users } from '@/data/users'
import TokenGate from '@/components/TokenGate'

const tokenAddresses = [
	{
		address: TOKEN_ADDRESS,
		token: TOKEN,
	},
]

const Home: FC = () => {
	const [accounts, setAccounts] = useState<AccountType[]>([])
	const [isLoadingLeaderboard, setLoadingLeaderBoard] = useState(false)
	const mounted = useIsMounted()
	const provider = useProvider()
	const { address } = useAccount()
	const { data: balance } = useBalance({
		addressOrName: address,
		token: TOKEN_ADDRESS,
	})

	const loadBalanceData = async (address: string) => {
		// Comment out this line to pull in the user data from the data/users.ts file
		let { data: users } = await supabase.from('accounts').select('*').order('name')
		const tokenBalances = await Promise.all(
			tokenAddresses.map(async token => {
				const tokenInst: ethers.Contract = new ethers.Contract(TOKEN_ADDRESS, tokenABI, provider)
				const balance = await tokenInst.balanceOf(address)

				const promises: any[] = []

				setLoadingLeaderBoard(true)

				users.forEach(u => {
					const promise = tokenInst.balanceOf(u.address)
					promises.push(promise)
				})

				const balances = await Promise.all(promises)
				const mappedBalance = balances.map((b, i) => {
					return {
						name: users[i].name,
						address: users[i].address,
						balance: Number(formatUnits(b)),
					}
				})
				mappedBalance.sort((a, b) => b.balance - a.balance)

				setLoadingLeaderBoard(false)

				return {
					token: token.token,
					balance: Number(formatUnits(balance)),
					userBalances: mappedBalance,
				}
			})
		)
		setAccounts([
			{
				address: address as string,
				balance: Number(balance?.formatted) as number,
				tokens: tokenBalances,
			},
		])
	}

	useEffect(() => {
		loadBalanceData(address)
	}, [address])

	return (
		<div className="mx-auto">
			<div className="flex align-center justify-center">
				<CustomConnect />
			</div>

			<TokenGate>
				{isLoadingLeaderboard && !mounted && (
					<div className="flex align-center justify-center">
						<ClipLoader color="white" loading={isLoadingLeaderboard} size={40} />
					</div>
				)}

				{address && !isLoadingLeaderboard && accounts.length > 0 && (
					<div>
						{accounts.map(account => {
							return (
								<div className="account" key={account.address}>
									<Leaderboard account={account} />
								</div>
							)
						})}
					</div>
				)}
			</TokenGate>
		</div>
	)
}

export default Home
