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
      </Head>
      <Header />
      <main className='bg-beige flex flex-grow w-full'>
        <article className='flex flex-col items-center font-kinuta text-mainBlack p-4 w-full'>
          <section className='sm:w-552 w-full mx-auto'>
            <h1 className='text-lg sm:text-2xl text-center mt-4 mb-8 sm:m-8'>よくある質問</h1>
            <ul>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>Q. 利用料金はかかりますか？</h2>
                <p className='text-xs sm:text-sm mb-8'>A. 無料でご利用いただけます</p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>
                  Q. このアプリで撮影した写真はどこに保存されていますか？
                </h2>
                <p className='text-xs sm:text-sm mb-8'>
                  A. Amazon S3 に保存されています（
                  <Link
                    href='https://docs.aws.amazon.com/ja_jp/AmazonS3/latest/userguide/Welcome.html'
                    className='underline hover:opacity-50 transition-all duration-100'
                  >
                    Amazon S3
                  </Link>
                  とは、Amazon 社が提供するクラウドストレージサービスです）
                </p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>
                  Q. このアプリで撮影した写真を他のユーザーに見られることはありますか？
                </h2>
                <p className='text-xs sm:text-sm mb-8'>A. 他のユーザーは写真を閲覧できません</p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>Q. 開発元はどこですか？</h2>
                <p className='text-xs sm:text-sm mb-8'>A. 個人開発のWebアプリになります</p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>
                  Q. みうらじゅん氏に許可を取っていますか？
                </h2>
                <p className='text-xs sm:text-sm mb-8'>
                  A.
                  アウトドア般若心経に著作権はないため許可は頂いておりません。氏に敬意を払いWebアプリとして運用しております
                </p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>
                  Q. ネイティブアプリ（iOS, Android）版はありますか？
                </h2>
                <p className='text-xs sm:text-sm mb-8'>A. ございません</p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>Q. iOS Chrome が使えない</h2>
                <p className='text-xs sm:text-sm mb-8'>
                  A. 写真の登録ができない不具合が確認されています。現状は、iOS
                  Safariのご利用を推奨しております
                </p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>Q. 退会したいです</h2>
                <p className='text-xs sm:text-sm mb-8'>
                  A. 「マイページ」 → 「退会する」 → 「アカウントを削除する」
                  から退会ができます。退会後はユーザー情報と登録済みの写真が全て削除されます
                </p>
              </li>
              <li>
                <h2 className='text-sm sm:text-base mb-3'>Q. お問い合わせ先はありますか？</h2>
                <p className='text-xs sm:text-sm mb-1'>
                  A. お問い合わせは下記の窓口までお願いいたします
                </p>
                <p className='ml-4 mb-6 md:mb-8'>
                  <Image
                    src='/images/email_address.png'
                    alt='Email Adress'
                    width={300}
                    height={24}
                  />
                </p>
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
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Faq
