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
  const [selectedItem, setSelectedItem] = useState(
    selectItemId ? selectItemId : mynewsletter[0].id
  );
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
    <div className="">
      <div className="fixed inset-0 bg-stone-300 bg-opacity-50  z-10">
        {/* 네비게이션 아이템 영역 */}
        <div className="relative h-screen">
          <div className="bg-white flex flex-col w-fit h-[100%]">
            <div className="subscribe-scrollbar flex flex-col items-center overflow-y-auto  ">
              {mynewsletter.map((data) => (
                <div className="">
                  <div
                    className={`h-[120px] gap-3 text-center text-[13px] break-words break-keep border-b px-2 py-4 flex flex-col items-center justify-center`}
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
                    <span
                      className={`font-semibold w-[65px] pb-2  ${
                        selectedItem === data.id
                          ? "border-customPurple border-solid border-b-4 "
                          : ""
                      }`}
                    >
                      {data.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="">
              <div className="flex flex-col  ">
                <div
                  className="flex flex-col gap-5
                "
                >
                  <ChangeButton></ChangeButton>

                  <div
                    onClick={() => {
                      setModalOpen(true);
                    }}
                    className="bg-[#EEEEEE]  size-[42px] mx-auto rounded-xl px-[10px] cursor-pointer mb-5"
                  >
                    <img
                      className="mx-auto w-[200px] h-full"
                      src="images\setting.svg"
                      alt=""
                    />
                  </div>
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
          <div className="absolute top-0 left-20">
            <span className="cursor-pointer text-2xl" onClick={closeModal}>
              <img src="images/close.svg" className="size-[30px]" alt="닫기" />
            </span>
          </div>
        </div>
      </div>
    </div>
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
