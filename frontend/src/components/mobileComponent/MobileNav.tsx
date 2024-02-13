import React from 'react'
import { Link } from 'react-router-dom';

interface MobileNav {
  menu?: string
}

const MobileNav = ({ menu }: MobileNav) => {
  const truncate = (str: string, n: number) => {
    return str?.length > n ? str.substring(0, n) + "..." : str;
  }

  return (
    <div className='bg-white border-b p-3 flex items-center  justify-end gap-4 mb-3'>
      {menu ? <div>ddddd</div> : ''}
      <div className='flex items-center  justify-center gap-2'>
        <img className='w-8' src="/images/1.png" alt="aaa" />
        <span className='text-sm font-semibold'>{truncate('시가 총액 780조원 상승한 미라클레터', 16)}</span>
      </div>
      <Link className='text-sm border rounded-2xl py-2 px-3 bg-gray-100 font-semibold text-gray-500' to='/landingpage'>구독하기</Link>
    </div>
  )
}

export default MobileNav