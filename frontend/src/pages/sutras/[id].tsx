import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import { railsApiUrl } from '@/config/index'
import Map from '@/features/map/Map'
import Memo from '@/features/memo/Memo'
import Camera from '@/features/photo/Camera'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhoto from '@/features/photo/DeletePhoto'
import EditPhoto from '@/features/photo/EditPhoto'
import fetchPhotoId from '@/features/photo/fetchPhotoId'
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

type SutraProps = {
  sutra: Sutra
  photo: Photo
}

const SutraDetails = ({ sutra, photo }: SutraProps) => {
  const currentLocation = { lat: photo.latitude, lng: photo.longitude }
  const [editMemo, setEditMemo] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const renderMemo = () => {
    if (editMemo) {
      return (
        <Memo
          photoId={photo.id}
          sutraId={sutra.id}
          photoNote={photo.note}
          setEditMemo={setEditMemo}
        />
      )
    } else {
      return (
        <div>
          <div>メモ：{photo.note}</div>
          <div>
            <button onClick={() => setEditMemo(true)}>メモを編集する</button>
          </div>
        </div>
      )
    }
  }

  const renderPhoto = () => {
    if (editMode) {
      return (
        <div>
          <Camera sutraId={sutra.id} photoId={photo.id} setEditMode={setEditMode} />
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <CapturedImage
              capturedImageUrl={photo.photo_data}
              width={360}
              height={360}
              borderRadius='50px'
            />
          </div>
          <div>
            <Map markerLocation={currentLocation} />
          </div>
          <div>住所：{photo.address}</div>
          <div>{renderMemo()}</div>
          <div>
            <DeletePhoto photoId={photo.id} />
          </div>
          <div>
            <EditPhoto setEditMode={setEditMode} />
          </div>
        </div>
      )
    }
  }

  return (
    <>
      <h1>
        {sutra.id} : {sutra.kanji}
      </h1>
      {photo.photo_data === null ? (
        <div>
          <Camera sutraId={sutra.id} photoId={photo.id} setEditMode={setEditMode} />
        </div>
      ) : (
        renderPhoto()
      )}
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query
  const session = await getSession(context)

  if (!session) {
    return {
      redirect: {
        destination: '/welcome',
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

        let photo = { photo_data: null }

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
          destination: '/welcome',
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

export default SutraDetails
