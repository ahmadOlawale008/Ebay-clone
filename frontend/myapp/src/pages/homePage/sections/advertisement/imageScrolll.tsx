import { motion, useMotionValue } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import { WheelEventHandler, useEffect, useRef } from 'react'
const ImageScrolll = () => {
    const marqueeRef = useRef<HTMLDivElement | null>(null)
    const x = useMotionValue(0)
    const
    return (
        <div className="">
            <div className=' overflow-hidden bg-gray-100'>
                <motion.div ref={marqueeRef} className='marqueeContainer gap-0 flex flex-nowrap'>
                    <motion.div style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex bg-blue-400 marquee02 whitespace-nowrap w-full shrink-0 justify-evenly items-start">
                        {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                            <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                        </motion.div>)}
                    </motion.div>
                    <motion.div style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex bg-blue-400 marquee02 whitespace-nowrap w-full shrink-0 justify-evenly items-start">
                        {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                            <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                        </motion.div>)}
                    </motion.div>
                    <motion.div style={{ x }} transition={{ type: "tween" }} onClick={(e) => console.log(e.currentTarget.offsetWidth)} className="flex bg-blue-400 marquee02 whitespace-nowrap w-full shrink-0 justify-evenly items-start">
                        {ScrollContent.map((d) => <motion.div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                            <Button baseClassName='px-3 flex w-full gap-y-2 flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-12' variant='text' icon={d.src}>{d.category}</Button>
                        </motion.div>)}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    )
}
export default ImageScrolll
