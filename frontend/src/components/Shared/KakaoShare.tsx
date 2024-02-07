import { useEffect } from "react";





const KakaoShare = () => {
  useEffect(() => {
    initKakao();
  }, []);

  const initKakao = () => {
    //@ts-ignore
    if (window.Kakao) {
      //@ts-ignore
      const kakao = window.Kakao;
      if (!kakao.isInitialized()) {
        kakao.init("09f25cccf0a9707d66c323f542cbdd41");
      }
    }
  };

  const shareKakao = () => {
    //@ts-ignore
    window.Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: "mailPocket",
        // description: `${.name}의 뉴수레터 요약 결과 입니다.`,
        imageUrl: "",
        link: {
          // webUrl: .share_link,
          // mobileWebUrl: .share_link,
        },
      },
      buttons: [
        {
          title: "뉴스레터 확인하러가기",
          link: {
            // webUrl: .share_link,
            // mobileWebUrl: .share_link,
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className="share-node py-2 px-2 bg-kakaoBgColor flex items-center justify-center gap-1 rounded-lg cursor-pointer hover:scale-110 transition-transform" onClick={shareKakao}>
        <img className="w-6" src="/images/kakao.png" alt="카카오톡 공유" />
        <span className="font-extrabold text-sm" >카카오톡으로 공유하기</span>
      </div>
    </div>
  );
};

export default KakaoShare;
