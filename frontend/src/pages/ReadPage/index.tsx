import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getReadMailData } from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import Nav from "../../components/Nav";
import PageLoding from "../../components/PageLoding";
import Summary from "../../components/Summary";

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
    <div className="bg-white">
      <div className="flex  items-center justify-between border-b p-4">
        <img className="h-6 md:w-[90px] md:mt-[10px] md:ml-[10px] md:h-[20px]"
          src="/images/MailpocketLogo.png"
          alt="Logo"
          onClick={() => (window.location.href = "/landingpage")}
        />
        <div className="flex md:flex-col md:items-end md:mr-2">
          <span className=" text-base font-extrabold">뉴스레터 요약을 슬랙으로 받아보실래요?</span>
          <Link className="font-extrabold text-base underline ml-2 text-customPurple" to="/landingpage">알아보기</Link>
        </div>
        <Link className="font-extrabold mr-4 text-base text-customPurple" to="/sign-in">로그인하기</Link>
      </div>
      <div className="flex flex-col items-center justify-center">
        <Summary />
        <div>
          <div className="border-b mt-[80px]" >
            <p className="text-lg text-gray-500 font-bold mb-3">본문</p>
          </div>
   
        </div>
        {/* {readmaildata !== null ? (
          <div dangerouslySetInnerHTML={{ __html: readmaildata }} />
        ) : (
          <PageLoding />
        )} */}
      </div>

    </div>
  );
}

export default ReadPage;
