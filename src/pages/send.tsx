import { Card } from '@/components/Card'
import React, { FC, useState } from 'react'
import { useAccount, useContract, useProvider, useSigner } from 'wagmi'
import tokenABI from '@/lib/tokenABI'
import { formatUnits, parseUnits } from 'ethers/lib/utils'

const Send: FC = () => {
	const [isSendingFunds, setIsSendingFunds] = useState(false)
	const { address } = useAccount()
	const { data: signer, isError, isLoading } = useSigner()
	const [recipient, setRecipient] = useState('')
	const erc20_rw = useContract({
		addressOrName: '0xd5003296ac2c09d8fabb412ba1a2cdf50d959496',
		contractInterface: tokenABI,
		signerOrProvider: signer,
	})

	// sending 0.5 tokens with 18 decimals
	const submit = async () => {
		// The signer has enough tokens to send, so true is returned
		await erc20_rw.callStatic.transfer(recipient, parseUnits('1.23'))
		formatUnits(await erc20_rw.balanceOf(signer.getAddress()))
		// Transfer 1.23 tokens to the ENS name "ricmoo.eth"
		const tx = await erc20_rw.transfer('ricmoo.eth', parseUnits('1.23'))
		// Wait for the transaction to be mined...
		await tx.wait()

		// After!
		formatUnits(await erc20_rw.balanceOf(signer.getAddress()))
		// '98.77'

		formatUnits(await erc20_rw.balanceOf(recipient))
		// '1.23'
		// {
		//   chainId: 1337,
		//   confirmations: 0,
		//   data: '0xa9059cbb0000000000000000000000005555763613a12d8f3e73be831dff8598089d3dca0000000000000000000000000000000000000000000000001111d67bb1bb0000',
		//   from: '0x8577181F3D8A38a532Ef8F3D6Fd9a31baE73b1EA',
		//   gasLimit: { BigNumber: "51558" },
		//   gasPrice: { BigNumber: "1" },
		//   hash: '0x0648696ec22f267ee00f4e03c78171985b8645eba93bbad2e4a67edf33606bfe',
		//   nonce: 2,
		//   r: '0x903c9a415d567ddde881ae9c2fe9fb2a96ac05b507e10a15127cd8d800f117cb',
		//   s: '0x0fd3b27f6b92f1872b2afa6a8e4d41bcdeb2056846cad27c662f2c078f99c958',
		//   to: '0x764a06fDdcE6b8895b6E7F9ba2874711BF31edEa',
		//   type: null,
		//   v: 2709,
		//   value: { BigNumber: "0" },
		//   wait: [Function]
		// }
		// '100.0'
		// true
	}

	return (
		<Card>
			<h2 className="fancy font-bold text-4xl place-content-center flex sm:pt-2 pt-2">Send Funds</h2>

			<form className="flex flex-col justify-center align-center w-11/12 pl-4 gap-5">
				<div className="mb-6">
					<label
						htmlFor="username-success"
						className="block mb-2 text-sm font-medium text-green-700 dark:text-green-500"
					>
						Recipient
					</label>
					<input
						type="text"
						id="username-success"
						className="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400"
						placeholder="Name or wallet address"
					/>
				</div>
				<div className="">
					{/* <div className="input-box">
							<span className="prefix">$LC</span>
							<input type="number" placeholder="10" />
						</div> */}
					<label
						htmlFor="username-error"
						className="block mb-2 text-sm font-medium text-red-700 dark:text-red-500"
					>
						Amount to send
					</label>
					<input
						type="number"
						id="username-error"
						className="bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400"
						placeholder="$LC"
					/>
				</div>
				<div className="items-baseline">
					<button className="clip btn" type="submit" onClick={() => console.log('submit')}>
						<p className="btn-text">Send funds</p>
					</button>
				</div>
			</form>
		</Card>
	)
}
export default Send
