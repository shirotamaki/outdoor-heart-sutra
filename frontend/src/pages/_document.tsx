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
            href='https://fonts.googleapis.com/css2?family=Noto+Serif:wght@100&family=Yuji+Syuku&display=swap'
            rel='stylesheet'
          ></link>

          <link rel='icon' type='image/png' sizes='16x16' href='/images/favicons/favicon_a.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/images/favicons/favicon_a.png' />
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='frontend/public/images/favicons/apple-touch-icon_square_a.png'
          />
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
