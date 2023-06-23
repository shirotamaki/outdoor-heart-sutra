import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/react'
import { useState } from 'react'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { railsApiUrl } from '@/config/index'
import Map from '@/features/map/Map'
import Note from '@/features/note/Note'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhoto from '@/features/photo/DeletePhoto'
import EditPhoto from '@/features/photo/EditPhoto'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import fetchPhotoId from '@/features/photo/fetchPhotoId'
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
  const currentLocation = {
    lat: photo.latitude,
    lng: photo.longitude,
    img: photo.cropped_image_url,
  }
  const [editNote, setEditNote] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const renderNote = () => {
    if (editNote) {
      return (
        <Note
          photoId={photo.id}
          sutraId={sutra.id}
          photoNote={photo.note}
          setEditNote={setEditNote}
        />
      )
    } else {
      return (
        <div>
          <div>メモ:{photo.note}</div>
          <div>
            <button onClick={() => setEditNote(true)}>メモを編集する</button>
          </div>
        </div>
      )
    }
  }

  const renderSutraDetails = () => {
    if (editMode) {
      return (
        <div>
          <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} />
        </div>
      )
    } else {
      return (
        <div>
          <div>
            <CapturedImage
              capturedImageUrl={photo.image_url}
              width={360}
              height={360}
              borderRadius='5px'
            />
          </div>
          <div>
            <CapturedImage
              capturedImageUrl={photo.cropped_image_url}
              width={100}
              height={100}
              borderRadius='5px'
            />
          </div>
          <div>
            <Map markerLocation={currentLocation} />
          </div>
          <div>住所：{photo.address}</div>
          <div>{renderNote()}</div>
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
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='詳細' />
      <Header />
      <main className='mx-12 my-12 flex-grow'>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-5xl text-black/25 font-kinuta my-12'>{sutra.kanji}</h1>
          {photo.image_url === null ? (
            <div>
              <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} />
            </div>
          ) : (
            renderSutraDetails()
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default SutraDetails
