import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getMyPageNewsLetterDetail,
  getMyPageSubscribeData,
  Token,
} from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import { MobileMyPageNav } from "../../components/mobileComponent/MobileNav";

import MobileSummary from "../../components/mobileComponent/MobileSummary";
import PageLoding from "../../components/PageLoding";
import { NewsLetterDataType, SummaryItem } from "../../pages/SubscribePage";

export interface NavNewsLetterDataType {
  id: number;
  s3_object_key: string;
  subject: string;
  read_link: string;
  summary_list: SummaryItem;
  newsletter_id: number;
  date: string;
  from_name: string;
  from_email: string;
  html_body: string;
}

const MobileMyPage = () => {
  const [mynewsletter, setMyNewsLetter] = useState<NewsLetterDataType[]>([]);
  const [mynewsletterdetail, setMyNewsLetterDetail] = useState<
    NavNewsLetterDataType[]
  >([]);
  const [selectedItem, setSelectedItem] = useState(0);
  const navigate = useNavigate();
  const authToken = Token();

  useEffect(() => {
    if (mynewsletter.length === 0) {
      navigate("/mobileSubscribe");
    } else {
      sendEventToAmplitude("view my page", "");
    }
  }, [mynewsletter]);
  

  useEffect(() => {
    if (!authToken) {
      navigate("/landingpage");
    } else {
      sendEventToAmplitude("view my page", "");
    }
  }, [authToken, navigate]);

  const handlegetData = async () => {
    try {
      const responseNewsLetterList = await getMyPageSubscribeData(
        "testapi/newsletter?&subscribe_status=subscribed&sort_type=recent"
      );
      setMyNewsLetter(responseNewsLetterList.data);
      if (responseNewsLetterList.data.length > 0) {
        const responseNewsLetterDetail = await getMyPageNewsLetterDetail(
          `testapi/newsletter/${
            selectedItem ? selectedItem : responseNewsLetterList.data[0].id
          }/last-mail`
        );
        setMyNewsLetterDetail([responseNewsLetterDetail.data]);
      } else {
        navigate("/mobile/subscribe");
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패", error);
    }
  };

  useEffect(() => {
    handlegetData();
  }, [selectedItem]);

  return (
    <div>
      <MobileMyPageNav
        MayPageNavNewsLetterData={mynewsletterdetail}
        mynewsletter={mynewsletter}
        onSelectItem={setSelectedItem}
        selectItemId={selectedItem}
      />
      <MobileSummary summaryNewsLetterData={mynewsletterdetail} />
      {mynewsletterdetail.map((data) => {
        return data.html_body !== null ? (
          <div
            className="mt-10"
            dangerouslySetInnerHTML={{ __html: data.html_body }}
          />
        ) : (
          <PageLoding />
        );
      })}
    </div>
  );
};

export default MobileMyPage;
