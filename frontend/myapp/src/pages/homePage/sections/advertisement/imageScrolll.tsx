import { motion } from 'framer-motion'
import Button from '../../../../components/Button/button'
import { ScrollContent } from './scrollContent'
import { useScroll } from 'framer-motion'
const ImageScrolll = () => {
    const {scrollYProgress} = useScroll()
    return (
        <div className='border-y-4 border-neutal-900 border-slate-200'>
            <motion.div className="flex w-full overflow-hidden flex-row  justify-evenly items-start">
                {ScrollContent.map((d) => <div key={d.id} className='flex flex-1 basis-full flex-col items-center'>
                    <Button baseClassName='px-3 flex w-full flex-col active:scale-1 active:shadow-none !text-xl' style={{fontWeight: 900}} rounded='none' color='primary' iconClassName='size-9' variant='text'  icon={d.src}>{d.category}</Button>
                </div>)}
                {ScrollContent.map((d) => <div key={d.id} className='flex flex-col items-center justify-center'>
                    <Button baseClassName='px-3 flex w-full flex-col active:scale-1 active:shadow-none !text-xl' style={{ fontWeight: 900 }} rounded='none' color='primary' iconClassName='size-9' variant='text' icon={d.src}>{d.category}</Button>
                </div>)}
                {/* {ScrollContent.map((d) => <div key={d.id} className='flex flex-col items-center justify-center'>
                    <Button baseClassName='px-3 flex  flex-col active:scale-1 active:shadow-none !text-xl' style={{ fontWeight: 900 }} rounded='none' color='primary' iconClassName='size-9' variant='text' icon={d.src}>{d.category}</Button>
                </div>)} */}
            </motion.div>
        </div>
    )
}

export default ImageScrolll
