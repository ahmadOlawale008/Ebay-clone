import React from 'react'
import "./advertisement-category.css"
import shopImage from "../../../../../assets/images/d63d3f60-d994-428d-aa74-09af3cd2e6a8.png"
import Rating from '../../../../../components/Rating/rating-export'
import Button from '../../../../../components/Button/button'
import { motion, useMotionValue } from 'framer-motion'
const AdvertisementCategory = () => {
  const x = useMotionValue(0)
  return (
    <div className='mx-auto w-full'>
      <div className='w-full px-12 ads-contentua719  rounded-2xl py-12  overflow-hidden min-h-[540px] bg-slate-100'>
        <div className="grid h-[inherit] grid-cols-3 text-white gap-x-12 items-center justify-around">
          <div className="adscontent-text">
            <h3 className='text-2xl leading-snug font-bold'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa cum dolore libero nostrum.</h3>
            <h6 className='text-lg mt-3'>Lorem, ipsum dolor.</h6>
          </div>
          <div className="adscontent-card col-span-2 flex items-start justify-">
            <div className="w-[550px] h-[450px] relative">
              <motion.div drag="x" style={{ x, rotate: "-6deg" }} dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }} transition={{ type: "spring", stiffness: 30 }} className="glassmorphism absolute cursor-grab active:cursor-grabbing origin-bottom -rotate-6 shrink-0 w-[550px] z-[10] px-6 py-8 overflow-hidden">
                <div className="flex items-center glassmorphism-content justify-between mx-auto">
                  <div className="glassmorphism-text select-none basis-1/2">
                    <div className="smallheader-ai8a">
                      <span className='text-base font-thin'>Lorem ipsum dolor sit.</span>
                    </div>
                    <div className="bigheader-auaj my-3">
                      <h6 className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vel nam sit.</h6>
                    </div>
                    <div className="smallheader-ai8a">
                      <span className='text-base font-light'>Lorem ipsum sit.</span>
                    </div>
                  </div>
                  <div className="glassmorphism-image">
                    <img src={shopImage} draggable={'false'} className='shoe-image w-[300px] select-none' alt="shoeimage" />
                  </div>
                </div>
                <div className="glassmorphism-action">
                  <Button size='small' variant='filled' color='primary' baseClassName='shadow-btn bg-white '>Shop Now</Button>
                </div>
              </motion.div>
              <motion.div style={{ transform: "translateX(33%) rotate(-6deg)" }} className="glassmorphism z-[9] -ml-11 origin-bottom -rotate-3 absolute top-0 -left-0 shrink-0 w-[550px] px-6 py-8 overflow-hidden">
                <div className="flex  items-center glassmorphism-content justify-between mx-auto">
                  <div className="glassmorphism-text select-none basis-1/2">
                    <div className="smallheader-ai8a">
                      <span className='text-base font-thin'>Lorem ipsum dolor sit.</span>
                    </div>
                    <div className="bigheader-auaj my-3">
                      <h6 className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vel nam sit.</h6>
                    </div>
                    <div className="smallheader-ai8a">
                      <span className='text-sm font-light'>Lorem ipsum sit.</span>
                    </div>
                  </div>
                  <div className="glassmorphism-image">
                    <img src={shopImage} draggable={'false'} className='shoe-image w-[300px] select-none' alt="shoeimage" />
                  </div>
                </div>
                <div className="glassmorphism-action">
                  <Button size='small' variant='filled' color='primary' baseClassName='shadow-btn bg-white '>Shop Now</Button>
                </div>
              </motion.div>
              <motion.div style={{ transform: "translateX(66%) rotate(-6deg)" }} className="glassmorphism z-[8] -ml-11  origin-bottom -rotate-3 absolute top-0 left-0 shrink-0 w-[550px] px-6 py-8 overflow-hidden">
                <div className="flex items-center glassmorphism-content justify-between mx-auto">
                  <div className="glassmorphism-text select-none basis-1/2">
                    <div className="smallheader-ai8a">
                      <span className='text-base font-thin'>Lorem ipsum dolor sit.</span>
                    </div>
                    <div className="bigheader-auaj my-3">
                      <h6 className='text-lg font-bold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil vel nam sit.</h6>
                    </div>
                    <div className="smallheader-ai8a">
                      <span className='text-sm font-light'>Lorem ipsum sit.</span>
                    </div>
                  </div>
                  <div className="glassmorphism-image">
                    <img src={shopImage} draggable={'false'} className='shoe-image w-[300px] select-none' alt="shoeimage" />
                  </div>
                </div>
                <div className="glassmorphism-action">
                  <Button size='small' variant='filled' color='primary' baseClassName='shadow-btn bg-white '>Shop Now</Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvertisementCategory