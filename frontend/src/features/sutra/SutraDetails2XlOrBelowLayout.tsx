import { useState } from 'react'
import Map from '@/features/map/Map'
import Note from '@/features/note/Note'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhoto from '@/features/photo/DeletePhoto'
import EditPhoto from '@/features/photo/EditPhoto'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import { SutraDetailsProps } from '@/types/types'

const SutraDetails2XlOrBelowLayout = ({ sutra, photo }: SutraDetailsProps) => {
  const currentLocation = {
    lat: photo.latitude,
    lng: photo.longitude,
    img: photo.cropped_image_url,
  }

  const regex = /(\d{4})-(\d{2})-(\d{2}).*/
  const shootingDate = photo.created_at.replace(regex, '$1年$2月$3日')

  const [editNote, setEditNote] = useState(!photo.note)
  const [editMode, setEditMode] = useState(false)

  const rows = 4
  const cols = 38

  const renderNote = () => {
    if (editNote) {
      return (
        <Note
          photoId={photo.id}
          sutraId={sutra.id}
          photoNote={photo.note}
          setEditNote={setEditNote}
          rows={rows}
          cols={cols}
        />
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center'>
          <div className='w-300'>
            <div
              data-testid='saved-note-for-over-md-layout'
              className='text-mainBlack text-sm whitespace-pre-line overflow-hidden break-words mb-12'
            >
              {photo.note}
            </div>
          </div>
          <button
            data-testid='edit-note-button-for-over-md-layout'
            onClick={() => setEditNote(true)}
            className='w-300 border border-blue-600  hover:opacity-50 transition-all duration-100 font-notoSans text-base text-blue-600 font-extrabold rounded-md text-center py-2 mt-4'
          >
            メモ編集
          </button>
        </div>
      )
    }
  }

  const renderSutraDetails = () => {
    if (editMode) {
      return (
        <div>
          <PhotoUploadAndPreview sutraId={sutra.id} photoId={photo.id} sutra={sutra} />
        </div>
      )
    } else {
      return (
        <div className='flex flex-col justify-center items-center lg:max-w-776 sm:max-w-552 max-w-screen-sm mx-auto'>
          <div>
            <CapturedImage
              capturedImageUrl={photo.image_url}
              width={360}
              height={360}
              borderRadius='5px'
            />
          </div>
          <div className='flex flex-row justify-center m-4'>
            <div className='text-5xl text-sutraBlack font-kinuta mx-4'>{sutra.kanji}</div>
            <div className='mx-4 mt-1'>
              <CapturedImage
                capturedImageUrl={photo.cropped_image_url}
                width={48}
                height={48}
                borderRadius='5px'
              />
            </div>
          </div>
          <div className='w-full'>
            <Map markerLocation={currentLocation} width={'100%'} height={480} />
          </div>

          <div className='grid grid-rows-2 grid-cols-4 auto-rows-min font-notoSans text-mainBlack text-sm my-4'>
            <div className='justify-self-end col-span-1' data-testid='photo-address-for-md-layout'>
              住所：
            </div>
            <div className='justify-self-start col-span-3'>{photo.address}</div>
            <div
              className='justify-self-end col-span-1'
              data-testid='photo-shootingDate-for-md-layout'
            >
              撮影日：
            </div>
            <div className='justify-self-start col-span-3'>{shootingDate}</div>
          </div>

          <div className='w-full'>{renderNote()}</div>

          <div className='w-300 flex justify-center mt-8'>
            <EditPhoto setEditMode={setEditMode} />
          </div>
          <div className='w-300 text-right mt-4 mb-8'>
            <DeletePhoto photoId={photo.id} />
          </div>
        </div>
      )
    }
  }

  return renderSutraDetails()
}

export default SutraDetails2XlOrBelowLayout
