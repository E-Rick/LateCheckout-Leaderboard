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
import { users } from '@/data/users'

const tokenAddresses = [
	{
		address: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
		token: 'LC',
	},
]

const Home: FC = () => {
	const [accounts, setAccounts] = useState<AccountType[]>([])
	const [isLoadingLeaderboard, setLoadingLeaderBoard] = useState(false)
	const { address } = useAccount()
	const provider = useProvider()
	const { data: balance } = useBalance({
		addressOrName: address,
		token: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
	})

	const loadBalanceData = async (address: string) => {
		let { data: users } = await supabase.from('accounts').select('*').order('name')
		const tokenBalances = await Promise.all(
			tokenAddresses.map(async token => {
				const tokenInst: ethers.Contract = new ethers.Contract(
					'0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
					tokenABI,
					provider
				)
				const balance = await tokenInst.balanceOf(address)

				const promises: any[] = []

				setLoadingLeaderBoard(true)

				users.forEach(u => {
					const promise = tokenInst.balanceOf(u.address)
					promises.push(promise)
					console.log('🚀 ~ file: index.tsx ~ line 54 ~ u', u)
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

	const hasAccess = () => Number(balance?.formatted) > 50 ?? false

	useEffect(() => {
		if (hasAccess) loadBalanceData(address)
	}, [])

	return (
		<div className="mx-auto">
			<div className="flex align-center justify-center">
				<CustomConnect />
			</div>

			{address && !hasAccess && !isLoadingLeaderboard && (
				<div className="buttons flex gap-x-5 align-center justify-center mb-8">
					<NextLink href={'/add'} className="clip btn btn-text">
						Add peers
					</NextLink>
					<NextLink href={'/send'} className="clip btn2 btn-text">
						Send funds
					</NextLink>
				</div>
			)}
			{isLoadingLeaderboard && (
				<div className="flex align-center justify-center">
					<ClipLoader color="white" loading={isLoadingLeaderboard} size={40} />
				</div>
			)}
			<div className="flex justify-center align-center pt-2">
				{address && hasAccess && !isLoadingLeaderboard && (
					<Card>
						{accounts.map(account => {
							return (
								<div className="account" key={account.address}>
									<Leaderboard account={account} />
								</div>
							)
						})}
					</Card>
				)}
			</div>
		</div>
	)
}

export default Home
