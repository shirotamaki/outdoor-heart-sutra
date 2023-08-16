import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const PrivacyPolicy = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='privacy-policy' />
      <Header />
      <main className='bg-beige flex flex-grow justify-center items-center'>
        <article className='max-w-screen-sm  font-kinuta text-black/50 p-6'>
          <h1 className='text-2xl mb-6 text-black/70'>プライバシーポリシー</h1>
          <p className='mb-6'>
            「アウトドア般若心経」（以下、「本サービス」といいます。）における、ユーザーの個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定めます。
          </p>
          <h2 className='text-xl mb-4 text-black/70'>第1条（個人情報）</h2>
          <p className='mb-6'>
            「個人情報」とは、個人情報保護法にいう「個人情報」を指すものとし、生存する個人に関する情報であって、当該情報に含まれる氏名、生年月日、住所、電話番号、連絡先その他の記述等により特定の個人を識別できる情報及び容貌、指紋、声紋にかかるデータ、及び健康保険証の保険者番号などの当該情報単体から特定の個人を識別できる情報（個人識別情報）を指します。
          </p>
          <h2 className='text-xl mb-4 text-black/70'>第2条（個人情報の収集方法）</h2>
          <p className='mb-6'>
            本サービスは、ユーザーが利用登録をする際にユーザーのGoogleアカウント情報を取得します。
          </p>
          <h2 className='text-xl mb-4 text-black/70'>第3条（個人情報を収集・利用する目的）</h2>
          <p className='mb-6'>本サービスが個人情報を収集・利用する目的は、以下のとおりです。</p>
          <ol className='list-decimal mb-6 px-6'>
            <li>本サービスの提供・運営のため</li>
            <li>ユーザーからのお問い合わせに回答するため（本人確認を行うことを含む）</li>
            <li>メンテナンス、重要なお知らせなど必要に応じたご連絡のため</li>
            <li>
              利用規約に違反したユーザーや、不正・不当な目的でサービスを利用しようとするユーザーの特定をし、ご利用をお断りするため
            </li>
            <li>
              ユーザーにご自身の登録情報の閲覧や変更，削除，ご利用状況の閲覧を行っていただくため
            </li>
            <li>上記の利用目的に付随する目的</li>
          </ol>
          <h2 className='text-xl mb-4 text-black/70'>第4条（利用目的の変更）</h2>
          <ol
            className='list-decimal mb-6
          px-6'
          >
            <li>
              本サービスは、利用目的が変更前と関連性を有すると合理的に認められる場合に限り、個人情報の利用目的を変更するものとします。
            </li>
            <li>
              利用目的の変更を行った場合には、変更後の目的について、本サービス所定の方法によりユーザーに通知し、または本ウェブサイト上に公表するものとします。
            </li>
          </ol>
          <h2 className='text-xl mb-4 text-black/70'>第5条（個人情報の第三者提供）</h2>
          <ol className='list-decimal mb-6 px-6'>
            <li>
              本サービスは、次に掲げる場合を除いて、あらかじめユーザーの同意を得ることなく、第三者に個人情報を提供することはありません。ただし、個人情報保護法その他の法令で認められる場合を除きます。
              <ol className='list-decimal px-6 py-4'>
                <li>
                  人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  公衆衛生の向上または児童の健全な育成の推進のために特に必要がある場合であって、本人の同意を得ることが困難であるとき
                </li>
                <li>
                  国の機関もしくは地方公共団体またはその委託を受けた者が法令の定める事務を遂行することに対して協力する必要がある場合であって、本人の同意を得ることにより当該事務の遂行に支障を及ぼすおそれがあるとき
                </li>
                <li>
                  予め次の事項を告知あるいは公表し、かつ本サービスが個人情報保護委員会に届出をしたとき
                  <ol className='list-decimal px-6 pt-4'>
                    <li>利用目的に第三者への提供を含むこと</li>
                    <li>第三者に提供されるデータの項目</li>
                    <li>第三者への提供の手段または方法</li>
                    <li>本人の求めに応じて個人情報の第三者への提供を停止すること</li>
                    <li>本人の求めを受け付ける方法</li>
                  </ol>
                </li>
              </ol>
            </li>
            <li>
              前項の定めにかかわらず、次に掲げる場合には、当該情報の提供先は第三者に該当しないものとします。
              <ol className='list-decimal px-6 pt-4'>
                <li>
                  本サービスが利用目的の達成に必要な範囲内において個人情報の取扱いの全部または一部を委託する場合
                </li>
                <li>合併その他の事由による事業の承継に伴って個人情報が提供される場合</li>
                <li>
                  個人情報を特定の者との間で共同して利用する場合であって、その旨並びに共同して利用される個人情報の項目、共同して利用する者の範囲、利用する者の利用目的および当該個人情報の管理について責任を有する者の氏名または名称について、あらかじめ本人に通知し、または本人が容易に知り得る状態に置いた場合
                </li>
              </ol>
            </li>
          </ol>
          <h2 className='text-xl mb-4 text-black/70'>第6条（退会時）</h2>
          <p className='mb-6'>
            ユーザーが本サービスの退会手続きを行った場合、本サービスはユーザーの個人情報を全て削除します。
          </p>
          <h2 className='text-xl mb-4 text-black/70'>第7条（プライバシーポリシーの変更）</h2>
          <ol className='list-decimal mb-6 px-6'>
            <li>
              本ポリシーの内容は、法令その他本ポリシーに別段の定めのある事項を除いて、ユーザーに通知することなく、変更することができるものとします。
            </li>
            <li>
              本サービスが別途定める場合を除いて、変更後のプライバシーポリシーは、本ウェブサイトに掲載したときから効力を生じるものとします。
            </li>
          </ol>
          <h2
            className='text-xl mb-4
          text-black/70'
          >
            第8条（お問い合わせ窓口）
          </h2>
          <p className='mb-1'>本ポリシーに関するお問い合わせは，下記の窓口までお願いいたします。</p>
          <p className='mb-4 underline'>outdoor.heart.sutra@gmail.com</p>
          <p className='mb-6 text-right'>以上</p>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy
