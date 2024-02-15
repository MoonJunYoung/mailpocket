import Cookies from 'js-cookie'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNewsLetterDetail, getSubscribeData, Token } from '../../api/api'
import { AmplitudeResetUserId, sendEventToAmplitude } from '../../components/Amplitude'
import { MobileMyPageNav } from '../../components/mobileComponent/MobileNav'
import MobileSeeMore from '../../components/mobileComponent/MobileSeeMore'
import MobileSummary from '../../components/mobileComponent/MobileSummary'
import { NewsLetterDataType } from '../../pages/SubscribePage'


export interface NavNewsLetterDataType {
  id: number,
  name: string,
  category: string,
  mail: null,
  mails: [
    {
      id: number,
      mail_content: null,
      s3_object_key: string,
      subject: string,
      read_link: string,
      summary_list: null,
      newsletter_id: null,
      recv_at: string
    },
  ]
}


const MobileMyPage = () => {
  const [mynewsletter, setMyNewsLetter] = useState<NewsLetterDataType[]>([])
  const [mynewsletterdetail, setMyNewsLetterDetail] = useState<NavNewsLetterDataType[]>([])
  const [selectedItem, setSelectedItem] = useState('');

  const navigate = useNavigate();
  const authToken = Token();


  useEffect(() => {
    if (!authToken) {
      navigate("/landingpage");
    } else {
      sendEventToAmplitude("view my page", "");
    }
  }, [authToken, navigate]);

  const handleLogOut = async () => {
    Cookies.remove("authToken");
    await AmplitudeResetUserId();
    navigate("/sign-in");
  };


  const handlegetData = async () => {
    try {
      const responseNewsLetterList = await getSubscribeData('testapi/newsletter?&subscribe_status=subscribed&sort_type=recent');
      setMyNewsLetter(responseNewsLetterList.data);
      const responseNewsLetterDetail = await getNewsLetterDetail(`testapi/newsletter/${responseNewsLetterList.data[0].id}/mail`)
      setMyNewsLetterDetail([responseNewsLetterDetail.data])
    } catch (error) {
      console.log("Api 데이터 불러오기 실패", error);
    }
  }

  useEffect(() => {
    handlegetData()
  }, []);

  return (
    <div>
      <MobileMyPageNav MayPageNavNewsLetterData={mynewsletterdetail} mynewsletter={mynewsletter} onSelectItem={setSelectedItem} />
      {/* <MobileSummary /> */}
    </div>
  )
}

export default MobileMyPage