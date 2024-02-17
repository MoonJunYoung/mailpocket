import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { readPageSubscribe, readPageUnSubscribe, Token } from '../../api/api';
import { NavNewsLetterDataType } from '../../mobile/MobileMyPage';
import { SummaryNewsLetterDataType } from '../../pages/ReadPage';
import { NewsLetterDataType } from '../../pages/SubscribePage';
import MobileMenu from '../Modal/MobileMenu';

interface ReadNavNewsLetterDataType {
  ReadNavNewsLetterData: SummaryNewsLetterDataType[]
}

export const MobileReadNav = ({ ReadNavNewsLetterData }: ReadNavNewsLetterDataType) => {
  const authToken = Token();
  const [subscribestatus, setSubscribeStatus] = useState(true)
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  const handleNewsLetterSelected = async (newsletterId: number) => {
    try {
      const response = await readPageSubscribe(newsletterId)
      if (response.status === 201) {
        setSubscribeStatus(false)
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  const handleNewsLetterUnSelected = async (newsletterId: number) => {
    try {
      const response = await readPageUnSubscribe(newsletterId)
      if (response.status === 204) {
        setSubscribeStatus(true)
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }




  return (
    <div>
      {ReadNavNewsLetterData.map((data) => (
        <div key={data.id} className={`bg-white p-3 flex items-center justify-center gap-4 ${authToken ? "" : "mb-4"}`}>
          <div className='flex items-center justify-center gap-3'>
            <img className='w-8' src={`/images/${data.newsletter_id}.png`} alt={String(data.newsletter_id)} />
            <span className='text-sm font-semibold'>{truncate(data.subject, 18)}</span>
          </div>
          {authToken ? (
            subscribestatus ?
              (<span className='p-2 rounded-xl border border-customPurple text-customPurple text-xs font-bold cursor-pointer bg-subscribebutton' onClick={() => handleNewsLetterSelected(data.newsletter_id)}>구독하기</span>)
              :
              (<span className='p-2 rounded-xl  border border-gray-200 bg-gray-200  text-gray-400 cursor-pointer text-xs font-bold' onClick={() => handleNewsLetterUnSelected(data.newsletter_id)}>구독해제</span>)
          ) : (<Link className='text-sm border rounded-2xl py-2 px-3 bg-gray-100 font-semibold text-gray-500' to='/landingpage'>구독하기</Link>
          )
          }
        </div>
      ))
      }
    </div >
  );
}


interface MobileMayPageNavType {
  MayPageNavNewsLetterData: NavNewsLetterDataType[]
  mynewsletter: NewsLetterDataType[]
  onSelectItem: React.Dispatch<React.SetStateAction<string>>;
}



export const MobileMyPageNav = ({ MayPageNavNewsLetterData, mynewsletter, onSelectItem }: MobileMayPageNavType) => {
  const [subscribestatus, setSubscribeStatus] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleNewsLetterSelected = async (newsletterId: number) => {
    try {
      const response = await readPageSubscribe(newsletterId)
      if (response.status === 201) {
        setSubscribeStatus(false)
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  const handleNewsLetterUnSelected = async (newsletterId: number) => {
    try {
      const response = await readPageUnSubscribe(newsletterId)
      if (response.status === 204) {
        setSubscribeStatus(true)
      }
    } catch (error) {
      console.log("Api 데이터 불러오기 실패")
    }
  }

  return (
    <div>
      {MayPageNavNewsLetterData.map((data) => (
        <div key={data.newsletter_id} className='bg-white border-b p-3 flex items-center justify-around gap-4 mb-3'>
          <img className='w-5' src="/images/menu.png" alt="menu" onClick={handleModalOpen} />
          <div className='flex items-center justify-center gap-2'>
            <img className='w-8' src={`/images/${data.newsletter_id}.png`} alt={String(data.newsletter_id)} />
              <span className='text-sm font-semibold'>{truncate(data.subject, 16)}</span>
          </div>
          {subscribestatus ?
            (<span className='p-2 rounded-xl border border-customPurple text-customPurple text-xs font-bold cursor-pointer bg-subscribebutton' onClick={() => handleNewsLetterSelected(data.id)}>구독하기</span>)
            :
            (<span className='p-2 rounded-xl  border border-gray-200 bg-gray-200  text-gray-400 cursor-pointer text-xs font-bold' onClick={() => handleNewsLetterUnSelected(data.id)}>구독해제</span>)}
        </div>
      ))}
      {openModal && (
        <MobileMenu
          setOpenModal={setOpenModal}
          mynewsletter={mynewsletter}
          onSelectItem={onSelectItem}
        />
      )}
    </div>
  );
}

