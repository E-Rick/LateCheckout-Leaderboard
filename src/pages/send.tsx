import React, { FC, useEffect, useState } from 'react'
import { useContract, useSigner } from 'wagmi'
import tokenABI from '@/lib/tokenABI'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { supabase } from '@/lib/supabaseClient'
import ConfettiCanvas from '@/components/animations/ConfettiCanvas'
import ClipLoader from 'react-spinners/ClipLoader'
import { Card } from '@/components/Card'
import { TOKEN_ADDRESS } from '@/lib/consts'
import { useAuth } from '@/hooks/useAuth'
import { shortenAddress } from '@/utils/formatters'
import TokenGate from '@/components/TokenGate'

const Send: FC = () => {
	const { signer } = useAuth()
	const [isSendingFunds, setIsSendingFunds] = useState(false)
	const [accounts, setAccounts] = useState([])
	const [recipient, setRecipient] = useState('')
	const [tokenAmount, setTokenAmount] = useState('')
	const [fireConfetti, setFireConfetti] = useState(false)

	const erc20_rw = useContract({
		addressOrName: TOKEN_ADDRESS,
		contractInterface: tokenABI,
		signerOrProvider: signer,
	})

	useEffect(() => {
		const fetchAccounts = async () => {
			let { data: accounts, error } = await supabase.from('accounts').select('*').order('name')
			if (error) console.error('error', error)
			else setAccounts(accounts)
		}
		fetchAccounts()
	}, [])

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		try {
			setIsSendingFunds(true)
			event.preventDefault()

			// The signer has enough tokens to send, so true is returned
			console.log(await erc20_rw.callStatic.transfer(recipient, parseUnits(tokenAmount)))

			console.log('balance: ', formatUnits(await erc20_rw.balanceOf(signer.getAddress())))

			// Transfer 1.23 tokens to the ENS name "ricmoo.eth"
			const tx = await erc20_rw.transfer(recipient, parseUnits(tokenAmount))

			// Wait for the transaction to be mined...
			await tx.wait()

			// After!
			console.log('senders new balance: ', formatUnits(await erc20_rw.balanceOf(signer.getAddress())))
			// '98.77'

			console.log('recipients balance: ', formatUnits(await erc20_rw.balanceOf(recipient)))

			setIsSendingFunds(false)
			// fire fetti!
			setFireConfetti(true)
		} catch (error) {
			alert(`${error}`)
			setIsSendingFunds(false)
		}
	}

	const handleChange = (event: { target: { value: string } }) => {
		const result = event.target.value.replace(/\D/g, '')

		setTokenAmount(result)
	}

	return (
		<TokenGate>
			<form onSubmit={handleSubmit} className="flex flex-col w-full gap-10 px-4">
				<h2 className="flex py-4 text-4xl font-bold fancy place-content-center sm:pt-2">Send Funds</h2>

				<div>
					<label className="block mb-2 text-sm font-medium text-slate-700">Recipient</label>
					<select
						className="bg-slate-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500  block w-full p-2.5 dark:bg-green-100"
						name="recipients"
						value={recipient}
						onChange={event => {
							setRecipient(event.target.value)
						}}
					>
						{accounts.map((account, index) => (
							<option key={index} value={account.address}>
								<div className="flex justify-center">
									<span>{account.name}</span>
									<span>{shortenAddress(account.address)}</span>
								</div>
							</option>
						))}
					</select>
				</div>

				<div>
					<label className="block mb-2 text-sm font-medium text-slate-700">Amount to send</label>
					<input
						value={tokenAmount}
						onChange={handleChange}
						type="number"
						id="tokenAmount"
						className="bg-red-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-red-100 dark:border-green-400"
						placeholder="$LC"
					/>
				</div>

				<button className="clip btn btn-text" type="submit" disabled={isSendingFunds} value="submit">
					{isSendingFunds ? <ClipLoader color="white" loading={isSendingFunds} size={20} /> : 'Send Funds'}
				</button>

				<ConfettiCanvas fireConfetti={fireConfetti} />
			</form>
		</TokenGate>
	)
}
export default Send
