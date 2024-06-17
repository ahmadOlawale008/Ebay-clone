import React, { useRef, useState } from 'react'
import { Player } from "@lordicon/react"
import Rating, { RatingType, RatingSizeType } from '../Rating/rating-export'
import Button from '../Button/button'
import Bookmark from '../../assets/icons/bookmark'
interface ProductCard {
    link: string
    img: string,
    product_name: string,
    stars?: "1" | "2" | "3" | "4" | "5",
    price: number
    discount?: number
    discountPrice?: number
    rate: RatingType,
    ratingSize?: RatingSizeType
}
const hearticon = require("../../assets/icons/animated/system-regular-48-favorite-heart.json")
const heartFilledIcon = require("../../assets/icons/animated/system-solid-48-favorite-heart.json")
const ProductCard: React.FC<ProductCard> = ({ link, img, rate, product_name, stars, price, discount, discountPrice }) => {
    const [likedPost, setLikedPost] = useState(false)
    const iconRef = useRef<Player>(null)
    return (
        <div className="block relative">
            <a href="">
                <div className='bg-white p-1'>
                    <div className="card-img select-none rounded-2xl overflow-hidden">
                        <img src={img} alt="" className='w-full relative aspect-square bg-cover bg-no-repeat rounded-md h-auto block object-cover' />
                    </div>
                    <div className="card-text flex gap-y-1 flex-col my-4">
                        <div className="prod-category"><span className='text-base tracking-wide'>Fashion {">"}Men {">"} clothes</span></div>
                        <div className="prod-name"> <span className='text-lg font-medium'>{product_name}</span></div>
                        <div className="prod-price inline-flex text-nowrap space-x-3 items-center text-xl leading-snug font-semibold">
                            <div className="card-discount">
                                <span className='text-secondary-light text-lg'>₦{price}</span>
                            </div>
                            <div className="card-price">
                                <small className='line-through'>₦{price - 100}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div className="">
                <span onClick={() => {
                    iconRef.current?.playFromBeginning()
                }} className='absolute top-4 align-middle inline-flex items-center justify-center cursor-pointer left-3 z-30 bg-white rounded-full p-1'>
                    {likedPost ? <Player onComplete={() => setLikedPost(false)} ref={iconRef} icon={heartFilledIcon} size={21} colorize='#ef2424'></Player> : <Player ref={iconRef} onComplete={() => setLikedPost(true)} size={21} icon={hearticon}></Player>}
                </span>
                <span className='absolute  top-4 right-3 z-30'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 fill-blue-700">
                        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
                    </svg>

                </span>
            </div>
            <div className='ratingu7a block'>
                <Rating rate={rate} />
                <div className="">
                    <span className='text-neutral-800 text-sm font-medium'>
                        out of 60 products
                    </span>
                </div>
                <div className="">
                    <span className='text-neutral-600 text-sm'>
                        12 quantitities are available
                    </span>
                </div>
                <div>
                    <span className='text-neutral-600 text-sm'>
                        212 sold
                    </span>
                </div>
            </div>
            <div className="my-1">
                <Button color='secondary' baseClassName='text-white' fullWidth variant='filled'>Add to cart</Button>
            </div>
        </div >
    )
}
export default ProductCard
