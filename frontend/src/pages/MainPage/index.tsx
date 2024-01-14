import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Token } from '../../api/api';
import Nav from '../../components/Nav'
import Symbol from '../../components/Symbol'



const MyPage = () => {
  const navigate = useNavigate();
  const authToken = Token();

  useEffect(() => {
    if (!authToken) {
      navigate("/sign-in");
    }
  }, [authToken, navigate]);

  const handleChannelAdd = () => {
    window.location.href = "https://slack.com/oauth/v2/authorize?client_id=6427346365504.6407023086387&scope=chat:write,incoming-webhook,team:read&user_scope="
  }

  return (
    <div>
      <Nav />
      <div className='basecontainer'>
        <Symbol />
        <div className='basecontainer-submitcontainer channel-container'>
          <button className='basecontainer-submitdata' onClick={handleChannelAdd}>채널 추가하기</button>
        </div>
      </div>

    </div>
  )
}

export default MyPage