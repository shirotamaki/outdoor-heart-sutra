import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'
import CapturedImage from '@/features/photo/CapturedImage'
import fetchUserId from '@/features/user/fetchUserId'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  if (session.user && session.user.email) {
    const currentUserId = await fetchUserId(session.user.email)

    if (!currentUserId) {
      return {
        redirect: {
          destination: '/',
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
      redirect: {
        destination: '/',
        permanent: false,
      },
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
  photo_data: string
  user_id: number
  sutra_id: number
}

type SutraListProps = {
  sutras: Sutra[]
  photos: Photo[]
}

const SutraList = ({ sutras, photos }: SutraListProps) => {
  return (
    <div>
      <SutraOrPhoto sutras={sutras} photos={photos} />
    </div>
  )
}

function SutraOrPhoto({ sutras, photos }: { sutras: Sutra[]; photos: Photo[] }) {
  return (
    <div className='vertical-sutra-container'>
      {sutras.map((sutra, index) => {
        const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)
        return (
          <div key={sutra.id}>
            {correspondingPhoto ? (
              <div>
                <Link href={`/sutras/${sutra.id}`}>
                  <CapturedImage
                    capturedImageUrl={correspondingPhoto.photo_data}
                    width={36}
                    height={36}
                    borderRadius='5px'
                  />
                </Link>
              </div>
            ) : (
              <div className='text-4xl'>
                <Link href={`/sutras/${sutra.id}`} className='text-black no-underline'>
                  {sutra.kanji}
                </Link>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default SutraList
