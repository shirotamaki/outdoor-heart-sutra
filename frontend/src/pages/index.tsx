import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import Login from '@/features/auth/Login'
import SutraList from '@/features/sutra/SutraList'
import fetchUserId from '@/features/user/fetchUserId'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      props: {},
    }
  }

  if (session.user && session.user.email) {
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
      const sutraResponse = await axios.get(`${railsApiUrl}/api/v1/sutras`)
      const sutras = sutraResponse.data

      const photoResponse = await axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}/photos`)
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
  } else {
    return {
      props: {},
    }
  }
}

type Sutra = {
  id: number
  kanji: string
}

type Photo = {
  id: number
  note: string
  address: string
  longitude: number
  latitude: number
  image_url: string
  cropped_image_url: string
  user_id: number
  sutra_id: number
}

type SutraListProps = {
  sutras: Sutra[]
  photos: Photo[]
}

const Home = ({ sutras, photos }: SutraListProps) => {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return (
    <div>
      <CustomHead title='Top' />
      {status !== 'authenticated' ? (
        <div className='flex flex-col min-h-screen'>
          <main className='bg-beige flex-grow'>
            <div className='flex flex-col justify-center items-center'>
              <div className='mt-12'>
                <Image
                  src='/images/logo_main.png'
                  alt={'アウトドア般若心経のロゴ'}
                  width={640}
                  height={200}
                />
              </div>

              <div className='flex flex-col justify-center items-center'>
                <div className='text-left text-lg sm:text-2xl md:text-2xl lg:text-2xl text-black/50 font-kinuta my-4 sm:my-4 md:my-4 lg:my-4 mx-6 sm:mx-12 md:mx-24 max-w-5xl'>
                  <div className='flex flex-col justify-center items-center'>
                    <p className='mb-12'>自分探しならぬ、自分なくしの旅へ ...</p>
                    <Login />
                    <p className='text-sm font-notoSans'>※ 無料でご利用いただけます</p>
                    <div className='mt-4'>
                      <Image
                        src='/images/sample_index.png'
                        alt='Demo Image'
                        width={480}
                        height={270}
                      />
                    </div>
                  </div>
                  <p className='my-4'>
                    アウトドア般若心経とは、「般若心経」278文字を、家を出て（これを「出家」と称す）、街の看板から経文に含まれている文字を捜し写真に収める（これを「写経（写真経）」と称す）行為のことを指します。
                  </p>
                  <p className='my-4'>必要なのはカメラとGoogleアカウントのみ。</p>
                  <p className='my-4'>アウトドア般若心経を通して般若心経の真髄を感じてください。</p>
                </div>
              </div>
            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <div className='flex flex-col min-h-screen'>
          <Header />
          <main className='bg-beige flex-grow'>
            <SutraList sutras={sutras} photos={photos} />
          </main>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Home
