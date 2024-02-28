import React, { useEffect, useRef } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { NewsLetterDataType } from "../../pages/SubscribePage";
import { Link, useNavigate } from "react-router-dom";
import { isMobile } from "../../App";
import { sendEventToAmplitude } from "../Amplitude";

interface SlackGuideModalType {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  handlePostNewsLetterData: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => Promise<void>;
  subscribelength: number
}

const SlackGuideModal = ({
  setOpenModal,
  handlePostNewsLetterData,
  subscribelength,
}: SlackGuideModalType) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  useOnClickOutside(ref, () => {
    setOpenModal(false);
  });

  useEffect(() => {
    sendEventToAmplitude("view select article", "");
  }, [,]);

  return (
    <div className="z-10 absolute ">
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div
          ref={ref}
          className={`py-3 px-7 rounded-lg relative flex justify-center flex-col max-h-400 w-250 bg-white ${isMobile ? "" : "transition-all ease-in-out animate-fadeIn"}`}
        >
          <div className="my-5 w-full flex flex-col items-start gap-2 ">
            <div
              className="absolute top-1 right-3 cursor-pointer text-xl font-extrabold"
              onClick={() => setOpenModal(false)}
            >
              X
            </div>
            <p className="font-extrabold text-xl">
              {`${subscribelength}개 뉴스레터 구독 완료`}
            </p>
            <span className="font-bold text-gray-500">
              슬랙을 연동하면 3줄 요약된 뉴스레터를 편하게 받아보실 수 있어요.
            </span>
            <span className="font-bold text-red-600">
              DM 으로 연결하면 혼자 보는것도 가능해요
            </span>
          </div>
          <div className="w-full flex items-center justify-end mb-3">
            <div className="flex items-center justify-center gap-1">
              <Link
                className="cursor-pointer w-[100px] text-base text-customPurple font-extrabold"
                to={isMobile ? "/mobilemypage" : "/"}
                onClick={() => sendEventToAmplitude("complete to select article", "")}
              >
                다음에 하기
              </Link>
              <button
                className="cursor-pointer w-[100px] rounded-2xl h-[40px] border-none bg-customPurple text-white text-base font-bold"
                onClick={handlePostNewsLetterData}
              >
                연동하기
              </button>

            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default SlackGuideModal;
