import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getSubscribeData, postSubscribe, Token } from '../../api/api';
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
  const [newsletterchecked, setNewsLetterChecked] = useState<string[]>([])
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

  const handlePostNewsLetterData = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (newsletterchecked.length <= 0){
        alert("뉴스레터를 구독해주세요")
      } else {
        const responesPost = await postSubscribe({ ids : newsletterchecked })
        if (responesPost.status === 201) {
          navigate("/");
        }
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패")
    }
  }

  useEffect(() => {
    handleGetNewsLetterData()
  }, [])


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
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='border-white border rounded-lg mt-10 mb-10 bg-white h-full w-[330px] md:w-[350px] p-7'>
          <div className='flex items-start justify-center font-bold mb-3'>
            <h2>소식을 받고싶은 뉴스레터가 있나요?</h2>
          </div>
          <form onSubmit={handlePostNewsLetterData}>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-4'># 경제</p>
              <div className='grid grid-cols-4 items-start'>
                {newslettereconomydata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] h-[40px] rounded-3xl absolute left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                    </label>
                    <div className="flex flex-col items-center">
                      <img className='w-[40px] h-[40px] border border-1 border-cyan-200 rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                      <span className='font-semibold text-xs my-1'>{data.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-4'># IT</p>
              <div className='grid grid-cols-4'>
                {newsletteritdata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] h-[40px] rounded-3xl absolute left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                    </label>
                    <div className="flex flex-col items-center">
                      <img className='w-[40px] h-[40px] border border-1 border-cyan-200 rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                      <span className='font-semibold text-xs my-1'>{data.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className='flex flex-col items-start'>
              <p className='text-medium  font-bold my-3 ml-4'># 정치</p>
              <div className='grid grid-cols-4'>
                {newsletterpoliticsdata.map((data) =>
                  <div className='m-1 relative' key={data.id}>
                    <label>
                      <input type="checkbox" checked={newsletterchecked.includes(data.id)} onChange={() => handleNewsLetterSelected(data.id)} className="appearance-none w-[40px] h-[40px] rounded-3xl absolute left-[12px] top-0 checked:bg-subscribecolor" />
                      {newsletterchecked.includes(data.id) && (
                        <img className='w-5 h-5 absolute left-[22px] top-2' src="/images/checked.png" alt="checked" />
                      )}
                    </label>
                    <div className="flex flex-col items-center">
                      <img className='w-[40px] h-[40px] border border-1 border-cyan-200 rounded-3xl' src={`/images/${data.id}.png`} alt="newslettericon" />
                      <span className='font-semibold text-xs my-1'>{data.name}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button className='basecontainer-submitdata' type="submit">구독하기</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Subscribe