import { AnimatePresence, MotionValue, Variants, easeIn, motion, useMotionValue, useTransform } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import React, { useEffect, useRef, useState } from 'react'
import { animateMarquee } from '../../../../utils/animateMarquee'

const ImageScrolll = () => {
    const [pauseAnimation, setPauseAnimationState] = useState(false);
    const marqueeRefs = [useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null), useRef<HTMLDivElement | null>(null)];
    const marqueeIds = [useRef(1), useRef(2), useRef(3)];
    const xs = [useMotionValue(0), useMotionValue(0), useMotionValue(0)];
    const [xPercent, setXPercent] = useState(["0%", "0%", "0%"]);

    useEffect(() => {
        // const pauseFunctions = [
        //     animateMarquee(marqueeRefs[0], marqueeIds[0], 0, 0.4, xs[0], "forward"),
        //     animateMarquee(marqueeRefs[1], marqueeIds[1], -100, 0.4, xs[1], "forward"),
        //     animateMarquee(marqueeRefs[2], marqueeIds[2], -200, 0.4, xs[2], "forward")
        // ];

        xs.forEach((xmotion, index) => {
            xmotion.on("change", (xValue) => {
                setXPercent(prev =>
                    prev.map((item, idx) => (idx === index ? `${xValue}%` : item))
                );
            });
        });

        return () => {
            // pauseFunctions.forEach(pause => pause && pause());
        };
    }, [xs]);

    return (
        <div className='overflow-hidden py-3 bg-gray-100'>
            <motion.div className='marqueeContainer gap-0 flex flex-nowrap'>
                {marqueeRefs.map((_, ind) => (
                    <motion.div
                        key={ind}
                        ref={marqueeRefs[ind]}
                        style={{ transform: `translateX(${xPercent[ind]}) translateZ(0px)` }}
                        transition={{ type: "tween" }}
                        className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start"
                    >
                        {ScrollContent.map((d) => (
                            <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                                <Button
                                    baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose'
                                    rounded='none'
                                    color='primary'
                                    iconClassName='size-12'
                                    variant='text'
                                    icon={d.src}
                                >
                                    {d.category}
                                </Button>
                            </motion.div>
                        ))}
                    </motion.div>
                ))}
            </motion.div>
            <div className="flex items-end justify-end mt-2">
                <div onClick={() => setPauseAnimationState(!pauseAnimation)} className="pause-animation inline-block cursor-pointer hover:scale-[1.09] active:scale-[0.91] bg-gray-300 rounded-full p-3 mr-20">
                    <AnimatePresence>
                        {!pauseAnimation ? (
                            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em] font-black text-3xl">
                                <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                            </motion.svg>
                        ) : (
                            <motion.svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[1em] h-[1em] font-black text-3xl">
                                <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                            </motion.svg>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
export default ImageScrolll
