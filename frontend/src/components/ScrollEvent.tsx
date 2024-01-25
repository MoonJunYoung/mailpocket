import React, { useEffect, useState } from 'react';


interface ScrollNumberType {
  offset: number;
  duration: number;
}

interface ScrolleventProps extends ScrollNumberType {
  subtitle1: string;
  subtitle2: string;
  subtitle3: string;
}


const ScrollEvent: React.FC<ScrolleventProps> = ({ offset, duration, subtitle1, subtitle2, subtitle3 }) => {
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;

      if (!hasAnimated && currentPosition >= offset && currentPosition <= offset + duration) {
        setHasAnimated(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasAnimated, offset, duration]);

  const calculateAnimationClass = (): string => {
    if (hasAnimated) {
      return 'animate-scrollFadeIn';
    }

    return '';
  };

  return (
    <div className={`flex flex-col items-start font-bold text-[40px] md:text-[22px] text-maintitle ${calculateAnimationClass()}`}>
      <h1>{subtitle1}</h1>
      <h1>{subtitle2}</h1>
      <h1>{subtitle3}</h1>
    </div>
  );
};

export default ScrollEvent;
