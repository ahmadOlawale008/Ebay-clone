import React, { useRef, useState } from 'react'
import { Player } from "@lordicon/react"
import Rating, { RatingType, RatingSizeType } from '../Rating/rating-export'
import Button from '../Button/button'
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
                                <small className='line-through'>₦{price-100}</small>
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
                <span className='absolute  top-4 right-3 bg-secondary-dark z-30'>
                    -30%
                </span>
            </div>
            <div className='ratingu7a block'>
                <Rating rate={rate} />
                <div className="">
                    <span className='text-neutral-600 text-sm'>
                        12 quantitities available
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
