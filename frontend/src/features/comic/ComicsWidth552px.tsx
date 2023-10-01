import Image from 'next/image'

const ComicsWidth552px = () => {
  return (
    <section className='font-kinuta text-mainBlack'>
      <div className='grid grid-cols-2 gap-6'>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>1. 出家</h2>
          <p className='text-sm'>スマホを持って家を出ましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/walk.svg'
              alt={'chojugiga-walk'}
              width={150}
              height={150}
              className='mt-8'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>2. 無我夢中</h2>
          <p className='text-sm'>街の看板や標識から般若心経に含まれている文字を探しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.svg'
              alt={'chojugiga-look-for-sutra'}
              width={150}
              height={150}
              className='mt-3'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>3. 写経</h2>
          <p className='text-sm'>文字を見つけたら写真を撮りアプリに保存しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.svg'
              alt={'chojugiga-shoot'}
              width={150}
              height={150}
              className='mt-4 ml-4'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>4. 森羅万象</h2>
          <p className='text-sm'>般若心経278文字をコンプリートし悟りの境地に到達しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.svg'
              alt={'chojugiga-mindfulness'}
              width={140}
              height={140}
              className='mt-6'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComicsWidth552px
