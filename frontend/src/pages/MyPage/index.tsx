import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteChannelData, getChannelData, getSubscribeData, Token } from '../../api/api';
import { AmplitudeResetUserId, sendEventToAmplitude } from '../../components/Amplitude';


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

        {/* {openModal && (
          <SlackGuideModal
            setOpenModal={setOpenModal}
          />
        )} */}

    </div >
  )
}

export default MyPage