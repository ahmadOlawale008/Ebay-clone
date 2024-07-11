import ProductCard from '../../../../components/Card/productsCard'
import image from "../../../../assets/images/sarah-dorweiler-gUPiTDBdRe4-unsplash.jpg"
import imageB from "../../../../assets/images/filip-mroz-gma1zfS3_6E-unsplash.jpg"
import imageC from "../../../../assets/images/thomas-le-pRJhn4MbsMM-unsplash.jpg"
import imageD from "../../../../assets/images//tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import React, { useRef, useState } from 'react'
import { AvailableCardController, ScrollType, handleContainerScroll, handleScrollCardPosition } from "../../../../utils/scrollHorizontal"
import "./recently-viewed.css"
const RecentlyViewed = () => {
  const categoriesWrapperRef = useRef<HTMLDivElement>(null)
  const [availableCardController, setAvailableCardController] = useState<AvailableCardController>("right")
  return (
    <div className="mt-2 mb-3 px-0 ">
      <div className="recently-headoai font-medium flex items-center justify-between">
        <div className="content-name"><h1 className='text-xl font-medium my-4'>Your Recently Viewed Products</h1></div>
        <div className="content-link"><a className='underline text-text-xl my-4 font-semibold underline-offset-2 hover:text-neutral-600' href="" target='_blank'>See all</a></div>
      </div>
      <div className="relative w-full">
        <div ref={categoriesWrapperRef} onScroll={(e) => handleContainerScroll(e, setAvailableCardController)} className="flex overflow-x-auto scr5a6 modal-scroll relative flex-nowrap w-full shrink-0 gap-x-2.5 flex-row">
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={1} link='a' img={image} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={3} link='a' img={image} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4} link='a' img={imageB} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={5} link='a' img={imageC} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={2} link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4} link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4} link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
        </div>
        <span onClick={(e) => handleScrollCardPosition(e, categoriesWrapperRef, availableCardController)} data-direction="left" className={`absolute top-1/3 ${availableCardController == "right" && "opacity-20 backdrop-blur-md"} -left-5 shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-lg">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>
        </span>
        <span onClick={(e) => handleScrollCardPosition(e, categoriesWrapperRef, availableCardController)} data-direction="right" className={`absolute top-1/3  ${availableCardController == "left" && "opacity-20 backdrop-blur-md"}  -right-5  shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99] `}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-lg">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </span>
      </div>
    </div>
  )
}
export default RecentlyViewed