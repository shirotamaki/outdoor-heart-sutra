import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { railsApiUrl } from '@/config/index'

type MemoProps = {
  photoId: number
  sutraId: number
}

const Memo = ({ photoId, sutraId }: MemoProps) => {
  const [memo, setMemo] = useState<string>('')

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length <= 256) {
      setMemo(input)
    }
  }
  const saveMemo = async () => {
    let success = false

    try {
      const response = await axios.patch(`${railsApiUrl}/api/v1/photos/${photoId}`, {
        note: memo,
      })
      console.log('メモが保存されました:', memo)
      success = true
    } catch (error) {
      console.error('メモの保存に失敗しました:', error)
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
        placeholder={'メモを入力してください'}
        rows={4}
        cols={46}
      ></textarea>
      <br />
      <button onClick={saveMemo}>メモ保存</button>
    </div>
  )
}

export default Memo
