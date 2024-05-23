import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdvertisementPage from './sections/advertisement/advertisement'
import onlineSales from "../../assets/images/onlinesales.svg"
import Button from '../../components/Button/button'
import TopCategories from './sections/topCategories/topcategories-export'
// const validator = require('validator');
const HomePage = () => {
  return (
    <div className='content'>
      <Navbar />
      <AdvertisementPage />
      <TopCategories />
    </div>
  )
}

export default HomePage
