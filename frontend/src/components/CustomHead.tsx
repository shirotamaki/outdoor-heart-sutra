import Head from 'next/head'
import { CustomHeadProps } from '@/types/types'

const CustomHead = ({
  title = 'title',
  description = 'アウトドア般若心経とは、街の看板から「般若心経」に含まれる文字を写真に収め管理することができるアプリです。',
  ogType = 'article',
  ogUrl = 'https://www.outdoor-heart-sutra.com',
  ogImage = 'https://www.outdoor-heart-sutra.com/images/logo.svg',
  siteName = 'アウトドア般若心経',
  favicon = 'https://www.outdoor-heart-sutra.com/images/favicons/favicon.svg',
  twitterCard = 'summary_large_image',
  twitterImage = 'https://www.outdoor-heart-sutra.com/images/twitter_card.png',
  twitterSite = '@outdoor_heart_sutra',
  appleTouchIcons = [
    { size: '32x32', href: 'https://www.outdoor-heart-sutra.com/images/apple-touch-icon.png' },
    { size: '180x180', href: 'https://www.outdoor-heart-sutra.com/images/apple-touch-icon.png' },
  ],
  canonicalUrl = 'https://www.outdoor-heart-sutra.com',
  lang = 'ja',
  isHomePage = false,
}: CustomHeadProps) => {
  const pageTitle = isHomePage ? siteName : `${title} | ${siteName}`

  return (
    <Head>
      <title>{pageTitle}</title>

      <meta name='description' content={description} />

      <meta property='og:title' content={pageTitle} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content={ogType} />
      <meta property='og:url' content={ogUrl} />
      <meta property='og:image' content={ogImage} />
      <meta property='og:site_name' content={siteName} />
      <meta property='og:locale' content={lang} />

      <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={twitterImage} />
      <meta name='twitter:site' content={twitterSite} />

      <link rel='icon' type='image/png' sizes='16x16' href={favicon} />
      <link rel='icon' type='image/png' sizes='32x32' href={favicon} />

      {appleTouchIcons.map(({ size, href }) => (
        <link key={size} rel='apple-touch-icon' sizes={size} href={href} />
      ))}

      <link rel='canonical' href={canonicalUrl} />
    </Head>
  )
}

export default CustomHead
