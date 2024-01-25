import { Link } from 'react-router-dom';
import ScrollEvent from '../../components/ScrollEvent';


const MainPage = () => {

  return (
    <div className='px-[80px] font-noto-sans-kr font-ui-sans-serif font-sans md:px-6'>
      <div className="mt-[100px] flex flex-col items-center justify-center">
        <img className='w-[150px] animate-bounce md:w-[100px]' src='/images/MailpocketSymbol.png' alt='symbol' />
        <img className="mt-7 w-[400px] md:w-[250px] md:h-40px]" src="/images/MailpocketLogo.png" alt="Logo" />
      </div>
      <div className='flex flex-col items-start pt-[150px]'>
        <h1 className='mt-[80px] font-bold text-[40px] md:text-[28px] md:mt-[50px] text-maintitle'>메일함의 수많은 뉴스레터들을</h1>
        <h1 className='font-bold text-[40px] md:text-[28px]  text-maintitle'>언제 다 확인하나요?</h1>
        <h1 className='mt-[120px] font-bold text-[40px] md:text-[28px] text-maintitle'>저희가 도와드릴게요!</h1>
      </div>
      <div className='flex flex-col items-start pt-[150px] md:pt-[80px]'>
        <ScrollEvent offset={250} duration={2000} subtitle1='메일 포켓을 사용하면 이런 게 좋아요.' subtitle2='매일 쏟아지는 뉴스레터를' subtitle3='다 소화하지 않으셔도 돼요!' />
        <h1 className='mt-[30px] mb-[200px] font-bold text-[40px] md:text-[23px] md:mb-[150px] text-customPurple'>핵심만 요약해서 보내드릴게요🔥</h1>
        <ScrollEvent offset={700} duration={2000} subtitle1='개인 메일함에 일회성' subtitle2='메일이 쌓이는걸 방지해드릴게요.' subtitle3='' />
        <div className='mt-7'></div>
        <ScrollEvent offset={800} duration={2000} subtitle1='999개+ 메일이 쌓여 있어서' subtitle2='뉴스레터를 놓치신적이 많으신가요?' subtitle3='메일 포켓이 받고 슬랙으로' />
        <h1 className='mt-5 font-bold text-[40px] md:text-[22px] text-customPurple'>요약해서 슝- 보내드릴게요 🚚</h1>
      </div>
      <div className='my-[150px] flex flex-col items-start md:my-[100px]'>
        <h1 className='text-maintitle text-[40px] md:text-[22px] font-bold'>이제<Link className="ml-2 text-[40px] md:text-[22px] underline text-customPurple font-bold" to="/sign-in">메일포켓</Link>을 이용하러 가볼까요?</h1>
      </div>
    </div>
  );
}

export default MainPage;
