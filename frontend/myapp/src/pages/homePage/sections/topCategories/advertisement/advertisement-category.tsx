import React from 'react'
import "./advertisement-category.css"
import shopImage from "../../../../../assets/images/d63d3f60-d994-428d-aa74-09af3cd2e6a8.png"
import Rating from '../../../../../components/Rating/rating-export'
import Button from '../../../../../components/Button/button'
const AdvertisementCategory = () => {
  return (
    <div className='mx-auto w-full'>
      <div className='w-full px-8 ads-contentua719  rounded-2xl py-12  overflow-hidden min-h-[540px] bg-slate-100'>
        <div className="grid h-[inherit] grid-cols-3 text-white gap-x-12 items-center justify-between">
          <div className="adscontent-text">
            <h3 className='text-4xl leading-snug font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum dolore libero nostrum.</h3>
            <h6 className='text-xl'>Lorem, ipsum dolor.</h6>
          </div>
          <div className="adscontent-card col-span-2 flex items-baseline">
            <div className="glassmorphism w-[1000px] p-8 overflow-hidden">
              <div className="flex items-center glassmorphism-content justify-between">
                <div className="glassmorphism-text">
                  <div className="smallheader-ai8a">
                    <span className='text-base font-extralight font-mono'>Lorem ipsum dolor sit.</span>
                  </div>
                  <div className="bigheader-auaj">
                    <h6 className='text-lg font-medium'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vel nam sit.</h6>
                  </div>
                </div>
                <div className="glassmorphism-image">
                  <img src={shopImage} width={300} className='shoe-image' alt="shoeimage" />
                </div>
              </div>
              <div className="glassmorphism-action">
                <Button variant='filled' color='primary'>Shop Now</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertisementCategory