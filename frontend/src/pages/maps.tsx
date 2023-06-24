import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import AllMaps from '@/features/map/AllMaps'
import fetchUserId from '@/features/user/fetchUserId'

type Photo = {
  id: number
  latitude: number
  longitude: number
  cropped_image_url: string
  sutra_id: number
}

type MapsProps = {
  photos: Photo[]
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const session = await getSession(context)

  if (!session || !session.user || !session.user.email) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  const currentUserId = await fetchUserId(session.user.email)
  const response = await axios.get(`${railsApiUrl}/api/v1/users/${currentUserId}/photos`)
  const photos = response.data

  return {
    props: {
      photos,
    },
  }
}

function Maps({ photos }: MapsProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='全体地図' />
      <Header />
      <main className='flex-grow bg-tetsuguro'>
        <AllMaps
          markerLocations={photos.map((photo) => ({
            lat: photo.latitude,
            lng: photo.longitude,
            img: photo.cropped_image_url,
            link: `/sutras/${photo.sutra_id}`,
          }))}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Maps
