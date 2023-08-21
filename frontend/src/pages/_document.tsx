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
          <link rel='preconnect' href='https://fonts.googleapis.com'></link>
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous'></link>
          <link
            href='https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Noto+Serif:wght@100&family=Reggae+One&family=Yuji+Syuku&display=swap'
            rel='stylesheet'
          ></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
