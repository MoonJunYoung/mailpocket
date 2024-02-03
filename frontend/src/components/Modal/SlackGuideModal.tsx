import React, { useRef } from 'react'
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface SlackGuideModalType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  handleChannelAdd: () => void
}

const SlackGuideModal = ({ setOpenModal, handleChannelAdd }: SlackGuideModalType) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useOnClickOutside(ref, () => {
    setOpenModal(false);
  });

  return (
    <div className='z-10 absolute'>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div ref={ref} className="relative flex justify-center flex-row-reverse max-h-400 w-250 bg-white transition-all ease-in-out animate-fadeIn">
          <div className='mt-3 w-full p-4 font-bold flex flex-col items-start'>
            <p>
              공개 채널이 부담스럽다면 채널 검색
            </p>
            <p>
              하단에 다이렉트 메시지를 이용해보세요!
            </p>
            <p>
              설정은 언제든 메일 포켓에서 변경할 수 있어요.
            </p>
            <button className='basecontainer-submitdata mb-3' onClick={handleChannelAdd} >Slack 연동하기</button>
          </div>
          <div className='cursor-pointer  absolute right-2' onClick={() => setOpenModal(false)}>X</div>
        </div>
      </div>
    </div>
  )
}

export default SlackGuideModal