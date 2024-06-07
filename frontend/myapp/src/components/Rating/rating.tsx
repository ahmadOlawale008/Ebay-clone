import React from 'react'
import "./rating-styles.css"
const Rating = () => {
    return (
        <div className="rating">
            <input type="radio" className='ms-star' id="star1" name="rate1" value="1" />
            <label htmlFor="rate1"></label>
            <input type="radio" className='ms-star' id="star2" name="rate2" value="2" />
            <label htmlFor="rate2"></label>
            <input type="radio" className='ms-star' id="star3" name="rate3" value="3" />
            <label htmlFor="rate3"></label>
            <input type="radio" className='ms-star' id="star4" name="rate4" value="4" />
            <label htmlFor="rate4"></label>
            <input type="radio" className='ms-star' id="star5" name="rate5" value="5" />
            <label htmlFor="rate5"></label>
        </div>
    )
}

export default Rating
