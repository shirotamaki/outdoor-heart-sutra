import axios from 'axios'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { railsApiUrl } from '@/config/index'
import Memo from '@/features/memo/Memo'
import Camera from '@/features/photo/Camera'

type Sutra = {
  id: number
  kanji: string
}

type SutraProps = {
  sutra: Sutra
}

const SutraDetail = ({ sutra }: SutraProps) => {
  return (
    <div>
      <h1>
        {sutra.id} : {sutra.kanji}
      </h1>
      <div>
        <Camera sutra_id={sutra.id} />
      </div>
      <div>
        <Memo />
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const { id } = context.query
  const response = await axios.get(`${railsApiUrl}/api/v1/sutras/${id}`)
  const sutra = response.data

  return {
    props: {
      sutra,
    },
  }
}

export default SutraDetail
