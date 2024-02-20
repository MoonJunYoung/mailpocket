import { useCallback, useEffect, useRef, useState } from "react";

const Category = ({
  fetchNewsletter,
  activeCategory,
  setActiveCategory,
  categories,
}: any) => {
  const inMounted = useRef(false);
  useEffect(() => {
    if (inMounted.current) {
      if (activeCategory === "전체") {
        let test = fetchNewsletter();
        test.then((result: any) => {
          console.log(result);
        });
      } else {
        let test = fetchNewsletter(activeCategory);
        test.then((result: any) => {
          console.log(result);
        });
      }
    } else inMounted.current = true;
  }, [activeCategory]);

  return (
    <>
      {categories.map((category: string) => {
        return (
          <button
            onClick={() => {
              setActiveCategory(category);
            }}
            className={`${
              activeCategory === category ||
              (!activeCategory && category === "전체")
                ? "bg-[#635C6D] text-white"
                : "bg-[#EBEBEB]"
            } p-2 rounded-xl font-bold text-xs`}
          >
            {category}
          </button>
        );
      })}
    </>
  );
};

export { Category };
