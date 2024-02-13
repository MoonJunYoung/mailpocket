import React from 'react'
import { Link } from 'react-router-dom'

const MobileSeeMore = () => {
  return (
    <div>
      <div className='border-b flex items-center justify-center bg-white p-3'>
        <span className='text-sm text-gray-400 font-bold'>뉴스레터 3줄 요약 서비스</span>
        <Link className="font-extrabold text-sm underline ml-2 text-customPurple" to="/landingpage">알아보기</Link>
      </div>
    </div>

  )
}

export default MobileSeeMore