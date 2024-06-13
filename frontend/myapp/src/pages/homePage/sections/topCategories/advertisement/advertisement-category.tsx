import React from 'react'
import "./advertisement-category.css"
import shopImage from "../../../../../assets/images/—Pngtree—casual shoes_5626499.png"
import Rating from '../../../../../components/Rating/rating-export'
const AdvertisementCategory = () => {
  return (
    <div>
      <div className='w-full px-8 ads-contentua719  rounded-2xl py-12  overflow-hidden min-h-[540px] bg-slate-100'>
        <div className="min-h-[inherit] text-white gap-x-3 flex items-center justify-between">
          <div className="ads-textcat flex flex-col space-y-3 w-full basis-1/2">
            <h3 className='text-7xl font-black'>Ads Content</h3>
            <span className='text-2xl '>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aspernatur debitis unde qui!</span>
          </div>
          <div className="glassmorphism divide-y divide-neutral-100 w-6/12 flex flex-col items-center">
            <div className="w-full mx-auto">
              <img src={shopImage} className='align-middle w-fit h-fit' alt="" />
            </div>
            <div className="p-6">
              <h4 className='text-2xl my-3 font-semibold'>Lorem, ipsum dolor.</h4>
              <p className='text-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Placeat porro dolorum delectus cumque quis, reiciendis deleniti fuga earum vitae eveniet. Consequatur veniam et omnis ea corrupti. Dicta sint delectus illo!</p>
          <div className="rating-c">
            <Rating rate={4} />
          </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertisementCategory
