
import { useState } from 'react';
import { NavNewsLetterDataType } from '../../mobile/MobileMyPage';
import { SummaryNewsLetterDataType } from '../../pages/ReadPage';
import KakaoShare from '../Shared/KakaoShare'
import UrlShare from '../Shared/UrlShare'


interface SummaryProps {
  summaryNewsLetterData: SummaryNewsLetterDataType[] 

}


const MobileSummary = ({ summaryNewsLetterData }: SummaryProps) => {
  const [newslettemoresee, setNewsLetteMoreSee] = useState(true);
  return (
    <div>
      <div className='flex justify-center gap-5'>
        <div className='border rounded-lg bg-white w-[650px]' style={{ boxShadow: "1px 2px lightgrey" }}>
          <div className='flex items-center justify-between px-2 py-3 border-b'>
            <div className='flex items-center'>
              <img className='w-10 mx-1' src="/images/MailpocketSymbol.png" alt="MailpocketSymbol" />
              <p className='font-extrabold'>메일포켓이 요약한 내용이에요</p>
            </div>
            <div className='flex gap-3'>
              <UrlShare summaryNewsLetterData={summaryNewsLetterData} text={""} containerstyle={"p-2 w-full bg-gray-200 flex gap-1 rounded-lg hover:scale-110 transition-transform"} imgstyle={'w-6'} />
              <KakaoShare summaryNewsLetterData={summaryNewsLetterData} text={""} containerstyle={"share-node py-2 px-2 bg-kakaoBgColor flex items-center justify-center gap-1 rounded-lg cursor-pointer hover:scale-110 transition-transform"} imgstyle={'w-6'} />
            </div>
          </div>
          {summaryNewsLetterData.map((data) => (
            <div key={data.id} className={`p-3 flex flex-col items-start border-b h-[230px] ${newslettemoresee ? 'overflow-y-hidden' : 'overflow-y-auto'} custom-scrollbar`}>
              {data.summary_list ? (
                Object.entries(data.summary_list).map(([key, value]) => (
                  <div className='mt-1' key={key}>
                    <div className='flex flex-col'>
                      <p className='font-extrabold'>{key}</p>
                      <span className='text-sm text-gray-500 font-semibold'>{value}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className='mt-2 text-sm text-gray-500 font-semibold'>요약 데이터가 없습니다</p>
              )}
            </div>
          ))}

          {newslettemoresee ? (
            <div className='p-3 cursor-pointer text-center'><span className='text-lg text-customPurple font-bold' onClick={() => setNewsLetteMoreSee(false)}>펼치기</span></div>
          ) : (
            <div className='p-3 cursor-pointer text-center'><span className='text-lg text-customPurple font-bold' onClick={() => setNewsLetteMoreSee(true)}>닫기</span></div>
          )}
        </div>
      </div>
    </div>
  )

}

export default MobileSummary