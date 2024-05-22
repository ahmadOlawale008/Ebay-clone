import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import AdvertisementPage from './sections/advertisement/advertisement'
import onlineSales from "../../assets/images/onlinesales.svg"
import Button from '../../components/Button/button'
// const validator = require('validator');
const HomePage = () => {
  return (
    <>
      <Navbar />
      <AdvertisementPage />
    </>
  )
}

export default HomePage
