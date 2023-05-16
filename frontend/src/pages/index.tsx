import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'
import CapturedImage from '@/features/photo/CapturedImage'
import fetchUserId from '@/features/user/fetchUserId'

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
  photo_data: string
}

type HomeProps = {
  sutras: Sutra[]
  photos: Photo[]
}

export default function Home({ sutras, photos }: HomeProps) {
  return (
    <>
      <Head>
        <title>アウトドア般若心経 | Top</title>
      </Head>
      <div>
        <Link href='/welcome'>welcome</Link>
      </div>
      <div>
        <Link href='/maps'>全体地図</Link>
      </div>
      <div>
        <div>
          <h1>アウトドア般若心経</h1>
          <p>自分探しならぬ、自分なくしの旅へ</p>
        </div>
        <Sutra sutras={sutras} />
        <PhotoIcon photos={photos} />
      </div>
    </>
  )
}

function Sutra({ sutras }: { sutras: Sutra[] }) {
  return (
    <div>
      {sutras.map((sutra) => (
        <ul key={sutra.id}>
          <li>
            <Link href={`/sutras/${sutra.id}`}>{sutra.kanji}</Link>
          </li>
        </ul>
      ))}
    </div>
  )
}

function PhotoIcon({ photos }: { photos: Photo[] }) {
  return (
    <div>
      {photos.map((photo) => (
        <ul key={photo.id}>
          <li>
            <CapturedImage
              capturedImageUrl={photo.photo_data}
              width={25}
              height={25}
              borderRadius='5px'
            />
          </li>
        </ul>
      ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    }
  }

  if (session.user && session.user.email) {
    const currentUserId = await fetchUserId(session.user.email)
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
  } else {
    return {
      redirect: {
        destination: '/welcome',
        permanent: false,
      },
    }
  }
}
