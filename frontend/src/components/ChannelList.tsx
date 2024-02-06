import { Link } from 'react-router-dom';
import { ChannelDataType } from '../pages/MyPage';

interface ChannelList {
  channel: ChannelDataType[]
  handleDeleteChannel: (channelId: number) => Promise<void>
  handleChannelAdd: () => void
}


const ChannelList = ({ channel, handleDeleteChannel, handleChannelAdd }: ChannelList) => {
  return (
    <div>
      <div className="flex flex-col items-start font-bold mb-3">
        <div className="flex">
          <Link className="underline text-customPurple" to="/subscribe">뉴스레터</Link>
          <h2>의 소식을</h2>
        </div>
        <h2>{channel.length}개의 채널에 전달하고 있어요.</h2>
      </div>
      <div className="h-[232px] overflow-auto">
        {channel.map((channeldata) => (
          <div className="flex items-center justify-between" key={channeldata.id}>
            <div className="flex items-center gap-6">
              <img className="w-7 h-7 rounded-md" src={channeldata.team_icon} alt="icon" />
              <div className="flex flex-col items-start my-2">
                <span className="font-semibold">{channeldata.name}</span>
                <span className="text-sm text-darkgray font-semibold">{channeldata.team_name} 워크스페이스</span>
              </div>
            </div>
            <div className="cursor-pointer mr-7 font-bold" onClick={() => handleDeleteChannel(channeldata.id)}>
              <span>X</span>
            </div>
          </div>
        ))}
      </div>
      <button className='basecontainer-submitdata' onClick={handleChannelAdd}>Slack 채널 추가하기</button>
    </div>
  );
}
export default ChannelList;