/**
 * Returns a string of form "abc...xyz"
 * @param {string} str string to string
 * @param {number} n number of chars to keep at front/end
 * @returns {string}
 */
export const getEllipsisTxt = (str: string, n = 6) => {
	if (str) {
		return `${str.slice(0, n)}...${str.slice(str.length - n)}`
	}
	return ''
}

/**
 * Returns a string of form "abc...xyz"
 * @param str string to string
 * @param front number of chars to keep at front
 * @param end number of chars to keep at end
 * @returns ellipsed string
 */
export const shortenAddress = (str: string | null, front = 6, end = 4) => {
	if (str) {
		return `${str.slice(0, front)}...${str.slice(str.length - end)}`
	}
	return ''
}

export const formatAddress = (address: string) => {
	return `${address.slice(0, 6)}…${address.slice(38, 42)}`
}
