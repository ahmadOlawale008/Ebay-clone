import React from 'react'
import "./rating-style.css"
export type RatingType = 1 | 2 | 3 | 4 | 5
const Rating = ({ rate }: { rate: RatingType }) => {
  const width_size = rate == 1 ? "w-1/5" : rate == 2 ? "w-2/5" : rate == 3 ? "w-3/5" : rate == 4 ? "w-4/5" : "w-full"
  return (
    <div className={"star relative w-[100px] h-[20px]"}>
      <div className={`star-in ${width_size}`}></div>
    </div>
  )
}
export default Rating
