import { AnimatePresence, MotionValue, Variants, easeIn, motion, useMotionValue, useTransform } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import React, { useEffect, useRef, useState } from 'react'
import { animateMarquee } from '../../../../utils/animateMarquee'
type MoveMarqueeType = {
    ease: number,
    current: number
    target: number
}
type marqueeFunctionType = {
    cmd?: "start" | "end" | "pause",
    timeStamp?: 1
}
const ImageScrolll = () => {
    const marqueeRef = useRef<HTMLDivElement | null>(null)
    const marqueeId = useRef(0)
    const x = useMotionValue(0)
    const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    useEffect(()=>{
        animateMarquee(marqueeRef, marqueeId, 0, 1, x)
    }, [x])
    return (
        <div className='overflow-hidden py-3 bg-gray-100'>
            <motion.div className='marqueeContainer gap-0 flex flex-nowrap'>
                <motion.div ref={marqueeRef} style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start">
                    {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                        <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                    </motion.div>)}
                </motion.div>
                <motion.div style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start">
                    {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                        <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                    </motion.div>)}
                </motion.div>
                <motion.div style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start">
                    {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                        <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                    </motion.div>)}
                </motion.div>
            </motion.div>
            <div className="flex items-end justify-end mt-2">
                <div onClick={() => setPauseAnimationState(!pauseAnimation)} className="pause-animation  inline-block cursor-pointer hover:scale-[1.09] active:scale-[0.91] bg-gray-300 rounded-full p-3 mr-20">
                    <AnimatePresence>
                        {!pauseAnimation ? <motion.svg variants={svgVariants} animate="visible" initial="hidden" exit={"exit"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em] font-black text-3xl">
                            <path fill-rule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clip-rule="evenodd" />
                        </motion.svg>
                            : <motion.svg variants={svgVariants} animate="visible" initial="hidden" exit={"exit"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em] font-black text-3xl">
                                <path fill-rule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clip-rule="evenodd" />
                            </motion.svg>
                        }
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}
export default ImageScrolll
