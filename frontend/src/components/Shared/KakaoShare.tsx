import { useEffect } from "react";
import { SummaryNewsLetterDataType } from "../../pages/ReadPage";

type KakaoShareType = {
  text?: string;
  containerstyle: string;
  imgstyle: string;
  summaryNewsLetterData?: SummaryNewsLetterDataType[];
}

const KakaoShare = ({ summaryNewsLetterData, text, containerstyle, imgstyle }: KakaoShareType) => {
  useEffect(() => {
    initKakao();
  }, []);

  const readLinks = summaryNewsLetterData?.map((data) => data.read_link);

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
        description: `${summaryNewsLetterData?.map((data) => data.from_name)}의 뉴스레터 요약 결과 입니다.`,
        imageUrl: "",
        link: {
          webUrl: readLinks?.join(''),
          mobileWebUrl: readLinks?.join(''),
        },
      },
      buttons: [
        {
          title: "뉴스레터 확인하러가기",
          link: {
            webUrl: readLinks?.join(''),
            mobileWebUrl: readLinks?.join(''),
          },
        },
      ],
    });
  };

  return (
    <div>
      <div className={containerstyle} onClick={shareKakao}>
        <img className={imgstyle} src="/images/kakao.png" alt="카카오톡 공유" />
        <span className="font-extrabold text-sm">{text}</span>
      </div>
    </div>
  );
};

export default KakaoShare;
