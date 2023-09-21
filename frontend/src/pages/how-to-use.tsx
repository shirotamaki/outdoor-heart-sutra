import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const HowToUse = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>使い方 | アウトドア般若心経</title>
      </Head>
      <Header />
      <main className='bg-beige flex flex-grow w-full'>
        <article className='flex flex-col items-center font-kinuta text-mainBlack p-4 w-full'>
          <section className='sm:w-552 w-full mx-auto'>
            <h1 className='text-lg sm:text-2xl text-center mt-4 mb-8 sm:m-8'>使い方</h1>
            <div className='mb-12 w-full'>
              <h2 className='text-sm sm:text-base mb-2'>1. Googleアカウントでログインする</h2>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/login.png'
                  alt={'how-to-use-login'}
                  width={300}
                  height={610}
                />
              </div>
            </div>
            <div className='mb-12'>
              <h2 className='text-sm sm:text-base mb-2'>2. 写経する文字を選択する</h2>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/index.png'
                  alt={'how-to-use-index'}
                  width={300}
                  height={610}
                />
              </div>
            </div>
            <div className='mb-12'>
              <h2 className='text-sm sm:text-base mb-2'>3. 撮影または写真をアップロードする</h2>
              <div className='flex justify-center mb-2'>
                <Image
                  src='/images/how-to-use/new.png'
                  alt={'how-to-use-new'}
                  width={300}
                  height={610}
                />
              </div>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/create.png'
                  alt={'how-to-use-create'}
                  width={300}
                  height={610}
                />
              </div>
            </div>
            <div className='mb-12'>
              <h2 className='text-sm sm:text-base mb-2'>4. 写真から文字を切り取る</h2>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/trim.png'
                  alt={'how-to-use-trim'}
                  width={300}
                  height={610}
                />
              </div>
            </div>
            <div className='mb-12'>
              <h2 className='text-sm sm:text-base mb-2'>5. 保存した写真・地図を確認する</h2>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/show.png'
                  alt={'how-to-use-show'}
                  width={300}
                  height={610}
                />
              </div>
            </div>
            <div className='mb-12'>
              <h2 className='text-sm sm:text-base mb-2'>6. メモを登録する（最大140文字）</h2>
              <div className='flex justify-center'>
                <Image
                  src='/images/how-to-use/note.png'
                  alt={'how-to-use-note'}
                  width={300}
                  height={610}
                />
              </div>
            </div>

            <div className='mb-12 text-center'>
              <Link
                data-testid='welcome-page-from-how-to-use-page'
                href='/'
                className='font-notoSans text-gray-500 underline hover:opacity-50 transition-all duration-100'
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

export default HowToUse
