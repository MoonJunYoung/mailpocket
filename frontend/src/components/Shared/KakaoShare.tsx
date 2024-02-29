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

  const initKakao = () => {
    //@ts-ignore
    if (!window.Kakao.isInitialized()) {
      //@ts-ignore
      window.Kakao.init("09f25cccf0a9707d66c323f542cbdd41");
    }
  };

  const shareKakaoLink = () => {
    const firstNewsLetterLink = summaryNewsLetterData?.[0].read_link;

    if (firstNewsLetterLink) {
      const fullText = summaryNewsLetterData?.map((data) => data.share_text).join('\n\n');
      let textToSend = fullText;

      if (fullText.length > 900) {
        textToSend = fullText.slice(0, 900) + '...';
        console.log(textToSend)
      }

      //@ts-ignore
      window.Kakao.Link.sendDefault({
        objectType: "text",
        text: `${summaryNewsLetterData?.[0].from_name}의 뉴스레터 요약 결과입니다.\n\n${textToSend}`,
        link: {
          webUrl: firstNewsLetterLink,
          mobileWebUrl: firstNewsLetterLink
        },
      });
    }
  };

  return (
    <div>
      <div className={containerstyle} onClick={shareKakaoLink}>
        <img className={imgstyle} src="/images/kakao.png" alt="카카오톡 공유" />
        <span className="font-extrabold text-sm">{text}</span>
      </div>
    </div>
  );
};

export default KakaoShare;
