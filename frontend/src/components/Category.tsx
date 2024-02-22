import { useCallback, useEffect, useRef, useState } from "react";

const Category = ({
  fetchNewsletter,
  activeCategory,
  setActiveCategory,
  categories,
  subscribeable,
  setSubscribeable,
}: any) => {
  useEffect(() => {
    setSubscribeable([]);
  }, [activeCategory]);

  return (
    <>
      {categories.map((category: any) => {
        return (
          <button
            key={category.id}
            onClick={function () {
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
