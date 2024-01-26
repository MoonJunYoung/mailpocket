import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getNewsletterData, getSubscribeData, putSubscribe, Token } from '../../api/api';
import Nav from '../../components/Nav';
import Symbol from '../../components/Symbol';


interface NewsLetterDataType {
  id: string
  name: string
  category: string
}


const Subscribe = () => {
  const [newsletter, setNewsLetter] = useState<NewsLetterDataType[]>([])
  const [newslettersubscribe, setNewsLettersubscribe] = useState<NewsLetterDataType[]>([])
  const [newslettertechnologydata, setNewsLetterTechnologyData] = useState<NewsLetterDataType[]>([])
  const [newsletterlifedata, setNewsLetterLifeData] = useState<NewsLetterDataType[]>([])
  const [newsletterdesigndata, setNewsLetterDesignData] = useState<NewsLetterDataType[]>([])
  const [newsletterhealthdata, setNewsLetterHealthData] = useState<NewsLetterDataType[]>([])
  const [newsletterentertainmentdata, setNewsLetterEntertainmentData] = useState<NewsLetterDataType[]>([])
  const [newsletterzetechdata, setNewsLetterZetechData] = useState<NewsLetterDataType[]>([])
  const [newslettersocietydata, setNewsLetterSocietyData] = useState<NewsLetterDataType[]>([])
  const [newsletterfooddata, setNewsLetterFoodData] = useState<NewsLetterDataType[]>([])
  const [newsletterchecked, setNewsLetterChecked] = useState<string[]>([])
  const navigate = useNavigate();
  const authToken = Token();


  const useFilteredDataEffect = (category: string, setData: React.Dispatch<React.SetStateAction<NewsLetterDataType[]>>) => {
    useEffect(() => {
      const filteredItems = newsletter.filter((item) => item.category === category);
      setData(filteredItems);
    }, [newsletter, category, setData]);
  };

  useFilteredDataEffect("IT/테크", setNewsLetterTechnologyData);
  useFilteredDataEffect("트렌드/라이프", setNewsLetterLifeData);
  useFilteredDataEffect("디자인", setNewsLetterDesignData);
  useFilteredDataEffect("건강/의학", setNewsLetterHealthData);
  useFilteredDataEffect("엔터테이먼트", setNewsLetterEntertainmentData);
  useFilteredDataEffect("비즈/제테크", setNewsLetterZetechData);
  useFilteredDataEffect("시사/사회", setNewsLetterSocietyData);
  useFilteredDataEffect("푸드", setNewsLetterFoodData);



  useEffect(() => {
    if (!authToken) {
      navigate("/sign-in");
    }
  }, [authToken, navigate]);

  const handleGetNewsLetterData = async () => {
    try {
      const responesNewsletter = await getNewsletterData("/api/newsletter")
      setNewsLetter(responesNewsletter.data)
      const responesSubscribe = await getSubscribeData("/api/newsletter/subscribe")
      setNewsLettersubscribe(responesSubscribe.data)
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  const handlePostNewsLetterData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newsletterchecked.length <= 0) {
        alert("뉴스레터를 구독해주세요")
      } else {
        const responesPut = await putSubscribe({ ids: newsletterchecked })
        if (responesPut.status === 201) {
          navigate("/mypage");
        }
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패")
    }
  }

  useEffect(() => {
    handleGetNewsLetterData()
  }, [])

  useEffect(() => {
    handleNewsLetterSubcribeDataRenewal()
  }, [newslettersubscribe])


  const handleNewsLetterSubcribeDataRenewal = () => {
    const newslettersubscribeId = newslettersubscribe.map(item => item.id);
    setNewsLetterChecked([...newslettersubscribeId])
  }

  const handleNewsLetterSelected = (newsletterid: string) => {
    setNewsLetterChecked((prevChecked) => {
      if (prevChecked.includes(newsletterid)) {
        return prevChecked.filter((id) => id !== newsletterid);
      } else {
        return [...prevChecked, newsletterid];
      }
    });
  };


  return (
    <div className='text-center mx-auto max-w-900 h-auto'>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='border border-solid border-gray-100 mt-10 mb-10 bg-white h-[530px] overflow-auto w-[330px] md:w-[350px] p-7  shadow-xl'>
          <div className='flex items-start justify-center font-bold mb-3'>
            <h2>소식을 받고싶은 뉴스레터가 있나요?</h2>
          </div>
          <form onSubmit={handlePostNewsLetterData} className='relative'>
            <div className='flex flex-col items-start'>
              <div className='flex items-center gap-1'>
                <p className='text-medium  font-bold my-3 ml-2'># IT/테크</p>
              </div>
              <div className='grid grid-cols-4 items-start'>
                {newslettertechnologydata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 트렌드/라이프</p>
              <div className='grid grid-cols-4'>
                {newsletterlifedata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 디자인</p>
              <div className='grid grid-cols-4'>
                {newsletterdesigndata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 건강/의학</p>
              <div className='grid grid-cols-4'>
                {newsletterhealthdata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 엔터테이먼트</p>
              <div className='grid grid-cols-4'>
                {newsletterentertainmentdata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 비즈/제테크</p>
              <div className='grid grid-cols-4'>
                {newsletterzetechdata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 시사/사회</p>
              <div className='grid grid-cols-4'>
                {newslettersocietydata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-2'># 푸드</p>
              <div className='grid grid-cols-4'>
                {newsletterfooddata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] cursor-pointer h-[40px] rounded-3xl absolute left-[9px] md:left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[19px] cursor-pointer md:left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                      <div className="flex flex-col items-center">
                        <img className='w-[40px] h-[40px] border border-5 border-lightgrey rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                        <span className='font-semibold text-xs my-1 cursor-pointer'>{data.name}</span>
                      </div>
                    </label>
                  </div>
                )}
              </div>
            </div>
            <div className='sticky top-0 z-[1]'>
              <button className='mt-8 h-[40px] rounded-lg border-none bg-customPurple text-white text-base font-bold w-[275px] md:w-[285px]' type="submit">구독하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe