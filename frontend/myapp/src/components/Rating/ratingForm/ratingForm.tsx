import { ChangeEvent, memo, useMemo, useRef, useState } from 'react'
import "./ratingform-style.css"

const RatingForm = ({ index }: { index?: number }) => {
    const parentRef = useRef<HTMLDivElement>(null)
    return (
        <div ref={parentRef} className="rating">
            {index == 5 ?
                <input checked disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star5" value={"5"} />
                :
                <input disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star5" value={"5"} />
            }
            <label className={index ? "ms-star-label5aki" : "ms-star-label ms-star-label5aki"} htmlFor="star5"></label>

            {index == 4 ?
                <input checked disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star4" value={"4"} />
                :
                <input disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star4" value={"4"} />
            }
            <label className={index ? "ms-star-label4aki" : "ms-star-label ms-star-label4aki"} htmlFor="star4"></label>

            {index == 3 ?
                <input checked disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star3" value={"3"} />
                :
                <input disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star3" value={"3"} />
            }
            <label className={index ? "ms-star-label3aki" : "ms-star-label ms-star-label3aki"} htmlFor="star3"></label>

            {index == 2 ?
                <input checked disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star2" value={"2"} />
                :
                <input disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star2" value={"5"} />
            }
            <label className={index ? "ms-star-label2aki" : "ms-star-label ms-star-label2aki"} htmlFor="star2"></label>

            {index == 1 ?
                <input checked disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star1" value={"1"} />
                :
                <input disabled={index ? true : false} className='ms-star' type="radio" name="star" id="star1" value={"1"} />
            }
            <label className={index ? "ms-star-label1aki" : "ms-star-label ms-star-label1aki"} htmlFor="star1"></label>
        </div>
    )
}


export default RatingForm
