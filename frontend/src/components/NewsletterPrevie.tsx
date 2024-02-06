import { Link } from 'react-router-dom'

interface NewsletterPrevieType {
  handleModalOpen: () => void
}
type SummaryItem = {
  [key: string]: string;
};

type Data = {
  s3_object_key: string;
  from_name: string;
  from_email: string;
  subject: string;
  read_link: string;
  summary_list: SummaryItem[];
};



const NewsletterPrevie = ({ handleModalOpen }: NewsletterPrevieType) => {
  const data: Data = {
    "s3_object_key": "0027fc10nctd5m3p8v5mdrgp1jmlp0luv51t3ro1",
    "from_name": "미라클레터",
    "from_email": "miraklelab@mk.co.kr",
    "subject": "(광고) 번아웃을 방지하는 법 A to  Z",
    "read_link": "https://mailpocket.site/read?mail=jnpispjhaj1a43109ot9gcv6u89q4ivu5br68mg1&utm_source=slack&utm_medium=bot&utm_campaign=DDTC",
    "summary_list": [
      {
        "토스뱅크 외화통장은 트래블월렛에 얼마나 타격이 될까": "토스뱅크가 환전 수수료를 평생 면제하며 외화통장 출시, 트래블월렛 등에 영향을 줄 것으로 전망됩니다. 이로써 토스뱅크 외화통장은 무료 수수료와 빠른 성장세를 보이며 금융 시장에 영향을 줄 것으로 예상됩니다."
      },
      {
        "명품플랫폼 시장.. 후발주자 젠테가 영업이익 내면서 성장한 이유 4가지": "명품 플랫폼 시장에서 후발주자 젠테가 꾸준한 성장세를 보이며 영업이익을 내는 이유에 대해 분석하고, 명품 플랫폼 시장의 치열한 경쟁 상황과 새로운 풍랑을 예고하고 있습니다."
      },
      {
        "흑자 내는 임팩트 스타트업은 어떻게 돈을 벌고 있을까": "사회 문제를 해결하며 돈을 벌고 있는 임팩트 스타트업들의 사례를 통해 임팩트 스타트업의 매출 성장과 사회적 가치 창출에 대해 알아봅니다."
      },
      {
        "야놀자가 숙박앱이 아닌 글로벌 테크회사를 표방하는 이유": "야놀자가 글로벌 테크회사로의 도약을 모색하는 이유와 야놀자의 업계 위상, 투자시장에서의 평가, 사업성과, 주요 사업군의 성장성, 그리고 리스크 등에 대해 다룹니다."
      },
    ],
  }

  return (
    <div>
      <div className="flex flex-col items-start text-left mb-3">
        <div className="flex font-bold">
          <h2>구독한</h2>
          <Link className="mx-1 underline text-customPurple" to="/subscribe">뉴스레터</Link>
          <h2>중의 가장 최근</h2>
        </div>
        <h2 className='font-bold mb-2'>소식을 미리 요약해 봤어요!</h2>

        <div className="h-[232px] overflow-auto">
          <div className="mt-3  gap-2">
            <p className='font-bold'>{data.from_name}</p>
            <a className='font-bold text-customPurple underline' href={data.read_link} target="_blank">{data.subject} </a>
            {data.summary_list.map((item, index) => (
              <div className='mt-4' key={index}>
                {Object.keys(item).map((key) => (
                  <div className='flex flex-col' key={key}>
                    <p className='font-bold'>{key}</p>
                    <span className='text-sm my-2'>{item[key]}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <button className='w-full mt-3 h-[40px]  border-none bg-customPurple text-white text-base font-bold' onClick={handleModalOpen}>Slack 연동 알아보기</button>
    </div>
  )
}

export default NewsletterPrevie