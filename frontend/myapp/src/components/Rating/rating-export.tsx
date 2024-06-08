import React from 'react'
import "./rating-style.css"
export type RatingType = 1 | 2 | 3 | 4 | 5
const Rating = ({ rate }: { rate: RatingType }) => {
  return (
    <div className={"star relative w-[100px] h-[20px]"}>
      <div className={`star-in w-${rate}/5`}></div>
    </div>
  )
}

export default Rating
