import { useEffect } from "react";
import { SummaryNewsLetterDataType } from "../../pages/ReadPage";

type KakaoShareProps = {
  summaryNewsLetterData?: SummaryNewsLetterDataType[];
  text?: string;
  containerstyle: string;
  imgstyle: string;
}

const KakaoShare = ({ summaryNewsLetterData, text, containerstyle, imgstyle }: KakaoShareProps) => {
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

  function byteCount(s: string): number {
    return encodeURI(s).split(/%..|./).length - 1;
  }

  const shareKakaoLink = () => {
    if (summaryNewsLetterData && summaryNewsLetterData.length > 0) {
      const firstNewsLetter = summaryNewsLetterData[0];
      const firstNewsLetterLink = firstNewsLetter.read_link;
      const fullText = summaryNewsLetterData.map(data => data.share_text).join('\n\n');
      let textToSend = fullText;

      if (byteCount(fullText) > 1100) {
        let bytes = 0;
        let index = 0;
        while (bytes <= 1100 && index < fullText.length) {
          bytes += encodeURIComponent(fullText[index]).split(/%..|./).length - 1;
          index++;
        }
        textToSend = fullText.slice(0, index) + '...';
      }
      //@ts-ignore
      window.Kakao.Link.sendDefault({
        objectType: "text",
        text: `${firstNewsLetter.from_name}의 뉴스레터 요약 결과입니다.\n\n${textToSend}`,
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
