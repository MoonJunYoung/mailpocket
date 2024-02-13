import React from 'react'
import MobileNav from '../../components/mobileComponent/MobileNav'
import MobileSeeMore from '../../components/mobileComponent/MobileSeeMore'
import MobileSummary from '../../components/mobileComponent/MobileSummary'

const MobileReadPage = () => {
  return (
    <div>
      <MobileSeeMore />
      <MobileNav />
      <MobileSummary />
    </div>
  )
}

export default MobileReadPage