import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import fetchPhotoId from '@/features/photo/fetchPhotoId'
import SutraDetails2XlOrBelowLayout from '@/features/sutra/SutraDetails2XlOrBelowLayout'
import SutraDetailsOver2XlLayout from '@/features/sutra/SutraDetailsOver2XlLayout'
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
      <CustomHead title='詳細' ogUrl='https://www.outdoor-heart-sutra.com/sutras/[id]' />
      <Header />
      <main className='p-4 flex-grow'>
        {photo.image_url === null ? (
          <div>
            <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} sutra={sutra} />
          </div>
        ) : (
          <div>
            <div className='2xl:hidden'>
              <SutraDetails2XlOrBelowLayout sutra={sutra} photo={photo} is2XlOrBelow={true} />
            </div>
            <div className='hidden 2xl:flex'>
              <SutraDetailsOver2XlLayout sutra={sutra} photo={photo} is2XlOrBelow={false} />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

export default SutraDetails
