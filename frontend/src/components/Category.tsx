import { useCallback, useEffect, useRef, useState } from "react";

const Category = ({
  fetchNewsletter,
  activeCategory,
  setActiveCategory,
  categories,
  setSubscribeable,
}: any) => {
  // const inMounted = useRef(false);
  // useEffect(() => {
  //   setSubscribeable([]);
  //   if (inMounted.current) {
  //     if (activeCategory === "전체") {
  //       let response = fetchNewsletter();
  //       response.then((result: any) => {
  //         inMounted.current = false;
  //       });
  //     } else {
  //       let response = fetchNewsletter(undefined, activeCategory);
  //       response.then((result: any) => {
  //         inMounted.current = false;
  //       });
  //     }
  //   } else inMounted.current = true;
  // }, [activeCategory]);

  return (
    <>
      {categories.map((category: any) => {
        return (
          <button
            key={category.id}
            onClick={() => {
              setActiveCategory(category.name);
            }}
            className={`${
              activeCategory === category.name ||
              (!activeCategory && category.name === "전체")
                ? "bg-[#635C6D] text-white"
                : "bg-[#EBEBEB]"
            } p-2 rounded-xl font-bold text-xs`}
          >
            {category.name}
          </button>
        );
      })}
    </>
  );
};

export { Category };
