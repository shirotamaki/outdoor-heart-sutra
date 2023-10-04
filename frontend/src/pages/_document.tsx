import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
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
          {/* meta description */}
          <meta
            name='description'
            content='アウトドア般若心経とは、全国各地の看板や標識から「般若心経」に含まれる文字を写真に収め管理することができるアプリです。'
          />
          {/* favicon */}
          <link
            rel='icon'
            href='https://www.outdoor-heart-sutra.com/images/favicons/favicon.ico'
            sizes='any'
          />
          <link
            rel='icon'
            type='image/svg+xml'
            href='https://www.outdoor-heart-sutra.com/images/favicons/favicon.svg'
          />
          {/* apple-touch-icon */}
          <link
            rel='apple-touch-icon'
            sizes='180x180'
            href='https://www.outdoor-heart-sutra.com/images/apple-touch-icon.png'
          />
          {/* canonical */}
          <link rel='canonical' href='https://www.outdoor-heart-sutra.com' />
          {/* OGP設定 */}
          <meta property='og:title' content='アウトドア般若心経' />
          <meta
            property='og:description'
            content='アウトドア般若心経とは、全国各地の看板や標識から「般若心経」に含まれる文字を写真に収め管理することができるアプリです。'
          />
          <meta property='og:type' content='website' />
          <meta property='og:url' content='https://www.outdoor-heart-sutra.com' />
          <meta
            property='og:image'
            content='https://www.outdoor-heart-sutra.com/images/og_and_twitter_card.png'
          />
          <meta property='og:site_name' content='アウトドア般若心経' />
          <meta property='og:locale' content='ja' />
          {/* TwitterCard設定 */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta name='twitter:title' content='アウトドア般若心経' />
          <meta
            name='twitter:description'
            content='アウトドア般若心経とは、全国各地の看板や標識から「般若心経」に含まれる文字を写真に収め管理することができるアプリです。'
          />
          <meta
            name='twitter:image'
            content='https://www.outdoor-heart-sutra.com/images/og_and_twitter_card.png'
          />
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
