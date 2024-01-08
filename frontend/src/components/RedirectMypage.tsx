import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { postSlackToken } from "../api/api";


const RedirectMypage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessCode = queryParams.get("code");


    if (accessCode) {

      const sendAccessToken = async () => {
        try {
          const response = await postSlackToken({ code: accessCode });

          if (response.status === 201) {
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
