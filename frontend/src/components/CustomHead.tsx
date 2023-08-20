import Head from 'next/head'
import { CustomHeadProps } from '@/types/types'

const CustomHead = ({
  title = 'title',
  description = 'description',
  ogType = 'article',
  ogUrl = 'https://www.outdoor-heart-sutra.com',
  ogImage = '/images/logo_main.png',
  siteName = 'アウトドア般若心経',
  favicon = '/images/favicons/favicon_a.png',
  twitterCard = 'summary_large_image',
  twitterSite = '@outdoor_heart_sutra',
  appleTouchIcons = [
    { size: '32x32', href: '/images/favicons/apple-touch-icon_square_a.png' },
    { size: '180x180', href: '/images/favicons/apple-touch-icon_square_a.png' },
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

      {/* <meta name='twitter:card' content={twitterCard} />
      <meta name='twitter:title' content={pageTitle} />
      <meta name='twitter:description' content={description} />
      <meta name='twitter:image' content={ogImage} />
      <meta name='twitter:site' content={twitterSite} /> */}

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
