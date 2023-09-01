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
        ogImage='https://www.outdoor-heart-sutra.com/images/buddha_nehanbotoke_daibutsu.png'
      />
      <main className='bg-beige flex-grow'>
        <div className='flex flex-col justify-center items-center p-4'>
          <h1 className='text-mainBlack text-7xl md:text-8xl font-notoSans mt-24 md:mt-36 mb-4 md:mb-8 '>404</h1>
          <Image
            src='/images/buddha_nehanbotoke_daibutsu.png'
            alt={'涅槃像_いらすとや'}
            width={340}
            height={240}
          />
          <p className='text-mainBlack text-base font-notoSans hover:opacity-50'>
            <Link href='/'>トップページに戻る</Link>
          </p>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default ErrorPage
