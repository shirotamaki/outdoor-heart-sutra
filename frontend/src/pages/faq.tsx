import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const Faq = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>FAQ | アウトドア般若心経</title>
        <meta name='description' content='アウトドア般若心経：よくあるご質問（FAQ）' />
        <meta property='og:description' content='アウトドア般若心経：よくあるご質問（FAQ）' />
        <meta name='twitter:description' content='アウトドア般若心経：よくあるご質問（FAQ）' />
      </Head>
      <Header />
      <main className='bg-beige flex flex-grow w-full'>
        <article className='flex flex-col items-center font-kinuta text-gray-500 p-4 w-full'>
          <section className='sm:w-552 w-full mx-auto'>
            <h1 className='text-mainBlack text-lg sm:text-2xl text-center mt-4 mb-8 sm:mt-8 sm:mb-12'>
              よくあるご質問
            </h1>
            <ul>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack  text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>料金はかかりますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>
                    無料でご利用いただけます。ただし、ご利用時にかかるパケット通信料はユーザーのご負担となります。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack  text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>写真はどこに保存されていますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>
                    写真は Amazon 社が提供する
                    <Link
                      href='https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html'
                      legacyBehavior
                    >
                      <a
                        target='_blank'
                        rel='noopener noreferrer'
                        className='hover:opacity-50 transition-all duration-100 underline'
                      >
                        クラウドストレージサービス
                      </a>
                    </Link>
                    に保存されています。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div className=''>写真は他のユーザーに公開されますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>いいえ、他のユーザーには写真は公開されません。</div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div className=''>削除した写真を復元できますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>削除した写真の復元はできません。</div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div className=''>ネイティブアプリ版（iOS, Android）はありますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>いいえ、ありません。</div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>iOS の Chrome ブラウザで使えますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div className=''>
                    iOS の Chrome は写真の登録ができない不具合が確認されています。現状は、iOS の
                    Safari のご利用を推奨しております。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>アプリで簡単に写経（写真経）ができてしまうと意味がないのでは？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div className=''>
                    本アプリは「誰でも簡単に写経（写真経）ができる」というテーマで運用しています。このテーマは、大乗仏教における「すべての人は救われる」という教えを基にしています。簡単にできるからこそ、多くの人々が『アウトドア般若心経』に触れる機会を持てると考えております。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>みうらじゅん氏から許可を得ていますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div className=''>
                    『アウトドア般若心経』には著作権が存在しないことを確認しており、そのため特別な許可は得ておりません。ただし、本アプリはみうらじゅん氏およびその作品に対して、最大限の敬意を払いつつ、開発・運用を行っております。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>退会したいです。</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div className=''>
                    「マイページ」 → 「退会する」 →
                    「アカウントを削除する」から退会ができます。退会後はユーザー情報と登録済みの写真が全て削除されます。
                  </div>
                </p>
              </li>
              <li className='mb-10 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>開発元はどこですか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>開発から運用・保守まで全て個人で行っております。</div>
                </p>
              </li>
              <li className='mb-12 pb-2 border-b border-gray-400'>
                <h2 className='text-mainBlack text-sm sm:text-base mb-3 flex flex-row'>
                  <div className='mr-2'>Q.</div>
                  <div>お問い合わせ先はありますか？</div>
                </h2>
                <p className='text-xs sm:text-sm flex flex-row leading-5 md:leading-6'>
                  <div className='mr-2'>A.</div>
                  <div>下記の窓口までお願いいたします。</div>
                </p>
                <div className='ml-6'>
                  <Image
                    src='/images/email_address.png'
                    alt='Email Adress'
                    width={300}
                    height={24}
                  />
                </div>
              </li>
            </ul>
            <div className='mb-12 text-center'>
              <Link
                data-testid='welcome-page-from-how-to-use-page'
                href='/'
                className='font-kinuta text-gray-500 underline hover:opacity-50 transition-all duration-100'
              >
                トップページに戻る
              </Link>
            </div>
          </section>
        </article>{' '}
      </main>
      <Footer />
    </div>
  )
}

export default Faq
