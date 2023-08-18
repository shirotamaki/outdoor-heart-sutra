import { NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'

const ErrorPage: NextPage = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead
        title='エラー'
        description='エラーページです。トップページに戻りやり直してください。'
        ogUrl='https://www.outdoor-heart-sutra.com/error'
      />
      <main className='bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center my-48'>
          <h1 className='text-black/75 text-8xl font-notoSans mb-4'>404</h1>
          <Image
            src='/images/buddha_nehanbotoke_daibutsu.png'
            alt={'涅槃像_いらすとや'}
            width={360}
            height={360}
          />
          <p className='text-black/75 text-base font-notoSans hover:opacity-50 no-underline hover:underline'>
            <Link href='/'>トップページに戻る</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ErrorPage
