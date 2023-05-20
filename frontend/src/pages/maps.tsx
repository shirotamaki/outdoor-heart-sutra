import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import { railsApiUrl } from '@/config/index'
import AllMaps from '@/features/map/AllMaps'
import fetchUserId from '@/features/user/fetchUserId'

type Photo = {
  id: number
  latitude: number
  longitude: number
  photo_data: string
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
    <>
      <Head>
        <title>アウトドア般若心経 | 全体地図</title>
      </Head>
      <div>
        <Link href='/'>トップページ</Link>
      </div>
      <AllMaps
        markerLocations={photos.map((photo) => ({ lat: photo.latitude, lng: photo.longitude, img: photo.photo_data, link: `/sutras/${photo.sutra_id}` }))}
      />
    </>
  )
}

export default Maps
