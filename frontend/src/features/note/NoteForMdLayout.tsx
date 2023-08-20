import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ActionButton from '@/components/ActionButton'
import { railsApiUrl } from '@/config/index'
import { NoteProps } from '@/types/types'

const NoteForMdLayout = ({ photoId, sutraId, photoNote, setEditNote, rows, cols }: NoteProps) => {
  const [note, setNote] = useState<string>(photoNote || '')

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length > 100) {
      toast.warning('メモは100文字を超えることはできません')
      return
    }
    setNote(input)
  }

  const saveNote = async () => {
    let success = false

    if (!note) {
      console.error('メモが空です')
      toast.warning('メモが空です')
      return
    }
    try {
      const response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
        noteData: note,
      })
      console.log('メモが保存されました:', note)
      toast.success('メモが保存されました')
      success = true
      setEditNote(false)
    } catch (error) {
      console.error('メモの保存に失敗しました:', error)
      toast.error('メモの保存に失敗しました')
    }
    if (success) {
      await router.push(`/sutras/${sutraId}`)
    }
  }

  return (
    <div>
      <textarea
        data-testid='note-textarea-for-md-layout'
        value={note}
        onChange={handleChange}
        placeholder={note ? note : 'メモを入力してください'}
        rows={rows}
        cols={cols}
        className='block p-2.5 w-full h-32 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500'
      ></textarea>
      <div className='flex justify-around'>
        <div
          data-testid='save-note-button-for-md-layout'
          className=' bg-blue-500 hover:bg-blue-400 text-white rounded-full font-notoSans text-xs  ml-auto  my-2 px-2 py-1'
        >
          <ActionButton onClick={saveNote} text='メモ保存' />
        </div>
      </div>
    </div>
  )
}

export default NoteForMdLayout
