import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { railsApiUrl } from '@/config/index'

type MemoProps = {
  photoId: number
  sutraId: number
  photoNote: string | null
  setEditMemo: (value: boolean) => void
}

const Memo = ({ photoId, sutraId, photoNote, setEditMemo }: MemoProps) => {
  const [memo, setMemo] = useState<string>(photoNote || '')

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length <= 256) {
      setMemo(input)
    }
  }
  const saveMemo = async () => {
    let success = false

    if (!memo) {
      console.error('メモが空です')
      alert('メモが空です') //最終的にはトーストにする
      return
    }
    try {
      const response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
        memo,
      })
      console.log('メモが保存されました:', memo)
      alert('メモが保存されました') //最終的にはトーストにする
      success = true
      setEditMemo(false) //親コンポーネントに値を渡すことができる
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
        value={memo}
        onChange={handleChange}
        placeholder={memo ? memo : 'メモを入力してください'}
        rows={4}
        cols={46}
      ></textarea>
      <br />
      <button onClick={saveMemo}>メモ保存</button>
    </div>
  )
}

export default Memo
