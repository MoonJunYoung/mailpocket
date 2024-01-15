import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubscribeData, Token } from '../../api/api';
import Nav from '../../components/Nav';
import Symbol from '../../components/Symbol';

interface NewsLetterDataType {
  id: string
  name: string
  icon: string
  category: string
}



const Subscribe = () => {
  const [newsletter, setNewsletter] = useState<NewsLetterDataType[]>([])
  const [newslettereconomydata, setNewsletterEconomyData] = useState<NewsLetterDataType[]>([])
  const [newsletteritdata, setNewsletterItData] = useState<NewsLetterDataType[]>([])
  const [newsletterpoliticsdata, setNewsletterPoliticsData] = useState<NewsLetterDataType[]>([])
  const navigate = useNavigate();
  const authToken = Token();


  useEffect(() => {
    const economicItems = newsletter.filter((item) => item.category === "경제")
    setNewsletterEconomyData(economicItems)
  }, [newsletter])

  useEffect(() => {
    const economicItems = newsletter.filter((item) => item.category === "IT")
    setNewsletterItData(economicItems)
  }, [newsletter])

  useEffect(() => {
    const economicItems = newsletter.filter((item) => item.category === "정치")
    setNewsletterPoliticsData(economicItems)
  }, [newsletter])



  useEffect(() => {
    if (!authToken) {
      navigate("/sign-in");
    }
  }, [authToken, navigate]);

  const handleGetNewsLetterData = async () => {
    try {
      const respones = await getSubscribeData("/api/newsletter")
      setNewsletter(respones.data)
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  useEffect(() => {
    handleGetNewsLetterData()
  }, [])



  return (
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='border-white border rounded-lg mt-10 mb-10 bg-white h-full w-[330px] md:w-[350px] p-7'>
          <div className='flex flex-col items-start font-bold mb-3'>
            <h2>뉴스레터를 선택하면</h2>
            <h2>슬랙 채널에 소식을 전달할 수 있어요.</h2>
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-lg  font-medium mb-3 ml-4'># 경제</p>
            <div className='grid grid-cols-4 items-start'>
              {newslettereconomydata.map((data) =>
                <div className='m-1 border-1 border w-[62px] h-[100px] relative' key={data.id}>
                  <input type="checkbox" />
                  <div className='flex flex-col justify-center items-center mt-1'>
                    <img className='w-7 h-7' src={`/images/${data.id}.png`} alt="newslettericon" />
                    <span className='text-xs my-1'>{data.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-lg  font-medium my-3 ml-4'># IT</p>
            <div className='grid grid-cols-4'>
              {newsletteritdata.map((data) =>
                <div className='m-1 border-1 border w-[62px] h-[100px] relative' key={data.id}>
                  <input type="checkbox" />
                  <div className='flex flex-col justify-center items-center mt-1'>
                    <img className='w-7 h-7' src={`/images/${data.id}.png`} alt="newslettericon" />
                    <span className='text-xs my-1'>{data.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className='flex flex-col items-start'>
            <p className='text-lg  font-medium my-3 ml-4'># 정치</p>
            <div className='grid grid-cols-4'>
              {newsletterpoliticsdata.map((data) =>
                <div className='m-1 border-1 border w-[62px] h-[100px] relative' key={data.id}>
                  <input type="checkbox" />
                  <div className='flex flex-col justify-center items-center mt-1'>
                    <img className='w-7 h-7' src={`/images/${data.id}.png`} alt="newslettericon" />
                    <span className='text-xs my-1'>{data.name}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
          <button className='basecontainer-submitdata'>구독하기</button>

        </div>
      </div>
    </div>
  );
}

export default Subscribe