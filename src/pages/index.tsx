import { FC, useCallback, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import ClipLoader from 'react-spinners/ClipLoader'
const Leaderboard = dynamic(() => import('../components/Leaderboard'))

import { ethers } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { users } from '../data/users'
import { AccountType } from '@/types'
import tokenABI from '@/lib/tokenABI'
import { useAccount, useBalance, useProvider } from 'wagmi'
import CustomConnect from '@/components/CustomConnect'
import { Card } from '@/components/Card'
import { NextLink } from '@/components/NextLink'

const tokenAddresses = [
	{
		address: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
		token: 'LC',
	},
]

const Home: FC = () => {
	const [accounts, setAccounts] = useState<AccountType[]>([])
	const [isLoadingLeaderboard, setLoadingLeaderBoard] = useState(false)
	const { address } = useAccount({
		onConnect({ address, isReconnected }) {
			if (isReconnected) return
			// loadBalanceData(address)
		},
	})
	const provider = useProvider()
	const { data: balance } = useBalance({
		addressOrName: address,
		token: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
	})

	const loadBalanceData = useCallback(
		async (address: string) => {
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
			console.log('🚀 ~ file: index.tsx ~ line 80 ~ loadBalanceData ~ tokenBalances', tokenBalances)

			setAccounts([
				{
					address: address as string,
					balance: Number(balance?.formatted) as number,
					tokens: tokenBalances,
				},
			])
		},
		[balance?.formatted, provider]
	)

	useEffect(() => {
		if (!address) return
		loadBalanceData(address)
	}, [address, loadBalanceData])

	return (
		<div className="mx-auto">
			<div className="actions flex align-center justify-center">
				<CustomConnect />
			</div>

			{address && !isLoadingLeaderboard && (
				<div className="buttons flex gap-x-5 align-center justify-center mb-8">
					<NextLink href={'/send'} className="clip btn btn-text">
						Add peers
					</NextLink>
					<NextLink href={'/send'} className="clip btn2 btn-text">
						Send funds
					</NextLink>
				</div>
			)}
			{isLoadingLeaderboard && (
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<ClipLoader color="black" loading={isLoadingLeaderboard} size={40} />
				</div>
			)}
			<div className="flex justify-center align-center pt-8">
				{address && accounts.length > 0 && !isLoadingLeaderboard && (
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
