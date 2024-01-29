import { AxiosHeaders } from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSlackToken, postSlackToken } from "../api/api";
import { sendEventToAmplitude } from "./Amplitude";



const RedirectMypage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessCode = queryParams.get("code");


    if (accessCode) {

      const sendAccessToken = async () => {
        try {
          const response = await postSlackToken({ code: accessCode });
          const responseHeaders = (response.headers as AxiosHeaders).get?.("Location");
          if (response.status === 201) {
            const responseAmplitudeData = await getSlackToken(responseHeaders)
            sendEventToAmplitude("complete to add destination", responseAmplitudeData.data)
            navigate("/mypage");
          } else {
            console.log("API 서버로 전송 중 오류가 발생했습니다.");
          }
        } catch (error) {
          console.log("API 데이터 보내기 실패", error);
        }
      };
      sendAccessToken();
    }
  }, []);

  return (
    <div></div>
  );
};

export default RedirectMypage;
