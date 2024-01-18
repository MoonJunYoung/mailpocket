import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getChannelData, Token } from '../../api/api';
import Nav from '../../components/Nav'
import Symbol from '../../components/Symbol'

interface ChannelDataType {
  id: number;
  team_name: string;
  team_icon: string;
  name: string;
}

const MyPage = () => {
  const [channel, setChannel] = useState<ChannelDataType[]>([])
  const navigate = useNavigate();
  const authToken = Token();

  useEffect(() => {
    if (!authToken) {
      navigate("/sign-in");
    }
  }, [authToken, navigate]);

  const handleChannelAdd = () => {
    window.location.href = "https://slack.com/oauth/v2/authorize?client_id=6427346365504.6466397212374&scope=incoming-webhook,team:read&user_scope="
  }

  const handleGetChannel = async () => {
    try {
      const response = await getChannelData("/api/channel")
      setChannel(response.data)
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  useEffect(() => {
    handleGetChannel()
  }, [])


  return (
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer channel-container p-7'>
          <div className='flex flex-col items-start font-bold mb-3'>
            <h2>내 이메일의 소식을</h2>
            <h2>{channel.length}개의 채널에 전달하고 있어요.</h2>
          </div>
          <div className='h-[232px] overflow-auto'>
            {channel.map((channeldata =>
              <div className='flex items-center gap-6' key={channeldata.id}>
                <img className="w-7 h-7 rounded-md" src={channeldata.team_icon} alt="icon" />
                <div className='flex flex-col items-start my-2'>
                  <span className='font-semibold'>{channeldata.name}</span>
                  <span className='text-sm  text-darkgray font-semibold'>{channeldata.team_name} 워크스페이스</span>
                </div>
              </div>
            ))}
          </div>
          <button className='basecontainer-submitdata' onClick={handleChannelAdd}>채널 추가하기</button>
        </div>
      </div>

    </div>
  )
}

export default MyPage