import { useState } from 'react'
import Map from '@/features/map/Map'
import NoteForOverMdLayout from '@/features/note/NoteForOverMdLayout'
import CapturedImage from '@/features/photo/CapturedImage'
import DeletePhotoForOverMdLayout from '@/features/photo/DeletePhotoForOverMdLayout'
import EditPhotoForOverMdLayout from '@/features/photo/EditPhotoForOverMdLayout'
import PhotoUploadAndPreview from '@/features/photo/PhotoUploadAndPreview'
import { SutraDetailsProps } from '@/types/types'

const SutraDetailsOverMdLayout = ({ sutra, photo }: SutraDetailsProps) => {
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
        <NoteForOverMdLayout
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
        <div className='m-4 flex flex-col justify-center items-center '>
          <div className='w-300 rounded-lg overflow-hidden'>
            <div
              data-testid='saved-note-for-over-md-layout'
              className='mx-2 whitespace-pre-line overflow-hidden break-words border-b-4 border-gray-400'
            >
              {photo.note}
            </div>
          </div>
          <button
            data-testid='edit-note-button-for-over-md-layout'
            onClick={() => setEditNote(true)}
            className=' bg-blue-300 hover:bg-blue-200 text-gray-700 rounded-full font-notoSans  text-sm mx-4 mt-4 px-28 py-2'
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
        <div className='w-full'>
          <div className='flex flex-row'>
            <div className='inline-block'>
              <div className='flex justify-center w-480'>
                <CapturedImage
                  capturedImageUrl={photo.image_url}
                  width={360}
                  height={480}
                  borderRadius='5px'
                />
              </div>
              <div className='m-4 flex justify-center'>
                <div className='text-5xl text-black/25 font-kinuta mx-4'>{sutra.kanji}</div>
                <div className='mx-4 mt-1'>
                  <CapturedImage
                    capturedImageUrl={photo.cropped_image_url}
                    width={48}
                    height={48}
                    borderRadius='5px'
                  />
                </div>
              </div>
              <div className='m-2 flex justify-center'>
                <div className='flex flex-col'>
                  <div data-testid='photo-address-for-over-md-layout'>住所：{photo.address} </div>
                  <div data-testid='photo-shootingDate-for-over-md-layout' className='mt-1'>
                    撮影日：{shootingDate}
                  </div>
                </div>
              </div>
              <div className='flex justify-center'>{renderNote()}</div>
              <div className='flex justify-center'>
                <EditPhotoForOverMdLayout setEditMode={setEditMode} />
              </div>
              <div className='flex justify-center'>
                <DeletePhotoForOverMdLayout photoId={photo.id} />
              </div>
            </div>
            <div className='basis-full'>
              <Map markerLocation={currentLocation} />
            </div>
          </div>
        </div>
      )
    }
  }

  return renderSutraDetails()
}

export default SutraDetailsOverMdLayout
