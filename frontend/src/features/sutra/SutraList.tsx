import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { railsApiUrl } from '@/config/index'
import SutraMdLayout from '@/features/sutra/SutraMdLayout'
import SutraSmLayout from '@/features/sutra/SutraSmLayout'
import SutraXlLayout from '@/features/sutra/SutraXlLayout'
import fetchUserId from '@/features/user/fetchUserId'
import useWindowWidth from '@/hooks/useWindowWidth'
import { SutraListProps } from '@/types/location'

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

const SutraList = ({ sutras, photos }: SutraListProps) => {
  const windowWidth = useWindowWidth()
  const [isSmView, setIsSmView] = useState(false)
  const [isMdView, setIsMdView] = useState(false)

  useEffect(() => {
    if (windowWidth !== null) {
      if (windowWidth <= 640) {
        setIsSmView(true)
        setIsMdView(false)
      } else if (windowWidth > 640 && windowWidth <= 1280) {
        setIsSmView(false)
        setIsMdView(true)
      } else if (windowWidth > 1280) {
        setIsSmView(false)
        setIsMdView(false)
      }
    }
  }, [windowWidth])

  if (isSmView) {
    return (
      <div>
        <SutraSmLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else if (isMdView) {
    return (
      <div>
        <SutraMdLayout sutras={sutras} photos={photos} />
      </div>
    )
  } else {
    return (
      <div>
        <SutraXlLayout sutras={sutras} photos={photos} />
      </div>
    )
  }
}

export default SutraList
