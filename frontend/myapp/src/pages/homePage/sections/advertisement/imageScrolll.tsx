import { AnimatePresence, motion, } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import { useEffect, useRef, useState } from 'react'
import { animateMarquee } from '../../../../utils/animateMarquee';
const closeAnimation = (id: number) => cancelAnimationFrame(id);

const ImageScrolll = () => {
    const [pauseAnimation, setPauseAnimationState] = useState(false);
    const marqueeRef = useRef<HTMLDivElement | null>(null)
    const marqueeRefB = useRef<HTMLDivElement | null>(null)
    const marqueeId = useRef(1)
    const marqueeIdB = useRef(2)
    const runAnimation = (pause: boolean = false)  => {
        if (marqueeRef.current && marqueeRef.current) {
            animateMarquee({element: marqueeRef, elementId: marqueeId, current: 0, speed: 0.05, direction: 1, pause: pause})
            animateMarquee({ element: marqueeRefB, elementId: marqueeIdB, current: 0, speed: 0.05, direction: -1, pause: pause })

        }
    }
    useEffect(() => {
        runAnimation(pauseAnimation)
    }, [pauseAnimation]);
    return (
        <div className='overflow-hidden  py-5 bg-gray-100'>
            <div className="-rotate-1 mt-4">
                <div className="border-t-2 border-neutral-900">
                    <motion.div ref={marqueeRef} className='marqueeContainer relative gap-0 inline-flex flex-nowrap justify-between'>
                        {[0, 1, 2].map((_, ind) => (
                            <motion.div
                                key={ind}
                                transition={{ type: "tween" }}
                                className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start"
                            >
                                {ScrollContent.map((d) => (
                                    <motion.a href={d.link} key={d.id} className='flex flex-1 basis-full items-center'>
                                        <Button
                                            baseClassName='px-3  inline-flex w-full items-center justify-center text-center py-4 active:scale-1 active:shadow-none font-medium !text-lg tracking-tight leading-loose'
                                            rounded='none'
                                            color='primary'
                                            iconClassName='size-12'
                                            variant='text'
                                            icon={d.src}
                                        >
                                            {d.category}
                                        </Button>
                                    </motion.a>
                                ))}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
                <div className=" border-b-2 border-t-2 border-neutral-800">
                    <motion.div ref={marqueeRefB} className='marqueeContainer relative gap-0 inline-flex flex-nowrap justify-between'>
                        {[0, 1, 2].map((_, ind) => (
                            <motion.div
                                key={ind}
                                transition={{ type: "tween" }}
                                className="flex marquee02 whitespace-nowrap w-full shrink-0 justify-between items-start"
                            >
                                {ScrollContent.map((d) => (
                                    <motion.a href={d.link} key={d.id} className='flex flex-1 basis-full items-center'>
                                        <Button
                                            baseClassName='px-3 inline-flex w-full items-center justify-center text-center py-4 active:scale-1 active:shadow-none font-medium !text-lg tracking-tight leading-loose'
                                            rounded='none'
                                            color='primary'
                                            iconClassName='size-12'
                                            variant='text'
                                            icon={d.src}
                                        >
                                            {d.category}
                                        </Button>
                                    </motion.a>
                                ))}
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
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
        </div>
    );
};
export default ImageScrolll
