import { Card } from '@/components/Card'
import React, { FC, useState } from 'react'
import { supabase } from '../utils/supabaseClient'
import { useAccount } from 'wagmi'
import TokenGate from '@/components/TokenGate'

const Send: FC = () => {
	const [loading, setLoading] = useState(false)
	const { address } = useAccount()
	const [name, setName] = useState('')

	async function addPeer({ name, address }) {
		try {
			setLoading(true)
			const updates = {
				name,
				address,
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
			<form className="flex flex-col w-full px-4 gap-10">
				<h2 className="fancy font-bold text-4xl place-content-center flex sm:pt-2 py-4">Add Peer</h2>
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

				<button
					className="clip btn btn-text align-center justify-center"
					type="submit"
					disabled={loading}
					onClick={() => addPeer({ name, address })}
				>
					{loading ? 'Loading ...' : 'Add Peer'}
				</button>
			</form>
		</TokenGate>
	)
}
export default Send
