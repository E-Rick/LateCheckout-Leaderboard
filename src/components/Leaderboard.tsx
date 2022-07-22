import React from 'react'
import { AccountType } from '../types'
import { formatAddress } from '../utils/formatters'
type PropTypes = {
	account: AccountType
}

export default function Account({ account }: PropTypes) {
	const TableHead = () => {
		return (
			<thead className="table-header-group border-b-2 border-slate-200">
				<tr className="table-row box-border fancy text-3xl sm:text-4xl ">
					<th className="py-4 w-9 box-border"></th>
					<th className="py-4">Rank</th>
					<th className="py-4">Name</th>
					<th className="py-4 hidden sm:block">Address</th>
					<th className="py-4 pr-4 box-border">$LC</th>
				</tr>
			</thead>
		)
	}

	const TableRow = ({ user, rank }) => {
		return (
			<tr>
				<td className="pl-2 box-border pt-2">
					{rank === 0 && <img src="/1stplace.svg" />}
					{rank === 1 && <img src="/2ndplace.svg" />}
					{rank === 2 && <img src="/3rdplace.svg" />}
				</td>
				<td className="text-center text-bold text-lg">{rank}</td>
				<td>{user.name}</td>
				<td className="hidden pl-4 sm:table-cell">{formatAddress(user.address)}</td>
				<td className="Winning flex justify-start align-center box-border px-4 pt-2">
					<img src="/logo.svg" className="pr-2 w-10 sm:w-auto" />
					<div data-text={user.balance.toString()} className="Winning-text text-2xl font-bold relative">
						{user.balance}
					</div>
				</td>
			</tr>
		)
	}
	return (
		<div className="flex justify-center align-center ">
			<table role="table" className="table-fixed max-w-7xl justify-center">
				<TableHead />
				<tbody>
					{account.tokens[0].userBalances.map((u, key) => (
						<TableRow key={key} user={u} rank={key} />
					))}
				</tbody>
			</table>
		</div>
	)
}
