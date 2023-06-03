import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
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
    if (input.length <= 256) {
      setNote(input)
    }
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
        cols={46}
      ></textarea>
      <br />
      <button onClick={saveNote}>メモ保存</button>
    </div>
  )
}

export default Note
