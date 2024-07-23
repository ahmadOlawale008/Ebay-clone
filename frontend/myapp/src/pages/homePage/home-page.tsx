import AdvertisementPage from './sections/advertisement/advertisement'
import TopCategories from './sections/topCategories/topcategories'
import RecentlyViewed from './sections/recentlyViewed/recently-viewed'
import ImageScrolll from './sections/advertisement/imageScrolll'
import AdvertisementCategory from './sections/topCategories/advertisement/advertisement-category'
import { useEffect } from 'react'

// const validator = require('validator');
const HomePage = () => {
  console.log("Hello")
  useEffect(()=>{

  }, [])
  return (
    <div className='main-content'>
      <div className="ads091k-content bg-slate-50/50">
        <div className="suv-ciiq container mx-auto">
          <AdvertisementPage />
        </div>
        <ImageScrolll />
      </div>
      <div className="main-content container mx-auto">
        <RecentlyViewed />
      </div>
      <div className="my-12 bg-slate-100 mx-auto">
        <AdvertisementCategory />
      </div>
      <div className="main-content container mx-auto">
        <TopCategories />
      </div>4
    </div>
  )
}

export default HomePage
