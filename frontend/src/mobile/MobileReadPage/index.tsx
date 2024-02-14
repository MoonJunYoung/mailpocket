import React, { useEffect, useState } from 'react'
import { MobileReadNav } from '../../components/mobileComponent/MobileNav'
import MobileSeeMore from '../../components/mobileComponent/MobileSeeMore'
import MobileSummary from '../../components/mobileComponent/MobileSummary'
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { getReadMailData, Token } from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import { SummaryItem } from '../../pages/SubscribePage';
import PageLoding from '../../components/PageLoding';




export interface readmaildataType {
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


const MobileReadPage = () => {
  const [readmaildata, setReadMailData] = useState<readmaildataType[]>([]);
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
    <div>
      {authToken ? "" : <MobileSeeMore />}
      <MobileReadNav ReadNavNewsLetterData={readmaildata} />
      <MobileSummary summaryNewsLetterData={readmaildata} />
      <div className="mt-5">
        {readmaildata.map((data) => {
          return data.html_body !== null ? (
            <div dangerouslySetInnerHTML={{ __html: data.html_body }} />
          ) : (
            <PageLoding />
          );
        })}
      </div>
    </div>
  )
}

export default MobileReadPage