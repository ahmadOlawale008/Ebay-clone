import React, { ClassAttributes } from 'react'
import "./rating-style.css"
import { twMerge } from 'tailwind-merge'
export type RatingType = 1 | 2 | 3 | 4 | 5
export type RatingSizeType = "sm" | "md" | "lg"
export type BaseRatingCLassNameType = ClassAttributes<HTMLDivElement>
export type className = string
const Rating = ({ rate, size ="md" }: { rate: RatingType, size?: RatingSizeType }) => {
  const width_size = rate == 1 ? "w-1/5" : rate == 2 ? "w-2/5" : rate == 3 ? "w-3/5" : rate == 4 ? "w-4/5" : "w-full"
  const star_size = size == "sm"? "w-[75px] h-[15px]" : "w-[100px] h-[20px]"
  return (
    <div className={twMerge("star relative", star_size)}>
      <div className={`star-in ${width_size}`}></div>
    </div>
  )
}
export default Rating