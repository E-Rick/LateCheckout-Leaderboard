import React, { ReactNode } from 'react'
type Props = {
	children?: ReactNode
}
export const Card = ({ children }: Props) => {
	return (
		<div className="card relative p-2 h-[32rem] w-[42rem]">
			<img src="/logo.svg" className="absolute z-9 -right-10 bottom-14 w-20 rotate-12" />
			<div className="overflow-x-hidden h-full w-full .scrollhost">{children}</div>
		</div>
	)
}
