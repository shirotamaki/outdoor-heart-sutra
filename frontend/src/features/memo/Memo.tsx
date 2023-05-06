import axios from 'axios'
import { useState } from 'react'
import { railsApiUrl } from '@/config/index'

type Props = {
  photoId: number
  savedNote: string
}

const Memo = ({ photoId, savedNote }: Props) => {
  const [memo, setMemo] = useState(savedNote)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length <= 256) {
      setMemo(input)
    }
  }
  const saveMemo = async () => {
    try {
      const response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
        note: memo,
      })
      console.log('メモが保存されました:', memo)
    } catch (error) {
      console.error('メモの保存に失敗しました:', error)
    }
  }

  return (
    <div>
      <textarea
        value={memo}
        onChange={handleChange}
        placeholder={savedNote ? savedNote : 'メモを入力してください'}
        rows={4}
        cols={46}
      ></textarea>
      <br />
      <button onClick={saveMemo}>メモ保存</button>
    </div>
  )
}

export default Memo
