import React, { MouseEventHandler, UIEventHandler, useEffect, useRef, useState } from 'react'
import { motion } from "framer-motion"
import "./topcategories-styles.css"
import foodImage from "../../../../assets/images/thomas-le-pRJhn4MbsMM-unsplash.jpg"

import Button from '../../../../components/Button/button'
type AvailableCardController = "left" | "right" | "both"
type ScrollTasks = "right" | "left" | "default"
const TopCategories = () => {
  const categoriesWrapperRef = useRef<HTMLDivElement | null>(null)
  const topCategoriesProducts = Array.from({ length: 14 }, (_, prev) => prev + 1)
  const allCardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [availableCardController, setAvailableCardController] = useState<AvailableCardController>("right")
  const [scrollPercentage, setScrollPercentage] = useState(25)
  const handleContainerScroll = (e: Event, moveTo: ScrollTasks = "default") => {
    const element = e.currentTarget as HTMLDivElement
    const clientWidth = element.clientWidth
    const scrollLeft = element.scrollLeft
    const scrollWidth = element.scrollWidth
    const distance = scrollLeft + clientWidth
    console.log(scrollWidth, distance)
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
  categoriesWrapperRef.current?.addEventListener("scroll", handleContainerScroll)
  const containerVariant = {
    visible: {
      transition: {
        when: "beforeChildren"
      }
    },
    hidden: {

    }
  }
  const childrenVariants = {
    visible: {
      display: "none"
    },
    hidden: {

    }
  }
  return (
    <div>
      <div className="rounded-md px-3 py-5">
        <h3 className='text-3xl font-bold'>Top Categories</h3>
        <div className="mt-5 relative">
          <motion.div
            ref={categoriesWrapperRef}
            className="flex cardWrap0a1  cursor-grab overflow-x-auto w-full space-x-3 flex-nowrap flex-row ">
            {topCategoriesProducts.map((item, index) => <motion.div key={index} variants={containerVariant} ref={(el) => allCardsRef.current[item] = el} className="h-[500px] relative  basis-3/12 overflow-hidden shrink-0 rounded-md">
              <img className='w-full relative h-full aspect-auto' src={foodImage} alt="Food Image" />
              <motion.div variants={childrenVariants} className="absolute  z-10 pl-2 gap-y-2 py-4 top-0 text-wrap w-full flex flex-nowrap justify-between items-center text-white left-0">
                <span className='text-xl font-semibold'>Six Pieces-in-1 Quality Ankle Socks</span>
                <span className='text-md bg-secondary p-1 text-white'>-18%</span>
              </motion.div>
              <motion.div variants={childrenVariants} className="absolute  z-10 px-2 justify-between  w-full py-4 bottom-0 flex text-white left-0">
                <div className="aseya8 gap-y-2 inline-grid">
                  <span className='text-xl font-semibold'>₦ 1,799</span>
                  <span className='text-md font-normal line-through'>₦ 6,799</span>
                </div>
                <Button iconPosition='end' color='primary' variant='text' baseClassName='shadow-none' icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1em] h-[1em]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
                }>
                  Visit
                </Button>
              </motion.div>
              <div className="absolute  hover:backdrop-blur ease-in-out gradient-overlapping-cardai top-0 left-0 w-full h-full"></div>
            </motion.div>)}
          </motion.div>
          <span onClick={handleScrollCardPosition} data-direction="left" className={`absolute top-1/2 ${availableCardController == "right" && "opacity-20 backdrop-blur-md"} left-0 shadow-lg shadow-neutral-500 cursor-pointer  bg-neutral-100 rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em] text-4xl">
              <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
            </svg>
          </span>
          <span onClick={handleScrollCardPosition} data-direction="right" className={`absolute top-1/2 right-0 ${availableCardController == "left" && "opacity-20 backdrop-blur-md"}  shadow-lg shadow-neutral-500 cursor-pointer  bg-neutral-100 rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99] `}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[1em] h-[1em] text-4xl ">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  )
}

export default TopCategories
