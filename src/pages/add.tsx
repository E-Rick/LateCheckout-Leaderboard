import { Card } from '@/components/Card'
import React, { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import type { NextPage } from 'next'
import { useAuth } from '@/hooks/useAuth'
import TokenGate from '@/components/TokenGate'

const Send: NextPage = () => {
	const [loading, setLoading] = useState(false)
	const { address } = useAuth()
	const [walletAddress, setWalletAddress] = useState('')
	const [name, setName] = useState('')

	async function addPeer() {
		try {
			setLoading(true)
			const updates = {
				name,
				address: walletAddress,
			}

			let { error } = await supabase.from('accounts').insert(updates, {
				returning: 'minimal', // Don't return the value after inserting
			})

			if (error) {
				throw error
			}
		} catch (error) {
			alert(error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<TokenGate>
			<form className="flex flex-col w-full gap-10 px-4">
				<h2 className="flex py-4 text-4xl font-bold fancy place-content-center sm:pt-2">Add Peer</h2>
				<div>
					<label htmlFor="name" className="block mb-2 text-sm font-medium text-slate-700">
						Name
					</label>
					<input
						id="name"
						type="text"
						value={name || ''}
						onChange={e => setName(e.target.value)}
						className="bg-slate-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500  block w-full p-2.5 dark:bg-green-100"
						placeholder="Name"
					/>
				</div>

				<div>
					<label htmlFor="address" className="block mb-2 text-sm font-medium text-slate-700">
						Address
					</label>
					<input
						id="address"
						type="text"
						value={address || ''}
						onChange={e => setWalletAddress(e.target.value)}
						className="bg-slate-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500  block w-full p-2.5 dark:bg-green-100"
						placeholder="Name"
					/>
				</div>

				<button
					className="justify-center clip btn btn-text align-center"
					type="submit"
					disabled={loading}
					onClick={() => addPeer()}
				>
					{loading ? 'Loading ...' : 'Add Peer'}
				</button>
			</form>
		</TokenGate>
	)
}
export default Send
