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
            <a href="#">
                <div className='bg-white'>
                    <div className="card-img select-none rounded-2xl overflow-hidden">
                        <img src={img} alt="" className='w-full relative aspect-square bg-cover bg-no-repeat rounded-md h-auto block object-cover' />
                    </div>
                    <div className="card-text flex gap-y-[0.1rem] flex-col">
                        <div className="prod-category"><span className='text-xs font-normal'>Fashion{" > "}Men{" > "}Clothes</span></div>
                        <div className="prod-name"> <span className='text-base hover:underline font-semibold'>{product_name.substring(0, 150)}</span></div>
                        <div className="prod-price inline-flex text-nowrap space-x-2 items-center text-lg leading-snug font-medium">
                            <div className="card-discount">
                                <span className=' text-[#0f743b] text-base'>Now <span>₦{price}</span></span>
                            </div>
                            <div className="card-price">
                                <small className='line-through font-semibold text-slate-800 text-sm'>₦{price - 100}</small>
                            </div>
                            <div className="product-discount">
                                <small className='text-sm text-zinc-800 font-normal'>(50% off)</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='ratingu7a block  text-sm font-medium'>
                    <div className='inline-flex space-x-1 items-center'>
                        <span>
                            4.9
                        </span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                        </svg>
                        <span className='dot size-1 rounded-full bg-black'></span>
                        <span className='text-xs'>(1.3k) Reviews</span>
                    </div>
                    <div className="">
                        <span className='text-neutral-800 tracking-tight text-[0.8rem] font-normal'>
                            out of 60 products
                        </span>
                    </div>
                    <div className="">
                        <span className='text-neutral-600 tracking-tight font-normal text-[0.8rem]'>
                            12 quantitities are available
                        </span>
                    </div>
                    
                </div>
            </a>
            <div className="">
                <span onClick={() => {
                    iconRef.current?.playFromBeginning()
                }} className='absolute top-4 align-middle inline-flex items-center justify-center cursor-pointer left-3 z-30 bg-white rounded-full p-1'>
                    {likedPost ? <Player onComplete={() => setLikedPost(false)} ref={iconRef} icon={heartFilledIcon} size={21} colorize='#ef2424'></Player> : <Player ref={iconRef} onComplete={() => setLikedPost(true)} size={21} icon={hearticon}></Player>}
                </span>
                <span className='absolute top-4 align-middle inline-flex items-center justify-center right-3 z-30'>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-4 fill-blue-600">
                        <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 0 0-.584.859 6.753 6.753 0 0 0 6.138 5.6 6.73 6.73 0 0 0 2.743 1.346A6.707 6.707 0 0 1 9.279 15H8.54c-1.036 0-1.875.84-1.875 1.875V19.5h-.75a2.25 2.25 0 0 0-2.25 2.25c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75 2.25 2.25 0 0 0-2.25-2.25h-.75v-2.625c0-1.036-.84-1.875-1.875-1.875h-.739a6.706 6.706 0 0 1-1.112-3.173 6.73 6.73 0 0 0 2.743-1.347 6.753 6.753 0 0 0 6.139-5.6.75.75 0 0 0-.585-.858 47.077 47.077 0 0 0-3.07-.543V2.62a.75.75 0 0 0-.658-.744 49.22 49.22 0 0 0-6.093-.377c-2.063 0-4.096.128-6.093.377a.75.75 0 0 0-.657.744Zm0 2.629c0 1.196.312 2.32.857 3.294A5.266 5.266 0 0 1 3.16 5.337a45.6 45.6 0 0 1 2.006-.343v.256Zm13.5 0v-.256c.674.1 1.343.214 2.006.343a5.265 5.265 0 0 1-2.863 3.207 6.72 6.72 0 0 0 .857-3.294Z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
            <div className="my-1">
                <Button color='secondary' baseClassName='text-white text-[14px] tracking-normal font-medium' fullWidth variant='filled'>Add to cart</Button>
            </div>
        </div >
    )
}
export default ProductCard
