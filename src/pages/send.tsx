import { Card } from '@/components/Card'
import React, { FC, useEffect, useState } from 'react'
import { useAccount, useContract, useSigner } from 'wagmi'
import tokenABI from '@/lib/tokenABI'
import { formatUnits, parseUnits } from 'ethers/lib/utils'
import { supabase } from '@/utils/supabaseClient'
import ConfettiCanvas from '@/components/animations/ConfettiCanvas'
import ClipLoader from 'react-spinners/ClipLoader'

const Send: FC = () => {
	const { data: signer, isError, isLoading } = useSigner()
	const [isSendingFunds, setIsSendingFunds] = useState(false)
	const [accounts, setAccounts] = useState([])
	const [recipient, setRecipient] = useState('')
	const [tokenAmnt, setTokenAmnt] = useState('')
	const [fireConfetti, setFireConfetti] = useState(false)
	const erc20_rw = useContract({
		addressOrName: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
		contractInterface: tokenABI,
		signerOrProvider: signer,
	})

	useEffect(() => {
		fetchAccounts()
	}, [])

	const fetchAccounts = async () => {
		let { data: accounts, error } = await supabase.from('accounts').select('*').order('name')
		if (error) console.log('error', error)
		else setAccounts(accounts)
	}

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		try {
			setIsSendingFunds(true)
			event.preventDefault()

			// The signer has enough tokens to send, so true is returned
			console.log(await erc20_rw.callStatic.transfer(recipient, parseUnits(tokenAmnt)))

			console.log('balance: ', formatUnits(await erc20_rw.balanceOf(signer.getAddress())))

			// Transfer 1.23 tokens to the ENS name "ricmoo.eth"
			const tx = await erc20_rw.transfer(recipient, parseUnits(tokenAmnt))

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

		setTokenAmnt(result)
	}

	return (
		<div className="flex justify-center align-center ">
			<Card>
				<h2 className="fancy font-bold text-4xl place-content-center flex sm:pt-2 py-4">Send Funds</h2>

				<form onSubmit={handleSubmit} className="flex flex-col w-full px-4 gap-10">
					<div>
						<label className="block mb-2 text-sm font-medium text-slate-700">Recipient</label>
						<select
							className="bg-slate-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500  block w-full p-2.5 dark:bg-green-100"
							name="recipients"
							value={recipient}
							onChange={event => {
								console.log(event.target.value)
								setRecipient(event.target.value)
							}}
						>
							{accounts.map((account, index) => (
								<option key={index} value={account.address}>
									{account.name}
								</option>
							))}
						</select>
					</div>
					<div>
						<label className="block mb-2 text-sm font-medium text-slate-700">Amount to send</label>
						<input
							value={tokenAmnt}
							onChange={handleChange}
							type="number"
							id="tokenAmnt"
							className="bg-red-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-red-100 dark:border-green-400"
							placeholder="$LC"
						/>
					</div>

					<button
						className="clip btn btn-text align-center justify-center"
						type="submit"
						disabled={isSendingFunds}
						value="submit"
					>
						{isSendingFunds ? <ClipLoader color="white" loading={isSendingFunds} size={20} /> : 'Send $LC'}
					</button>
					<ConfettiCanvas fireConfetti={fireConfetti} />
				</form>
			</Card>
		</div>
	)
}
export default Send
