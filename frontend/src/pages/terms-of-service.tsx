import Link from 'next/link'
import CustomHead from '@/components/CustomHead'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

const TermsOfService = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <CustomHead title='利用規約' ogUrl='https://www.outdoor-heart-sutra.com/terms-of-service' />
      <Header />
      <main className='bg-beige flex flex-grow justify-center'>
        <article className='lg:max-w-screen-sm max-w-552 font-kinuta text-gray-500 m-4'>
          <h1 className='text-lg md:text-2xl m-4 md:m-8 text-mainBlack text-center'>利用規約</h1>
          <p className='text-sm md:text-base mb-4 md:mb-8'>
            この利用規約（以下、「本規約」といいます。）は、このウェブサイト上で提供するサービス（以下、「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下、「ユーザー」といいます。）には、本規約に従って、本サービスをご利用いただきます。
          </p>
          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第1条（適用）</h2>
          <ol className='text-sm md:text-base list-decimal mb-6 mx-6'>
            <li>
              本規約は、ユーザーと本サービスの利用に関わる一切の関係に適用されるものとします。
            </li>
            <li>
              本サービスに関し、本規約のほか、ご利用にあたってのルール等、各種の定め（以下、「個別規定」といいます。）をすることがあります。これら個別規定はその名称のいかんに関わらず、本規約の一部を構成するものとします。
            </li>
            <li>
              本規約の規定が前条の個別規定の規定と矛盾する場合には、個別規定において特段の定めなき限り、個別規定の規定が優先されるものとします。
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第2条（利用登録）</h2>
          <ol className='text-sm md:text-base list-decimal mb-8 px-6'>
            <li>
              本サービスの利用登録は、登録希望者が本規約に同意の上、本サービスの定める方法により利用登録をすることで完了するものとします。
            </li>
            <li>
              本サービスは、利用登録の申請者に以下の事由があると判断した場合、利用登録の申請を承認しないことがあり、その理由については一切の開示義務を負わないものとします。
              <ol className='text-sm md:text-base list-decimal my-4 px-6'>
                <li>利用登録の申請に際して虚偽の事項を届け出た場合</li>
                <li>本規約に違反したことがある者からの申請である場合</li>
                <li>その他、本サービスが利用登録を相当でないと判断した場合</li>
              </ol>
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第3条（ユーザー情報の管理）</h2>
          <ol className='text-sm md:text-base list-decimal mb-8 mx-6'>
            <li>
              ユーザーは、自己の責任において、本サービスのユーザー情報を適切に管理するものとします。
            </li>
            <li>
              本サービスは、ユーザーIDが登録情報と一致してログインされた場合には、そのユーザーIDを登録しているユーザー自身による利用とみなします。
            </li>
            <li>
              ユーザー情報が第三者によって使用されたことによって生じた損害は、本サービスは一切の責任を負わないものとします。
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第4条（利用料金）</h2>
          <p className='text-sm md:text-base mb-8'>
            ユーザーは、本サービスを無料で利用することができます。本サービス内で利用料金を請求することはありません。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第5条（禁止事項）</h2>
          <p className='text-sm md:text-base mb-4'>
            ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。
          </p>
          <ol className='text-sm md:text-base list-decimal mb-8 mx-6'>
            <li>法令または公序良俗に違反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>
              本サービスの内容等、本サービスに含まれる著作権、商標権ほか知的財産権を侵害する行為
            </li>
            <li>
              本サービス、ほかのユーザー、またはその他第三者のサーバーまたはネットワークの機能を破壊したり、妨害したりする行為
            </li>
            <li>本サービスによって得られた情報を商業的に利用する行為</li>
            <li>本サービスの運営を妨害するおそれのある行為</li>
            <li>不正アクセスをし、またはこれを試みる行為</li>
            <li>他のユーザーに関する個人情報等を収集または蓄積する行為</li>
            <li>不正な目的を持って本サービスを利用する行為</li>
            <li>本サービスの他のユーザーまたはその他の第三者に不利益、損害、不快感を与える行為</li>
            <li>他のユーザーに成りすます行為</li>
            <li>本サービス上での宣伝、広告、勧誘、または営業行為</li>
            <li>面識のない異性との出会いを目的とした行為</li>
            <li>本サービスに関連して、反社会的勢力に対して直接または間接に利益を供与する行為</li>
            <li>その他、本サービスが不適切と判断する行為</li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>
            第6条（本サービスの提供の停止等）
          </h2>
          <ol className='text-sm md:text-base list-decimal mb-8 mx-6'>
            <li>
              本サービスは、以下のいずれかの事由があると判断した場合、ユーザーに事前に通知することなく本サービスの全部または一部の提供を停止または中断することができるものとします。
              <ol className='text-sm md:text-base list-decimal my-4 mx-6'>
                <li>本サービスにかかるコンピュータシステムの保守点検または更新を行う場合</li>
                <li>
                  地震、落雷、火災、停電または天災などの不可抗力により、本サービスの提供が困難となった場合
                </li>
                <li>コンピュータまたは通信回線等が事故により停止した場合</li>
                <li>その他本サービスの提供が困難と判断した場合</li>
              </ol>
            </li>
            <li>
              本サービスの提供の停止または中断により、ユーザーまたは第三者が被ったいかなる不利益または損害についても、一切の責任を負わないものとします。
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>
            第7条（利用制限および登録抹消）
          </h2>
          <ol className='text-sm md:text-base list-decimal mb-8 mx-6'>
            <li>
              本サービスは、ユーザーが以下のいずれかに該当する場合には、事前の通知なく、ユーザーに対して、本サービスの全部もしくは一部の利用を制限し、またはユーザーとしての登録を抹消することができるものとします。
              <ol className='text-sm md:text-base list-decimal my-4 mx-6'>
                <li>本規約のいずれかの条項に違反した場合</li>
                <li>登録事項に虚偽の事実があることが判明した場合</li>
                <li>料金等の支払債務の不履行があった場合</li>
                <li>本サービスからの連絡に対し、一定期間返答がない場合</li>
                <li>本サービスについて、最終の利用から一定期間利用がない場合</li>
                <li>その他、本サービスの利用を適当でないと判断した場合</li>
              </ol>
            </li>
            <li>
              本サービスは、本条に基づき本サービスが行った行為によりユーザーに生じた損害について、一切の責任を負いません。
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第8条（退会）</h2>
          <p className='text-sm md:text-base mb-8'>
            ユーザーは、本サービスの定める退会手続により、本サービスから退会できるものとします。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>
            第9条（保証の否認および免責事項）
          </h2>
          <ol className='text-sm md:text-base list-decimal mb-8 mx-6'>
            <li>
              本サービスは、本サービスに事実上または法律上の瑕疵（安全性、信頼性、正確性、完全性、有効性、特定の目的への適合性、セキュリティなどに関する欠陥、エラーやバグ、権利侵害などを含みます。）がないことを明示的にも黙示的にも保証しておりません。
            </li>
            <li>
              本サービスは、本サービスに起因してユーザーに生じたあらゆる損害について、一切の責任を負いません。ただし、本サービスとユーザーとの間の契約（本規約を含みます。）が消費者契約法に定める消費者契約となる場合、この免責規定は適用されません。
            </li>
            <li>
              前項ただし書に定める場合であっても、本サービスは、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害のうち特別な事情から生じた損害（本サービスまたはユーザーが損害発生につき予見し、または予見し得た場合を含みます。）について一切の責任を負いません。また、本サービスの過失（重過失を除きます。）による債務不履行または不法行為によりユーザーに生じた損害の賠償は、ユーザーから当該損害が発生した月に受領した利用料の額を上限とします。
            </li>
            <li>
              本サービスは、本サービスに関して、ユーザーと他のユーザーまたは第三者との間において生じた取引、連絡または紛争等について一切責任を負いません。
            </li>
          </ol>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>
            第10条（サービス内容の変更等）
          </h2>
          <p className='text-sm md:text-base mb-8'>
            本サービスは、ユーザーへの事前の告知をもって、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第11条（利用規約の変更）</h2>
          <p className='text-sm md:text-base mb-8'>
            本サービスは、必要と判断した場合には、ユーザーに通知することなくいつでも本規約を変更することができるものとします。なお、本規約の変更後、本サービスの利用を開始した場合には、当該ユーザーは変更後の規約に同意したものとみなします。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第12条（個人情報の取扱い）</h2>
          <p className='text-sm md:text-base mb-8'>
            本サービスの利用によって取得する個人情報については、本サービスの「プライバシーポリシー」に従い適切に取り扱うものとします。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第13条（通知または連絡）</h2>
          <p className='text-sm md:text-base mb-8'>
            ユーザーと本サービスとの間の通知または連絡は、本サービスの定める方法によって行うものとします。本サービスは、ユーザーから、本サービスが別途定める方式に従った変更届け出がない限り、現在登録されている連絡先が有効なものとみなして当該連絡先へ通知または連絡を行い、これらは、発信時にユーザーへ到達したものとみなします。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>
            第14条（権利義務の譲渡の禁止）
          </h2>
          <p className='text-sm md:text-base mb-8'>
            ユーザーは、本サービスの書面による事前の承諾なく、利用契約上の地位または本規約に基づく権利もしくは義務を第三者に譲渡し、または担保に供することはできません。
          </p>

          <h2 className='text-base md:text-xl mb-4 text-mainBlack'>第15条（準拠法・裁判管轄）</h2>
          <ol className='text-sm md:text-base list-decimal mx-6 mb-4 md:mb-8'>
            <li>本規約の解釈にあたっては、日本法を準拠法とします。</li>
            <li>
              本サービスに関して紛争が生じた場合には、本サービスの本店所在地を管轄する裁判所を専属的合意管轄とします。
            </li>
          </ol>
          <p className='text-sm md:text-base text-right mb-4 md:mb-8'>以上</p>
          <p className='text-sm md:text-base mb-4 md:mb-8'>
            <Link href='/' className='hover:opacity-50 transition-all duration-100'>
              トップページに戻る
            </Link>
          </p>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default TermsOfService
