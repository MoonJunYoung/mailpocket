import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getReadMailData, Token } from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import PageLoding from "../../components/PageLoding";
import Summary from "../../components/Summary";
import { SummaryItem } from "../SubscribePage";

export interface SummaryNewsLetterDataType {
  id: number,
  s3_object_key: string,
  subject: string,
  read_link: string,
  summary_list: SummaryItem,
  newsletter_id: number,
  recv_at: null,
  date: string,
  from_name: string,
  from_email: string,
  html_body: string
}


const ReadPage = () => {
  const [readmaildata, setReadMailData] = useState<SummaryNewsLetterDataType[]>([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const mail = searchParams.get("mail");
  const authToken = Token();

  const handleGetData = async () => {
    try {
      const response = await getReadMailData(mail);
      setReadMailData([response.data]);
      sendEventToAmplitude("view article detail", { "article name": response.data.from_name, "post name": response.data.subject });
    } catch (error) {
      console.log("Api 데이터 불러오기 실패", error);
    }
  };

  useEffect(() => {
    handleGetData();
  }, [location]);

  return (
    <div className="bg-white">
      {authToken ? "" : (<div className="flex  items-center justify-between border-b p-4">
        <img className="h-6 md:w-[90px] md:mt-[10px] md:ml-[10px] md:h-[20px]"
          src="/images/MailpocketLogo.png"
          alt="Logo"
          onClick={() => (window.location.href = "/landingpage")}
        />
        <div className="flex md:flex-col md:items-end md:mr-2">
          <span className="text-base font-extrabold">무료 뉴스레터 3줄 요약 서비스 메일 포켓</span>
          <Link className="font-extrabold text-base underline ml-2 text-customPurple" to="/landingpage">알아보기</Link>
        </div>
        <Link className="font-extrabold mr-4 text-base text-customPurple" to="/sign-in">로그인하기</Link>
      </div>)}
      <div className="flex flex-col items-center justify-center pb-[80px]">
        <Summary summaryNewsLetterData={readmaildata} />
        <div className="border-b w-[730px] mt-10">
          <p className="font-bold text-lg p-3 text-gray-500">본문</p>
        </div>
        <div className="mt-2">
          {readmaildata.map((data) => {
            return data.html_body !== null ? (
              <div dangerouslySetInnerHTML={{ __html: data.html_body }} />
            ) : (
              <PageLoding />
            );
          })}
        </div>
        <div className="flex justify-center items-center fixed bottom-0  h-[80px]  mt-10">
          <div className="w-[730px] h-[80px] border-t absolute top-0 bg-white z-10">
            <img className="w-[180px] absolute top-4 right-0 cursor-pointer" src="/images/MailpocketLogo.png" alt="MailpocketLogo" onClick={() => (window.location.href = "/landingpage")} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReadPage;





