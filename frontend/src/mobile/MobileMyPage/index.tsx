import React from 'react'
import MobileNav from '../../components/mobileComponent/MobileNav'
import MobileSeeMore from '../../components/mobileComponent/MobileSeeMore'
import MobileSummary from '../../components/mobileComponent/MobileSummary'

const MobileMyPage = () => {
  return (
    <div>
      <MobileNav menu={"menu"} />
      <MobileSummary />
    </div>
  )
}

export default MobileMyPage