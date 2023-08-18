import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import fetchPhotoId from '@/features/photo/fetchPhotoId'
import SutraDetailsMdLayout from '@/features/sutra/SutraDetailsMdLayout'
import SutraDetailsOverMdLayout from '@/features/sutra/SutraDetailsOverMdLayout'
import fetchUserId from '@/features/user/fetchUserId'
import { SutraDetailsProps } from '@/types/types'

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  try {
    const sutraResponse = await axios.get(`${railsApiUrl}/api/v1/sutras/${id}`)
    const sutra = sutraResponse.data
    const currentSutraId = sutra.id

    if (session.user && session.user.email) {
      const currentUserId = await fetchUserId(session.user.email)

      if (currentUserId !== null) {
        const photo_id = await fetchPhotoId(currentSutraId, currentUserId)

        let photo = { image_url: null }

        if (photo_id !== null) {
          const photoResponse = await axios.get(`${railsApiUrl}/api/v1/photos/${photo_id}`)
          photo = photoResponse.data
        }
        return {
          props: {
            sutra,
            photo,
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching data:', error.message, error.response)
    } else if (error instanceof Error) {
      console.error('Error fetching data:', error.message)
    } else {
      console.error('Error fetching data:', error)
    }
    return {
      notFound: true,
    }
  }
  return {
    notFound: true,
  }
}

const SutraDetails = ({ sutra, photo }: SutraDetailsProps) => {
  return (
    <div className='flex flex-col min-h-screen bg-beige'>
      <CustomHead
        title='詳細'
        description='写経した文字の詳細情報になります。'
        ogUrl='https://www.outdoor-heart-sutra.com/sutras/[id]'
      />
      <Header />
      <main className='mx-auto my-12 flex-grow'>
        {photo.image_url === null ? (
          <div>
            <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} sutra={sutra} />
          </div>
        ) : (
          <div>
            <div className='md:hidden'>
              <SutraDetailsMdLayout sutra={sutra} photo={photo} />
            </div>
            <div className='hidden md:flex'>
              <SutraDetailsOverMdLayout sutra={sutra} photo={photo} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SutraDetails
