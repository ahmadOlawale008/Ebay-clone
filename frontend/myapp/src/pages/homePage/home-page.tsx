import AdvertisementPage from './sections/advertisement/advertisement'
import TopCategories from './sections/topCategories/topcategories'
import RecentlyViewed from './sections/recentlyViewed/recently-viewed'
import ImageScrolll from './sections/advertisement/imageScrolll'
import AdvertisementCategory from './sections/topCategories/advertisement/advertisement-category'

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
