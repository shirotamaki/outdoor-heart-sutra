import { useState } from 'react'

type Props = {}

const Memo = ({}: Props) => {
  const [memo, setMemo] = useState('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = event.target.value
    if (input.length <= 256) {
      setMemo(input)
    }
  }
  console.log(memo)
  return (
    <div>
      <textarea
        value={memo}
        onChange={handleChange}
        placeholder='メモを入力してください'
        rows={4}
        cols={46}
      ></textarea>
    </div>
  )
}

export default Memo
