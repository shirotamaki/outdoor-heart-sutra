import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'
import AllMaps from '@/features/map/AllMaps'
import fetchUserId from '@/features/user/fetchUserId'

type Photo = {
  id: number
  latitude: number
  longitude: number
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
        destination: '/welcome',
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
    <div>
      <div>
        <Link href='/'>トップページへ</Link>
      </div>
      <AllMaps
        markerLocations={photos.map((photo) => ({ lat: photo.latitude, lng: photo.longitude }))}
      />
    </div>
  )
}

export default Maps
