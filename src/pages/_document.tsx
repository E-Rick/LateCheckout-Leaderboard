import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx);
		return { ...initialProps };
	}

	render() {
		return (
			<Html>
				<Head>
					<link
						rel='preload'
						href='/fonts/SpaceMono-Bold.ttf'
						as='font'
						type='font/ttf'
						crossOrigin='anonymous'
					/>
					<link
						rel='preload'
						href='/fonts/I-pixel-u.ttf'
						as='font'
						type='font/ttf'
						crossOrigin='anonymous'
					/>
					<link
						rel='preload'
						href='/fonts/SpaceMono-Regular.ttf'
						as='font'
						type='font/ttf'
						crossOrigin='anonymous'
					/>
				</Head>
				<body className='font-spaceMono'>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
