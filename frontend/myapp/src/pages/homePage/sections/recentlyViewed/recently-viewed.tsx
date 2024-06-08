import ProductCard from '../../../../components/Card/productsCard'
import image from "../../../../assets/images/sarah-dorweiler-gUPiTDBdRe4-unsplash.jpg"
import imageB from "../../../../assets/images/filip-mroz-gma1zfS3_6E-unsplash.jpg"
import imageC from "../../../../assets/images/thomas-le-pRJhn4MbsMM-unsplash.jpg"
import imageD from "../../../../assets/images//tobias-tullius-Fg15LdqpWrs-unsplash.jpg"
import React, { MouseEventHandler, useEffect, useRef, useState } from 'react'
import "./recently-viewed.css"
type AvailableCardController = "left" | "right" | "both"
type ScrollTasks = "right" | "left" | "default"
const RecentlyViewed = () => {
  const categoriesWrapperRef = useRef<HTMLDivElement | null>(null)
  const [availableCardController, setAvailableCardController] = useState<AvailableCardController>("right")
  const [scrollPercentage, setScrollPercentage] = useState(25)
  const handleContainerScroll = (e: Event, moveTo: ScrollTasks = "default") => {
    const element = e.currentTarget as HTMLDivElement
    const clientWidth = element.clientWidth
    const scrollLeft = element.scrollLeft
    const scrollWidth = element.scrollWidth
    const distance = scrollLeft + clientWidth
    if (distance === scrollWidth) {
      setAvailableCardController("left")
    } else if (distance > clientWidth) {
      setAvailableCardController("both")
    } else {
      setAvailableCardController("right")
    }
    setScrollPercentage((scrollWidth - distance) / scrollWidth)
  }
  const handleScrollCardPosition: MouseEventHandler<HTMLSpanElement> = (e) => {
    const moveTo = e.currentTarget.getAttribute("data-direction")
    if (categoriesWrapperRef.current) {
      const element = categoriesWrapperRef.current
      const clientWidth = element.clientWidth
      const scrollLeft = element.scrollLeft
      let scrollTo = scrollLeft + (moveTo === "left" ? -(clientWidth - 100) : (clientWidth - 100))
      if (moveTo == "left" && availableCardController != "right") {
        element.scrollTo({ "left": scrollTo, "behavior": "smooth" })
      }
      if (moveTo == "right" && availableCardController != "left") {
        element.scrollTo({ "left": scrollTo, "behavior": "smooth" })
      }
    }
  }
  useEffect(() => {
    categoriesWrapperRef.current?.addEventListener("scroll", handleContainerScroll)
    return (() => categoriesWrapperRef.current?.removeEventListener("scroll", handleContainerScroll))
  })
  return (
    <div className="mt-4 mb-3 px-0 ">
      <div className="recently-headoai">
        <h1 className='text-2xl my-7 font-semibold'>Your Recently Viewed Products</h1>
      </div>
      <div className="relative w-full">
        <div ref={categoriesWrapperRef} className="flex overflow-x-auto scr5a6 modal-scroll relative flex-nowrap w-full shrink-0 gap-x-2.5 flex-row">
          <div  className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={1} link='a' img={image} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={3}  link='a' img={image} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4}  link='a' img={imageB} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={5}  link='a' img={imageC} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={2}  link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4}  link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
          <div className='grow-0 shrink-0 max-md:basis-1/3 basis-1/4'><ProductCard rate={4}  link='a' img={imageD} product_name='Sample Product' price={3000}></ProductCard></div>
        </div>
        <span onClick={handleScrollCardPosition} data-direction="left" className={`absolute top-1/3 ${availableCardController == "right" && "opacity-20 backdrop-blur-md"} left-0 shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]`}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-3xl">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
          </svg>

        </span>
        <span onClick={handleScrollCardPosition} data-direction="right" className={`absolute top-1/3 right-0 ${availableCardController == "left" && "opacity-20 backdrop-blur-md"}  shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99] `}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-3xl">
            <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
          </svg>
        </span>
      </div>


    </div>
  )
}

export default RecentlyViewed
