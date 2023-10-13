import Script from 'next/script'
import { FC } from 'react'

const ANALYTICS_ID = process.env.NEXT_PUBLIC_ANALYTICS_ID

/** Google Analytics によるアクセス解析を行うためのコンポーネント */
export const Analytics: FC = () => {
  if (process.env.NODE_ENV !== 'production') {
    // 開発サーバー上での実行 (next dev) では何も出力しない
    return <></>
  }

  if (!ANALYTICS_ID) {
    console.warn('NEXT_PUBLIC_ANALYTICS_ID not defined')
    return <></>
  }

  return (
    <>
      {/* <!-- Google tag (gtag.js) --> */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_ID}`}
        strategy='afterInteractive'
      />
      <Script id='google-analytics' strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${ANALYTICS_ID}');
        `}
      </Script>
    </>
  )
}
