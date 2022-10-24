/** @type {import('tailwindcss/tailwind-config').TailwindConfig} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		container: {
			center: true,
		},
		extend: {
			fontFamily: {
				sans: ['Space Mono', 'sans-serif'],
				iPixelU: 'I Pixel U',
				spaceMono: 'Space Mono',
			},
		},
	},
	plugins: [require('flowbite/plugin')],
}
