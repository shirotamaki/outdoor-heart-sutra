import Image from 'next/image'

const Comics = () => {
  return (
    <section className='font-kinuta text-mainBlack'>
      <div className='grid grid-cols-2 gap-2'>
        <div className='col-span-1 w-316 h-316 border border-gray-400 rounded p-3'>
          <p>1. 出家</p>
          <p>スマホを持って家を出ましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/walk.svg'
              alt={'chojugiga-walk'}
              width={170}
              height={170}
              className='mt-12'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-3'>
          <p>2. 無我夢中</p>
          <p>街の看板や標識から般若心経に含まれている文字を探しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.svg'
              alt={'chojugiga-look-for-sutra'}
              width={170}
              height={170}
              className='mt-7'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-3'>
          <p>3. 写経</p>
          <p>文字を見つけたら写真を撮りアプリに保存しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.svg'
              alt={'chojugiga-shoot'}
              width={170}
              height={170}
              className='mt-7 ml-4'
            />
          </div>
        </div>
        <div className='w-316 h-316 border border-gray-400 rounded p-3'>
          <p>4. 森羅万象</p>
          <p>般若心経278文字をコンプリートし悟りの境地に到達しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.svg'
              alt={'chojugiga-mindfulness'}
              width={160}
              height={160}
              className='mt-9'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Comics
