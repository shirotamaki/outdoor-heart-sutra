import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import LoadingSpinner from '@/components/LoadingSpinner'
import { railsApiUrl } from '@/config/index'
import Login from '@/features/auth/Login'
import Comics from '@/features/comic/Comics'
import ComicsSmOrBelow from '@/features/comic/ComicsSmOrBelow'
import SutraList from '@/features/sutra/SutraList'
import fetchUserId from '@/features/user/fetchUserId'
import { SutraListProps } from '@/types/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session || !session.user || !session.user.email) {
    return {
      props: {},
    }
  }

  const currentUserId = await fetchUserId(session.user.email)

  if (!currentUserId) {
    return {
      redirect: {
        destination: '/signout',
        permanent: false,
      },
    }
  }

  try {
    const [sutraResponse, photoResponse] = await Promise.all([
      axios.get(`${railsApiUrl}/api/v1/sutras`),
      axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}/photos`),
    ])

    const sutras = sutraResponse.data
    const photos = photoResponse.data

    return {
      props: {
        sutras,
        photos,
      },
    }
  } catch (error) {
    console.error(error)
    return {
      redirect: {
        destination: '/error',
        permanent: false,
      },
    }
  }
}

const Home = ({ sutras, photos }: SutraListProps) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  return (
    <div>
      <Head>
        <title>アウトドア般若心経</title>
      </Head>
      {status !== 'authenticated' ? (
        <div className='flex flex-col min-h-screen'>
          <main className='bg-beige flex-grow'>
            <div className='flex flex-col justify-center items-center p-4'>
              <h1 className='mt-12 mb-2'>
                <Image
                  src='/images/logo.svg'
                  alt={'Outdoor Heart Sutra Main Logo'}
                  width={640}
                  height={180}
                />
              </h1>
              <div className='flex flex-col justify-center items-center'>
                <p className='text-mainBlack font-kinuta text-sm md:text-base mb-10'>
                  自分探しならぬ、自分なくしの旅へ
                </p>
                <Login />
                <div className='text-left mb-4'>
                  <p className='text-xs font-notoSans text-gray-500 my-2 leading-normal'>
                    ※上記ボタンをクリックすることで&nbsp;
                    <Link
                      className='text-xs font-notoSans text-gray-500 underline hover:opacity-50 transition-all duration-100'
                      href='/terms-of-service'
                    >
                      利用規約
                    </Link>
                    <span className='text-xs font-notoSans text-gray-500'>・</span>
                    <Link
                      className='text-xs font-notoSans text-gray-500 underline hover:opacity-50 transition-all duration-100'
                      href='/privacy-policy'
                    >
                      プライバシーポリシー
                    </Link>
                    &nbsp;に同意したものとみなします
                  </p>
                  <p className='text-xs font-notoSans text-gray-500'>※ 無料でご利用いただけます</p>
                </div>
                <div className='w-full sm:w-640 sm:mt-6 sm:mb-10 mt-4 mb-8 text-mainBlack font-kinuta text-left text-sm md:text-base'>
                  <p className='leading-6 md:leading-8'>
                    アウトドア般若心経とは、「般若心経」278文字を、家を出て（これを「出家」と称す）、街の看板から経文に含まれている文字を捜し写真に収める（これを「写経（写真経）」と称す）行為のことを指します。
                  </p>
                  <p className='my-2 leading-6 md:leading-8'>
                    必要なのはスマホとGoogleアカウントのみ。
                  </p>
                  <p className='my-2 leading-6 md:leading-8'>
                    アウトドア般若心経を通して般若心経の真髄を感じてください。
                  </p>
                </div>
              </div>
              <div className='sm:hidden mb-10'>
                <ComicsSmOrBelow />
              </div>
              <div className='hidden sm:flex mb-12'>
                <Comics />
              </div>
              <div className='mb-12'>
                <Link
                  data-testid='how-to-use-link'
                  href='/how-to-use'
                  className='font-notoSans text-gray-500 underline hover:opacity-50 transition-all duration-100'
                >
                  使い方
                </Link>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='bg-beige flex-grow flex justify-center'>
            <SutraList sutras={sutras} photos={photos} />
          </main>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Home
