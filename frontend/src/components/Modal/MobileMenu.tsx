import Cookies from "js-cookie";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { NewsLetterDataType } from "../../pages/SubscribePage";
import { AmplitudeResetUserId } from "../Amplitude";
import { Link } from "react-router-dom";
import { SettingModal } from "./settingModalForMobile";

interface MobileMenuType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  mynewsletter: NewsLetterDataType[];
  onSelectItem: React.Dispatch<React.SetStateAction<number>>;
  selectItemId: number;
}

const MobileMenu = ({
  setOpenModal,
  mynewsletter,
  onSelectItem,
  selectItemId,
}: MobileMenuType) => {
  const [isOpen, setIsOpen] = useState(true);
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(selectItemId ? selectItemId : mynewsletter[0].id);
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
  };

  return (
    <div className="z-10 absolute">
      <div className="fixed inset-0 bg-stone-300 bg-opacity-50 flex justify-start">
        <div className='h-full flex flex-col w-auto bg-white relative'>
          <div className="flex flex-col overflow-auto justify-between mb-[180px]">
            <div className="overflow-auto subscribe-scrollbar w-full flex flex-col items-center gap-3">
              {mynewsletter.map((data) => (
                <div
                  className={`text-center border-b p-3 flex flex-col items-center justify-center`}
                  key={data.id}
                  onClick={() => {
                    handleItemClick(data.id);
                  }}
                >
                  <img
                    className="w-[35px]"
                    src={`/images/${data.id}.png`}
                    alt={String(data.id)}
                  />
                  <p
                    className={`font-semibold w-[65px] py-2 ${selectedItem === data.id
                      ? "border-customPurple border-solid border-b-4"
                      : ""
                      }`}
                  >
                    {data.name}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full text-center gap-3 absolute  bottom-0 left-0">
              <ChangeButton></ChangeButton>
              <div
                onClick={() => { setModalOpen(true); }}
                className="bg-[#EEEEEE]  size-[42px] mx-auto rounded-xl px-[10px] cursor-pointer">
                <img
                  className="mx-auto w-[200px] h-full"
                  src="images\setting.svg"
                  alt=""
                />
              </div>
              <div className="p-3bg-gray-100 w-full text-center border-t py-3">
                <span
                  className="text-gray-500 font-semibold"
                  onClick={handleLogOut}
                >
                  로그아웃
                </span>
            </div>
              {ModalOpen && (
                <SettingModal
                  setOpenModal={setModalOpen}
                  newsLetters={mynewsletter}
                />
              )}
            </div>
          </div>
        </div>
        <span
          className='cursor-pointer pl-2 text-2xl'
          onClick={closeModal}
        >
          X
        </span>
      </div>
    </div >
  );
};

const ChangeButton = () => {
  return (
    <Link to="/mobilesubscribe">
      <div className="mt-[15px] px-[19px] cursor-pointer">
        <div className="bg-[#EEEEEE]  size-[42px] mx-auto rounded-xl">
          <img
            className="mx-auto p-[10px] h-full"
            src="images/add.png"
            alt=""
          />
        </div>
      </div>
    </Link>
  );
};


export default MobileMenu;
