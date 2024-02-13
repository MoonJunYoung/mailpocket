import React, { useState } from 'react'
import KakaoShare from '../Shared/KakaoShare'
import UrlShare from '../Shared/UrlShare'

const MobileSummary = () => {

  const [newslettemoresee, setNewsLetteMoreSee] = useState(false)
  return (
    <div>
      <div className='flex justify-center gap-5 mt-5'>
        <div className='border rounded-lg bg-white w-[650px]' style={{ boxShadow: "1px 2px lightgrey" }}>
          <div className='flex items-center justify-between px-4 py-3 border-b '>
            <div className='flex items-center gap-2'>
              <img className='w-8' src="/images/MailpocketSymbol.png" alt="MailpocketSymbol" />
              <p className='text-sm font-bold text-gray-500'>메일포켓이 요약한 내용이에요</p>
            </div>
            <div className='flex gap-2'>
              {/* <UrlShare summaryNewsLetterData= containerstyle={"p-1 w-full bg-gray-200 flex rounded-lg"} imgstyle={'w-6'} />
              <KakaoShare containerstyle={"p-1 bg-kakaoBgColor flex items-center justify-center rounded-lg"} imgstyle={'w-7'} /> */}
            </div>
          </div>
          <div className={`1p-3 flex flex-col items-start border-b h-[280px] p-5 ${newslettemoresee ? 'overflow-y-hidden' : 'overflow-y-auto'} custom-scrollbar`}>
            너겟레터의 새로운 소식이 도착했어요.
            :날개_달린_돈:안 들려요? 저PBR주 오르는 소리
            화제의 맛, 너겟 대란
            화제의 맛으로 품절 대란이 일어나고 있는 너겟의 맛에 대한 경제적 영향과 관련 기업들의 실적 발표가 예정되어 있으며, 저PBR·고ROE 기업에 대한 관심이 높아지고 있는데, 이는 정부의 '기업 밸류업 프로그램'과 관련이 있습니다. 이에 대한 투자자들의 의견은 갈리고 있으며, 일본의 경제정책과의 비교도 이뤄지고 있습니다.
            삼성 경영권 승계 재판 결과
            삼성의 경영권 승계 재판에서 이재용 삼성전자 회장이 무죄를 선고받았으며, 이에 따른 삼성의 향후 전략과 M&A 전략에 대한 전망이 제시되고 있습니다.
            건보료, 용산 개발, 금리 인하 관련 소식
            국민건강보험 종합계획 발표와 용산역 정비창 부지 개발, 미국 연준의 기준금리 관련 소식, 그리고 OECD의 우리나라 경제 성장률 전망 등에 대한 다양한 경제 소식이 소개되고 있습니다.

            7:00
            점선면의 새로운 소식이 도착했어요.
            [Lite] :머리에_붕대를_감은_얼굴: 건강이 뭐 대수라고
            뉴스:질병과 함께 춤을 추는 법
            한국은 '건강 중심' 사회로, 아픈 몸에 대한 언어와 공간을 제공하지 않는데, '질병권'을 주장하는 조한진희 대표가 아픈 몸들을 위한 운동을 전개하고 있습니다. 그는 건강을 완벽히 통제할 수 있는 신화를 깨고, 아픈 몸들을 배제하는 사회 구조를 변화시키기 위해 노력하고 있습니다. 또한, 건강에 관한 개인의 노력만으로는 건강해질 수 없는 사회적 모순을 지적하며, 돌봄을 수용하는 사회가 필요하다고 강조하고 있습니다.
          </div>
          {newslettemoresee ? (<div className='p-3 cursor-pointer text-center'><span className='text-lg text-customPurple font-bold' onClick={() => setNewsLetteMoreSee(false)}>펼치기</span></div>
          ) : (<div className='p-3 cursor-pointer text-center'><span className='text-lg text-customPurple font-bold' onClick={() => setNewsLetteMoreSee(true)}>닫기</span></div>
          )}
        </div>

      </div>

    </div>
  )

}

export default MobileSummary