import Cookies from 'js-cookie';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { NewsLetterDataType } from '../../pages/SubscribePage';
import { AmplitudeResetUserId } from '../Amplitude';

interface MobileMenuType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  mynewsletter: NewsLetterDataType[]
  onSelectItem: React.Dispatch<React.SetStateAction<number>>;
  selectItemId: number
}

const MobileMenu = ({ setOpenModal, mynewsletter, onSelectItem, selectItemId }: MobileMenuType) => {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState(selectItemId ? selectItemId : mynewsletter[0].id );
  
  const navigate = useNavigate();

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 480);
  };

  const handleLogOut = async () => {
    Cookies.remove("authToken");
    await AmplitudeResetUserId();
    navigate("/sign-in");
  };

  const handleItemClick = (id: number) => {
    onSelectItem(id);
    setSelectedItem(id);
  }

  return (
    <div className='z-10 absolute'>
      <div className="fixed inset-0 bg-stone-300 bg-opacity-50 flex justify-start">
        <div className={`h-full relative flex flex-col max-h-400 w-250 bg-white ${isOpen ? "animate-right-to-left" : "animate-left-to-right"}`}>
          <div className='mb-[45px] overflow-auto subscribe-scrollbar w-full flex flex-col items-center gap-3'>
            {mynewsletter.map((data) =>
              <div className={`text-center border-b p-3 flex flex-col items-center justify-center`} key={data.id} onClick={() => { handleItemClick(data.id); }}>
                <img className='w-[45px]' src={`/images/${data.id}.png`} alt={String(data.id)} />
                <p className={`font-semibold py-3 w-[63px] ${selectedItem === data.id ? 'border-customPurple border-solid border-b-4' : ''}`}>{data.name}</p>
              </div>
            )}
          </div>
          <div className='p-3 bg-gray-100 absolute bottom-0 w-full text-center border-t'>
            <span className='text-gray-500 font-semibold' onClick={handleLogOut}>로그아웃</span>
          </div>
        </div>
        <span className={`cursor-pointer pl-2 text-2xl animate-right-to-left ${isOpen ? "animate-right-to-left" : "animate-left-to-right"}`} onClick={closeModal}>X</span>
      </div>
    </div>
  )
}


export default MobileMenu


