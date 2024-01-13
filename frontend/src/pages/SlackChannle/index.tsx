import { useEffect, useState } from 'react'
import { getChannelData } from '../../api/api'
import Nav from '../../components/Nav'
import Symbol from '../../components/Symbol'


interface getChannleData {
  icon: string,
  name: string,
  id: number
}

const SlackChannle = () => {

  const [channle, setChannle] = useState<getChannleData[]>([])

  const handleMeetingGetData = async () => {
    try {
      const response = await getChannelData('/api/slack');
      setChannle(response.data);
      console.log(channle)
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  }

  useEffect(() => {
    handleMeetingGetData()
  }, [])
  

  return (
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer channel-container'>
          <div>슬랙채널입니다</div>
        </div>
      </div>
    </div>
  )
}

export default SlackChannle