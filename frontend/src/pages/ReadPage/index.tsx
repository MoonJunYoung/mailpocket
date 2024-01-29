import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getReadMailData } from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import Nav from "../../components/Nav";
import PageLoding from "../../components/PageLoding";

const ReadPage = () => {
  const [readmaildata, setReadMailData] = useState(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mail = searchParams.get("mail");

  const handleGetData = async () => {
    try {
      const response = await getReadMailData(mail);
      setReadMailData(response.data.html_body);
      sendEventToAmplitude("view article detail", { "article name": response.data.from_name, "post name": response.data.subject })
    } catch (error) {
      console.log("Api 데이터 불러오기 실패", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [location]);

  return (
    <div>
      <div className="flex  items-center justify-between">
        <Nav />
        <div className="flex md:flex-col md:items-end md:mr-2">
          <span className="text-sm font-semibold">뉴스레터 요약을 슬랙으로 받아보실래요?</span>
          <Link className="text-sm underline ml-2 text-customPurple" to="/landingpage">메일포켓 알아보기</Link>
        </div>
      </div>
      <div className="flex  items-center justify-center">
        {readmaildata !== null ? (
          <div dangerouslySetInnerHTML={{ __html: readmaildata }} />
        ) : (
          <PageLoding />
        )}
      </div>

    </div>
  );
}

export default ReadPage;
