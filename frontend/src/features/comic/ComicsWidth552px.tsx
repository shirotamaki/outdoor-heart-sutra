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
              src='/images/chojugiga/walk.png'
              alt={'chojugiga-walk'}
              width={120}
              height={120}
              className='mt-10'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>2. 無我夢中</h2>
          <p className='text-sm'>街の看板や標識から般若心経に含まれている文字を探しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/look-for-sutra.png'
              alt={'chojugiga-look-for-sutra'}
              width={170}
              height={170}
              className='mt-4'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>3. 写経</h2>
          <p className='text-sm'>文字を見つけたら写真を撮りアプリに保存しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/shoot.png'
              alt={'chojugiga-shoot'}
              width={150}
              height={150}
              className='mt-4 mr-2'
            />
          </div>
        </div>
        <div className='bg-comicBackground w-264 h-264 border border-comicBorder rounded p-3'>
          <h2 className='text-lg mb-2'>4. 森羅万象</h2>
          <p className='text-sm'>般若心経278文字をコンプリートし悟りの境地に到達しましょう</p>
          <div className='flex justify-center'>
            <Image
              src='/images/chojugiga/mindfulness.png'
              alt={'chojugiga-mindfulness'}
              width={180}
              height={180}
              className='mt-8'
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ComicsWidth552px
