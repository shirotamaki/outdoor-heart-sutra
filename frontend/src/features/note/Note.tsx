import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import ActionButton from '@/components/ActionButton'
import { railsApiUrl } from '@/config/index'

type NoteProps = {
  photoId: number
  sutraId: number
  photoNote: string | null
  setEditNote: (value: boolean) => void
}

const Note = ({ photoId, sutraId, photoNote, setEditNote }: NoteProps) => {
  const [note, setNote] = useState<string>(photoNote || '')

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length > 100) {
      alert('メモは100文字を超えることはできません') //最終的にはトーストにする
      return
    }
    setNote(input)
  }

  const cancelNote = async () => {
    setEditNote(false)
    await router.push(`/sutras/${sutraId}`)
  }

  const saveNote = async () => {
    let success = false

    if (!note) {
      console.error('メモが空です')
      alert('メモが空です') //最終的にはトーストにする
      return
    }
    try {
      const response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
        noteData: note,
      })
      console.log('メモが保存されました:', note)
      alert('メモが保存されました') //最終的にはトーストにする
      success = true
      setEditNote(false) //親コンポーネントに値を渡すことができる
    } catch (error) {
      console.error('メモの保存に失敗しました:', error)
      alert('メモの保存に失敗しました') //最終的にはトーストにする
    }
    if (success) {
      await router.push(`/sutras/${sutraId}`)
    }
  }

  return (
    <div>
      <textarea
        value={note}
        onChange={handleChange}
        placeholder={note ? note : 'メモを入力してください'}
        rows={4}
        cols={45}
        className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      ></textarea>
      <div className='flex justify-around'>
        <div className=' bg-gray-400 hover:bg-gray-300 text-white rounded font-notoSans mx-2 my-2 px-2 py-2 text-center'>
          <ActionButton onClick={cancelNote} text='キャンセル' />
        </div>
        <div className=' bg-blue-500 hover:bg-blue-400 text-white rounded font-notoSans mx-2 my-2 px-2 py-2 text-center'>
          <ActionButton onClick={saveNote} text='メモ保存' />
        </div>
      </div>
    </div>
  )
}

export default Note
