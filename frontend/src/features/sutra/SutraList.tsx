import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
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
  image_url: string
  cropped_image_url: string
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
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 50

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sutras.slice(indexOfFirstItem, indexOfLastItem)

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  return (
    <div>
      <div className='vertical-sutras-container flex justify-center'>
        {currentItems.map((sutra) => {
          const correspondingPhoto = photos.find((photo) => photo.sutra_id === sutra.id)

          return (
            <div key={sutra.id}>
              {correspondingPhoto && correspondingPhoto.cropped_image_url ? (
                <div>
                  <Link href={`/sutras/${sutra.id}`}>
                    <CapturedImage
                      capturedImageUrl={correspondingPhoto.cropped_image_url}
                      width={48}
                      height={48}
                      borderRadius='5px'
                      />
                  </Link>
                </div>
              ) : (
                <div className='text-5xl'>
                  <Link href={`/sutras/${sutra.id}`} className='text-black no-underline'>
                    {sutra.kanji}
                  </Link>
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className='flex flex-row-reverse justify-center'>
        {Array.from({ length: 6 }, (_, i) => (
          <button key={i} onClick={() => paginate(i + 1)} className='mx-1 my-1 px-1 py-1'>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SutraList
