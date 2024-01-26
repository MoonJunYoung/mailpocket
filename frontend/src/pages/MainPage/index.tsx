import { Link } from 'react-router-dom';



const MainPage = () => {

  return (
    <div className='bg-white flex flex-col items-center justify-center'>
      <div className="sticky z-1 top-0 flex items-center justify-between border-b-2 border-whitesmoke w-full bg-white ">
        <img className="h-6 m-4 bg-white md:w-[90px] md:mt-[10px] md:ml-[10px] md:h-[20px]"
          src="/images/MailpocketLogo.png"
          alt="Logo"
          onClick={() => (window.location.href = "/")}
        />
      </div>
      <div className='flex items-center justify-center w-[700px] px-[50px] md:w-full md:px-[10px] h-full'>
        <div className='w-full mt-10'>
          <img className='w-[70px] animate-bounce' src="/images/MailpocketSymbol.png" alt="MailpocketSymbol" />
          <h1 className='font-extrabold text-3xl md:text-2xl mt-10'>MailPocket</h1>
          <h1 className='font-extrabold text-2xl md:text-xl mt-8'>메일 포켓을 사용하면 이런 게 좋아요!</h1>
          <div>
            <div className='flex items-center mt-8'>
              <div className='w-5 h-5 md:w-4 md:h-4 bg-customPurple flex items-center justify-center rounded-full'>
                <span className='text-white font-bold'>1</span>
              </div>
              <p className='ml-2 text-xl md:text-base font-extrabold'>매일 쏟아지는 뉴스레터를 다 소화하지 않으셔도 돼요.</p>
            </div>
            <div className='mt-4 font-bold text-base md:text-sm'>
              <p>핵심만 요약해서 보내드릴게요. 재미 있는 내용이라면</p>
              <p>제목의 링크를 통해서 자세한 내용을 확인하세요.</p>
            </div>
          </div>
          <div>
            <div className='flex items-center mt-8'>
              <div className='w-5 h-5 md:w-4 md:h-4 bg-customPurple flex items-center justify-center rounded-xl'>
                <span className='text-white font-bold'>2</span>
              </div>
              <p className='ml-2 text-xl md:text-base font-extrabold'>메일함에 일회성 메일이 쌓이는걸 방지해드릴게요.</p>
            </div>
            <div className='mt-4 font-bold text-base md:text-sm'>
              <p>999+ 이상 메일이 쌓여 있어서 뉴스레터를 놓친적 많으시죠?</p>
              <p>뉴스레터는 메일 포켓이 받고, 슬랙으로 요약해서 슝~🚀 보내드릴게요.</p>
            </div>
          </div>
          <div className='font-semibold mt-14 border border-1 border-white w-full p-2 rounded-lg bg-whitesmoke'>메일포켓을 미리 알아볼까요?</div>
          <div className='mt-8'>
            <h1 className='font-extrabold text-xl'>다양한 뉴스레터가 여러분을 기다리고 있어요!</h1>
            <div className='mt-8 font-bold text-base'>
              <p>메일포켓은 IT, 시사, 제테크를 비롯한 다양한 분야의 뉴스레터를 품고 있어요.</p>
              <p className='mt-4'>여러 주제에서 벌어지고 있는 흥미로운 이야기와 혁신적인 소식들을 하나둘씩</p>
              <p>열어보면 어떨까요?</p>
              <p className='mt-4'>여러분의 궁금증을 해소할 최신 소식과 유용한 정보들이 여기 기다리고 있어요!</p>
            </div>
          </div>
          <div className='mt-8 mb-[100px]'>
            <h1 className='font-extrabold text-xl'>요약된 뉴스소식을 슬랙 채널에서 만나보세요🔥</h1>
            <div className='mt-8 font-bold text-base'>
              <p>메일함에서 벗어나 더 편리한 슬랙 채널에서 정보를 확인하고</p>
              <p>여러분의 의견을 채널에 있는 멤버들과 공유할 수 있어요!</p>
              <p className='mt-4'>MailPocket은 여러 채널을 지원하며 각 주제에 맞는 내용을 정리해서 제공해드려요</p>
              <p>부담 없이 다양한 주제의 뉴스레터를 추가해주세요!</p>
            </div>
          </div>
        </div>
      </div>
      <Link className="flex items-center justify-center fixed bottom-5 cursor-pointer left-0 right-0 mx-auto bg-customPurple w-[88%] max-w-[630px] h-[48px] rounded-md animate-fadeIn z-1  shadow-2xl text-base text-white font-bold" to="/sign-in">메일포켓 이용하기</Link>
    </div>
  );
}

export default MainPage;
