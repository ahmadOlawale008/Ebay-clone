import { motion } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import { useScroll } from 'framer-motion'
const ImageScrolll = () => {
    const {scrollYProgress} = useScroll()
    return (
        <div className='border-y-4 flex overflow-hidden flex-nowrap border-neutral-700 bg-gray-50'>
            {/* <marquee behavior="" direction=""></marquee> */}
            <motion.div className="flex shrink-0 w-full  flex-row  justify-evenly items-start">
                {ScrollContent.map((d) => <div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                    <Button baseClassName='px-3 flex w-full flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-9' variant='text'  icon={d.src}>{d.category}</Button>
                </div>)}
            </motion.div>
            <motion.div className="flex w-full shrink-0 justify-evenly items-start">
                {ScrollContent.map((d) => <div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                    <Button baseClassName='px-3 flex w-full flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-9' variant='text' icon={d.src}>{d.category}</Button>
                </div>)}
            </motion.div>
            <motion.div className="flex w-full shrink-0 justify-evenly items-start">
                {ScrollContent.map((d) => <div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                    <Button baseClassName='px-3 flex w-full flex-col py-2 active:scale-1 active:shadow-none font-normal !text-lg tracking-tight leading-loose' rounded='none' color='primary' iconClassName='size-9' variant='text' icon={d.src}>{d.category}</Button>
                </div>)}
            </motion.div>
        </div>
    )
}

export default ImageScrolll
