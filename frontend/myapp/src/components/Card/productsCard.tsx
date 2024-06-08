import React, { useRef, useState } from 'react'
import { Player } from "@lordicon/react"
import Rating, { RatingType } from '../Rating/rating-export'
interface ProductCard {
    link: string
    img: string,
    product_name: string,
    stars?: "1" | "2" | "3" | "4" | "5",
    price: number
    discount?: number
    discountPrice?: number
    rate: RatingType
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
                        <div className="prod-category"><span className='text-lg tracking-wide'>Fashion {">"}Men {">"} clothes</span></div>
                        <div className="prod-name"> <span className='text-xl font-semibold'>{product_name}</span></div>
                        <div className="prod-price text-xl leading-snug font-semibold">
                            <span>₦{price}</span>
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
            </div>
            <div className='ratingu7a'>
                <Rating rate={rate} />
            </div>
        </div >
    )
}
export default ProductCard
