import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';


const MainPage = () => {

  const props1 = useSpring({
    from: { opacity: 0, transform: 'translate(200px)' },
    to: { opacity: 1, transform: 'translate(0)' },
    delay: 200,
  });

  const props2 = useSpring({
    from: { opacity: 0, transform: 'translate(200px)' },
    to: { opacity: 1, transform: 'translate(0)' },
    delay: 500,
  });

  const props3 = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    delay: 900,
  });


  return (
    <div className='px-[80px] font-noto-sans-kr font-ui-sans-serif font-sans md:px-6'>
      <div className="mt-[100px] flex flex-col items-center justify-center">
        <img className='w-[150px] animate-bounce md:w-[100px]' src='/images/MailpocketSymbol.png' alt='symbol' />
        <img className="mt-7 w-[400px] md:w-[250px] md:h-40px]" src="/images/MailpocketLogo.png" alt="Logo" />
      </div>
      <div className='flex flex-col items-start pt-[150px]'>
        <animated.h1 style={props1} className='mt-[80px] font-bold text-[40px] md:text-[22px] md:mt-[50px] text-maintitle '>메일함의 수많은 뉴스레터들을</animated.h1>
        <animated.h1 style={props2} className='font-bold text-[40px] md:text-[22px]  text-maintitle'>언제 다 확인하나요?</animated.h1>
        <animated.h1 style={props3} className='mt-[120px] font-bold text-[40px] md:text-[23px] text-maintitle'>저희가 도와드릴게요!</animated.h1>
      </div>
      <div className='flex flex-col items-start pt-[120px] md:pt-[80px]'>
        <animated.h1 style={props3} className='mt-[80px] font-bold text-[40px] md:text-[23px] text-maintitle '>메일 포켓을 사용하면 이런 게 좋아요.</animated.h1>
        <animated.h1 style={props3} className='mt-[50px] font-bold text-[40px] md:text-[23px] text-maintitle'>매일 쏟아지는 뉴스레터를</animated.h1>
        <animated.h1 style={props3} className='font-bold text-[40px] md:text-[23px] text-maintitle'>다 소화하지 않으셔도 돼요!</animated.h1>
        <animated.h1 style={props3} className='mt-[30px] mb-[200px] font-bold text-[40px] md:text-[23px] md:mb-[150px] text-customPurple'>핵심만 요약해서 보내드릴게요🔥</animated.h1>
        <animated.h1 style={props3} className='font-bold text-[40px] md:text-[23px] text-maintitle'>개인 메일함에 일회성</animated.h1>
        <animated.h1 style={props3} className=' font-bold text-[40px] md:text-[23px] text-maintitle'>999개+ 메일이 쌓여 있어서</animated.h1>
        <animated.h1 style={props3} className='font-bold text-[40px] md:text-[23px] text-maintitle'>뉴스레터를 놓치신적이 많으신가요?</animated.h1>
        <animated.h1 style={props3} className='mt-[50px] font-bold text-[40px] md:text-[23px] text-maintitle'>메일이 쌓이는걸 방지해드릴게요.</animated.h1>
        <animated.h1 style={props3} className='mt-[50px] font-bold text-[40px] md:text-[23px] text-maintitle'>뉴스레터는 메일 포켓이 받고 슬랙으로</animated.h1>
        <animated.h1 style={props3} className='font-bold text-[40px] md:text-[22px] text-customPurple'>요약해서 슝- 보내드릴게요 🚚</animated.h1>
      </div>
      <div className='my-[150px] flex flex-col items-start md:my-[100px]'>
        <h1 className='text-maintitle text-[40px] md:text-[22px] font-bold'>이제<Link className="ml-2 text-[40px] md:text-[22px] underline text-customPurple font-bold" to="/sign-in">메일포켓</Link>을 이용하러 가볼까요?</h1>
      </div>
    </div>
  );
}

export default MainPage;
