import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdvertisementPage from './sections/advertisement/advertisement'
import onlineSales from "../../assets/images/onlinesales.svg"
import Button from '../../components/Button/button'
import TopCategories from './sections/topCategories/topcategories'
import RecentlyViewed from './sections/recentlyViewed/recently-viewed'
import ImageScrolll from './sections/advertisement/imageScrolll'
// const validator = require('validator');
const HomePage = () => {
  return (
    <div className='main-content'>
      <div className="ads091k-content bg-gray-100">
        <div className="suv-ciiq container mx-auto">
          <AdvertisementPage />
        </div>
        <ImageScrolll />
      </div>
      <div className="main-content container mx-auto">
        <RecentlyViewed />
      </div>
      <div className="main-content container mx-auto">
        <TopCategories />
      </div>
    </div>
  )
}

export default HomePage
