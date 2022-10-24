export default function Fonts() {
	return (
		<>
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
			{
				// eslint-disable-next-line @next/next/no-page-custom-font
				<link
					href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap"
					rel="stylesheet"
				></link>
			}
			{<link rel="preload" href="/fonts/I-pixel-u.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />}
		</>
	)
}
