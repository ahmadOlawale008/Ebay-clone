import React from 'react'
import image from "../../../../assets/images/lucas-favre-4x-67z_TaGo-unsplash.jpg"
import "./advertisement-style.css"
import Button from '../../../../components/Button/button'
const AdvertisementPage = () => {
  console.log(image)
  return (
    <div>
      <div className=" h-screen relative bg-gray-300">
        <div className="h-full adsa09a bg-center bg-fixed bg-cover w-full">
          <div className="ads01-contentWrapp py-20 px-5">
            <div className="textAdsContenta8a flex mx-auto flex-col gap-y-7   text-white">
              <h3 className='text-5xl font-semibold tracking-tighter '>Lorem ipsum dolor sit amet.</h3>
              <span className='header-description09a break-all text-xl font-light my-4 leading-relaxed  max-w-[600px] text-wrap'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae architecto sint totam, dolor obcaecati, accusantium nihil praesentium deleniti necessitatibus accusamus adipisci ex, debitis itaque.
              </span>
              <Button  color='primary' size='large' variant='filled' >
                <a href="">Hello</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertisementPage
