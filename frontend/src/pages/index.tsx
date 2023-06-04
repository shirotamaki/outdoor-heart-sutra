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
        }
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
        <div className='bg-gray'>
          <main>
            <div>
              <Image
                src='/images/sample_index.png' // 仮の画像
                alt={'アウトドア般若心経のロゴ'}
                width={300}
                height={150}
              />
            </div>
            <div>
              <p>自分探しならぬ、自分なくしの旅へ</p>
            </div>
            <div>
              <Link href='/about'>アウトドア般若心経とは？</Link>
            </div>
            <div>
              <Login />
            </div>
          </main>
          <Footer />
        </div>
      ) : (
        <div className='bg-gray'>
          <Header />
          <main>
            <SutraList sutras={sutras} photos={photos} />
          </main>
          <Footer />
        </div>
      )}
    </div>
  )
}

export default Home
