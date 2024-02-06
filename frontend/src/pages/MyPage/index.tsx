import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChannelData, getChannelData, getSubscribeData, Token } from '../../api/api';
import Inquiry from '../../components/ Inquiry';
import { AmplitudeResetUserId, sendEventToAmplitude } from '../../components/Amplitude';
import SlackGuideModal from '../../components/Modal/SlackGuideModal';
import Nav from '../../components/Nav'
import NewsletterPrevie from '../../components/NewsletterPrevie';
import ChannelList from '../../components/ChannelList';
import Symbol from '../../components/Symbol'

export type ChannelDataType = {
  id: number;
  team_name: string;
  team_icon: string;
  name: string;
}


const MyPage = () => {
  const [channel, setChannel] = useState<ChannelDataType[]>([]);
  const [activeTab, setActiveTab] = useState(channel.length);
  const [openModal, setOpenModal] = useState(false);
  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };
  const navigate = useNavigate();
  const authToken = Token();


  useEffect(() => {
    if (!authToken) {
      navigate("/landingpage");
    } else {
      sendEventToAmplitude('view my page', '');
    }
  }, [authToken, navigate]);

  const handleChannelAdd = () => {
    sendEventToAmplitude("click add destination", '')
    window.location.href = "https://slack.com/oauth/v2/authorize?client_id=6427346365504.6466397212374&scope=incoming-webhook,team:read&user_scope=";
  }

  const handleGetChannel = async () => {
    try {
      const response = await getChannelData("/api/channel")
      setChannel(response.data)
      const responesSubscribe = await getSubscribeData("/api/newsletter/subscribe")
      if (responesSubscribe.data.length === 0) {
        navigate("/subscribe");
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  const handleDeleteChannel = async (channelId: number) => {
    try {
      await deleteChannelData(channelId);
      setChannel(channel.filter((data) => data.id !== channelId));
    } catch (error) {
      console.log("Api 데이터 삭제 실패");
    }
  };

  useEffect(() => {
    handleGetChannel()
  }, [])

  const handleLogOut = async () => {
    Cookies.remove('authToken');
    await AmplitudeResetUserId()
    navigate('/sign-in');
  };

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  return (
    <div className='text-center mx-auto max-w-900 h-auto'>
      <div className='flex items-center justify-between'>
        <Nav />
        <div className="cursor-pointer" onClick={handleLogOut}>
          <div className="flex items-center font-bold" onClick={handleLogOut}>
            <span className='mr-4 underline text-customPurple'>로그아웃</span>
          </div>
        </div>
      </div>
      <div className='basecontainer'>
        <Symbol />
        <div className='font-semibold text-sm mt-7 flex w-[330px] md:w-[350px]'>
          <div
            className={`w-full cursor-pointer p-2 border-b-2 border-solid ${activeTab === 0 ? "border-customPurple" : ''}`}
            onClick={() => handleTabClick(0)}
          >
            뉴스레터 미리보기
          </div>
          <div
            className={`w-full cursor-pointer p-2 border-b-2 border-solid ${activeTab === 1 ? "border-customPurple" : ''}`}
            onClick={() => handleTabClick(1)}
          >
            채널 확인하기
          </div>
        </div>
        <div className='bg-white relative channel-container p-7 border border-solid border-gray-100' style={{ boxShadow: '5px 5px 1px whitesmoke' }}>
          {activeTab === 0 ? (
            <NewsletterPrevie
              handleModalOpen={handleModalOpen}
            />
          ) : (
            <ChannelList
              channel={channel}
              handleDeleteChannel={handleDeleteChannel}
              handleChannelAdd={handleChannelAdd}
            />
          )}
        </div>
        {/* {openModal && (
          <SlackGuideModal
            setOpenModal={setOpenModal}
          />
        )} */}
        <Inquiry />
      </div>
    </div >
  )
}

export default MyPage