


const UrlShare = () => {
  const getApiDataCopy = async () => {
    try {
      // await navigator.clipboard.writeText();
      alert("텍스트가 클립보드에 복사되었습니다.");
    } catch (error) {
      console.error("클립보드 복사 실패");
    }
  };

  // const getApiDataShare = async () => {
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         // text: meetingName.share_link,
  //       });
  //     } else {
  //       alert(
  //         "Web Share API를 지원하지 않는 브라우저이므로 텍스트를 복사합니다."
  //       );
  //       getApiDataCopy();
  //     }
  //   } catch (error) {
  //     console.error("공유 API 호출 실패");
  //   }
  // };

 
  return (
    <div>
        <div className="p-2 w-full bg-gray-200 flex gap-1 rounded-lg hover:scale-110 transition-transform">
          <img className="w-5" src="/images/url.svg" alt="url" />
          <button className="font-extrabold text-sm" onClick={getApiDataCopy}>URL 로 공유하기</button>
        </div>
    </div>
  );
};

export default UrlShare;
