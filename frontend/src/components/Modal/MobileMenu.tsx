import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
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
  openModal: boolean;
}

const MobileMenu = ({
  openModal,
  setOpenModal,
  mynewsletter,
  onSelectItem,
  selectItemId,
}: MobileMenuType) => {
  const [ModalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(
    selectItemId ? selectItemId : mynewsletter[0].id
  );
  const navigate = useNavigate();
  const [isAnimating, setIsAnimating] = useState(true);
  const handleLogOut = async () => {
    Cookies.remove("authToken");
    await AmplitudeResetUserId();
    navigate("/sign-in");
  };

  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => { setOpenModal(false) }, 500)
    }
  }, [isAnimating])


  const handleItemClick = (id: number) => {
    onSelectItem(id);
    setSelectedItem(id);
  };

  return (
    <div>
      <div className={`absolute top-0 inset-0 z-10 overflow-hidden ${isAnimating ? 'animate-left-to-right' : 'animate-right-to-left'}`}>
        {/* 네비게이션 아이템 영역 */}
        <div className="h-screen fixed">
          <div className="bg-white flex flex-col w-fit h-[100%] ">
            <div className="subscribe-scrollbar flex flex-col items-center overflow-y-auto">
              <div className="cursor-pointer text-lg px-6 py-4 mb-4 border-b">
                <span className=" text-gray-600" onClick={() => { setIsAnimating(false) }}>
                  닫기
                </span>
              </div>
              {mynewsletter.map((data) => (
                <div className="">
                  <div
                    className={`h-[120px] gap-5 text-center text-[13px] break-words break-keep border-b px-2 py-4 flex flex-col items-center justify-center`}
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
                      className={`font-semibold w-[65px] pb-2  ${selectedItem === data.id
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
              <div className="flex flex-col">
                <div className="flex flex-col gap-5">
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
