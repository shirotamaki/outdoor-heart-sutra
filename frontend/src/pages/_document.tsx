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

          {/* TwitterCard */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='アウトドア般若心経' />
          <meta
            name='twitter:description'
            content='アウトドア般若心経とは、街の看板から「般若心経」に含まれる文字を写真に収め管理することができるアプリです。'
          />
          <meta name='twitter:image' content='/images/logo_main.png' />
          <meta name='twitter:site' content='@outdoor_heart_sutra' />
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
