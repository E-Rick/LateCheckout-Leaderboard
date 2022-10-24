import Fonts from '@/components/common/Google/Fonts'
import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)
		return { ...initialProps }
	}

	render() {
		return (
			<Html>
				<Head>
					<meta charSet="utf-8" />
					<link rel="shortcut icon" href="/images/favicon.ico" />
					<Fonts />
				</Head>
				<body className="font-spaceMono">
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

export default MyDocument
