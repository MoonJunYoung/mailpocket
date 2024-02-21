import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  getNewsletterData,
  getSubscribeData,
  Params,
  putSubscribe,
  Token,
} from "../../api/api";
import { sendEventToAmplitude } from "../../components/Amplitude";
import { useInfiniteQuery } from "react-query";
import Nav from "../../components/Nav";
import Symbol from "../../components/Symbol";
import useIntersectionObserver from "../../hooks/useIntersectionObserver";
import { Loader } from "../../components/Loader";
import SlackGuideModal from "../../components/Modal/SlackGuideModal";
import { Category } from "../../components/Category";
import "../../index.css";
import { Link } from "react-router-dom";
export type SummaryItem = {
  [key: string]: string;
};

export type NewsLetterDataType = {
  id: string;
  name: string;
  category: string;
  mail: {
    id: number;
    subject: string;
    summary_list: SummaryItem;
    s3_object_key: string;
  };
};

const MobileSubscribe = () => {
  const [subscribeable, setSubscribeable] = useState<NewsLetterDataType[]>([]);
  const [newslettersubscribe, setNewsLettersubscribe] = useState<
    NewsLetterDataType[]
  >([]);
  const [newsletterchecked, setNewsLetterChecked] = useState<string[]>([]);
  const [seeMoreStates, setSeeMoreStates] = useState<{ [id: string]: boolean }>(
    {}
  );
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const [isActiveMailModal, setIsActiveMailModal] = useState(false);

  const [activeCategory, setActiveCategory] = useState("전체");
  const categories = [
    "전체",
    "IT/테크",
    "건강/의학",
    "디자인",
    "비즈/제테크",
    "시사/사회",
    "엔터테이먼트",
    "여행",
    "취미/자기계발",
    "트렌드/라이프",
    "푸드",
  ];

  const authToken = Token();
  const ref = useRef<HTMLDivElement | null>(null);
  const pageRef = useIntersectionObserver(ref, {});
  const isPageEnd = pageRef?.isIntersecting;

  const handleNewsLetterSeeMoreSelect = (newsletterid: string) => {
    setSeeMoreStates((prevStates) => ({
      ...prevStates,
      [newsletterid]: !prevStates[newsletterid],
    }));
  };

  useEffect(() => {
    if (!authToken) {
      navigate("/landingpage");
    } else {
      sendEventToAmplitude("view select article", "");
    }
  }, [authToken, navigate]);

  const fetchNewsletter = async (
    lastId: string | undefined,
    category: string | undefined = "전체"
  ) => {
    let params: Params = {
      in_mail: true,
      subscribe_status: "subscribable",
      sort_type: "ranking",
    };

    if (lastId) {
      params.cursor = lastId;
    }

    if (category !== "전체") {
      params.category = category;
    }

    const { data } = await getNewsletterData("/testapi/newsletter", params);
    setSubscribeable((prevData) => [...prevData, ...data]);
    return data;
  };

  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfiniteQuery(
      "newsletter",
      ({ pageParam }) => fetchNewsletter(pageParam),
      {
        getNextPageParam: (lastPage) => {
          const lastItem = lastPage[lastPage.length - 1];
          return lastItem ? lastItem.id : null;
        },
      }
    );

  const fetchNext = useCallback(async () => {
    const res = await fetchNextPage();
    if (res.isError) {
      console.log(res.error);
    }
  }, [fetchNextPage]);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isPageEnd && hasNextPage) {
      timerId = setTimeout(() => {
        fetchNext();
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [fetchNext, isPageEnd, hasNextPage]);

  const handleGetNewsLetterData = async () => {
    try {
      const responesSubscribe = await getSubscribeData(
        "testapi/newsletter?in_mail=true&subscribe_status=subscribed&sort_type=ranking"
      );
      setNewsLettersubscribe(responesSubscribe.data);
    } catch (error) {
      console.log("Api 데이터 불러오기 실패");
    }
  };

  const handlePostNewsLetterData = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      if (newsletterchecked.length <= 0) {
        alert("뉴스레터를 구독해주세요");
      } else {
        const responesPut = await putSubscribe({ ids: newsletterchecked });
        if (responesPut.status === 201) {
          sendEventToAmplitude("complete to select article", "");
          window.location.href =
            "https://slack.com/oauth/v2/authorize?client_id=6427346365504.6466397212374&scope=incoming-webhook,team:read&user_scope=";
        }
      }
    } catch (error) {
      console.log("Api 데이터 보내기 실패");
    }
  };

  useEffect(() => {
    handleGetNewsLetterData();
  }, []);

  useEffect(() => {
    handleNewsLetterSubcribeDataRenewal();
  }, [newslettersubscribe]);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleNewsLetterSubcribeDataRenewal = () => {
    const newslettersubscribeId = newslettersubscribe.map((item) => item.id);
    setNewsLetterChecked([...newslettersubscribeId]);
  };

  const handleNewsLetterSelected = (newsletterid: string) => {
    setNewsLetterChecked((prevChecked) => {
      const newsletters = subscribeable.find(
        (item) => item.id === newsletterid
      );
      if (prevChecked.includes(newsletterid)) {
        return prevChecked.filter((id) => id !== newsletterid);
      } else {
        sendEventToAmplitude("select article", {
          "article name": newsletters?.name,
        });
        return [...prevChecked, newsletterid];
      }
    });
  };

  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  };

  return (
    <div className="mx-auto h-auto bg-white">
      <Nav />
      <div className="mx-auto max-w-[1200px] mt-3 mb-10">
        <MailModal></MailModal>
        <div className="flex justify-between md:gap-8 px-3">
          <div className="flex gap-2 justify-center ">
            <Symbol />
            <div
              className="flex flex-col gap-2 text-left border p-4 bg-white rounded-lg"
              style={{ boxShadow: "1px 2px lightgrey" }}
            >
              <p className="text-xs font-semibold text-gray-400">
                최근 요약 확인하고, 뉴스레터 구독하기
              </p>
              <p className="text-sm font-semibold">
                어떤 뉴스레터를 좋아하시나요?
              </p>
            </div>
          </div>
          <div>
            <button
              className="h-[45px]  rounded-3xl border-none bg-customPurple text-white text-base font-bold w-[150px] md:w-[90px] hover:scale-110 transition-transform"
              style={{ boxShadow: "0px 1px black" }}
              onClick={handlePostNewsLetterData}
            >
              선택 완료
            </button>
          </div>
        </div>
        <div className="flex items-center mt-8 whitespace-nowrap overflow-auto subscribe-scrollbar">
          <div className="flex gap-[10px] mx-2">
            <Category
              fetchNewsletter={fetchNewsletter}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              categories={categories}
              setSubscribeable={setSubscribeable}
            ></Category>
          </div>
        </div>
        <div className="mt-3">
          <div className="overflow-y-auto">
            <div className="md:p-3">
              {Object.keys(newslettersubscribe).length > 0 ? (
                <div>
                  <h1 className="mb-5 text-lg font-extrabold">
                    구독중인 뉴스레터
                  </h1>
                  <div
                    className={`flex whitespace-nowrap overflow-auto subscribe-scrollbar gap-4`}
                  >
                    {newslettersubscribe.map((data) => (
                      <div>
                        <NewsLetter data={data}></NewsLetter>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
            <h1 className="mt-5 text-lg font-extrabold md:p-3">
              구독 가능한 뉴스레터
            </h1>
            <div className="grid md:grid-cols-4 gap-4 px-[10px]">
              {subscribeable.map((data) => (
                <div className="">
                  <NewsLetter data={data}></NewsLetter>
                </div>
              ))}
            </div>
          </div>
          <div className="fixed  bottom-[0px]">
            <button
              className="h-[60px] w-svw border-2 bg-customPurple text-white text-base font-bold  hover:scale-110 transition-transform"
              onClick={handleModalOpen}
            >
              선택 완료
            </button>
          </div>
        </div>
      </div>
      {openModal && (
        <SlackGuideModal
          setOpenModal={setOpenModal}
          handlePostNewsLetterData={handlePostNewsLetterData}
          newsletterchecked={newsletterchecked}
        />
      )}
      <div className="w-full  touch-none h-10 mb-10" ref={ref}></div>
      {isFetching && hasNextPage && <Loader />}
    </div>
  );
};

const NewsLetter = ({ data }: any) => {
  return (
    <div
      className="justify-around flex flex-wrap border-2 rounded-md bg-white items-center"
      // style={{ boxShadow: "-1px 5px 1px 1px lightgray" }}
      key={data.id}
    >
      <div className="flex flex-col items-center min-h-[100px]">
        <div>
          <img
            src={"images/" + data.id + ".png"}
            className="size-[40px] m-[9px] rounded-full "
            alt=""
          />
        </div>
        <div className="w-full">
          <span className="px-1 font-semibold text-xs text-center inline-block w-[70px] mx-[10px] whitespace-pre-wrap break-all items-center">
            {data.name}
          </span>
        </div>
      </div>
    </div>
  );
};

const MailModal = ({ setOpenModal, newsLetters, openModal }: any) => {
  const [channels, setChannels] = useState([]);

  return (
    <div className="w-full h-full fixed top-0">
      <div className="h-full bg-black bg-opacity-35">
        <div className="w-[80%] h-[500px] fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] bg-white rounded-lg">
          <span
            onClick={() => {
              setOpenModal(false);
            }}
            className="fixed top-3 right-5 cursor-pointer"
          >
            <img src="/images/close.svg" alt="" className="size-6" />
          </span>
          <div className="p-[40px] h-full">
            <div className="flex flex-col h-full">
              <div className="flex flex-col gap-2 text-[20px] font-extrabold">
                <div>개의 뉴스레터 소식을</div>
                <div>개의 채널에 전달하고 있어요.</div>
              </div>
              <div className="pt-[30px] overflow-hidden h-full ">
                <div className="flex overflow-auto h-full items-start gap-[15px] flex-col"></div>
              </div>
              <div className="">
                <Link to="https://slack.com/oauth/v2/authorize?client_id=6427346365504.6466397212374&scope=incoming-webhook,team:read&user_scope=">
                  <button className="bg-[#8F36FF] text-[#FFFFFF] w-full p-[20px] rounded-md font-semibold">
                    구독하기
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileSubscribe;
