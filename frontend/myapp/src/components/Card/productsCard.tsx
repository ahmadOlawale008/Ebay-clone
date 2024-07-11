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
        <div className="block group/product-card relative">
            <a href="#">
                <div className='font-customa p-2 tracking-tight'>
                    <div className="card-img select-none rounded-xl overflow-hidden">
                        <img src={img} alt="" className='w-full relative aspect-square bg-cover bg-no-repeat rounded h-auto block object-cover' />
                    </div>
                    
                    <div className='text-black flex flex-col mt-3'>
                        <div className='product_name'>
                            <h5 className='font-semibold leading-relaxed'>{product_name}</h5>
                        </div>
                        <hr className='my-1' />
                        <div className='mt-2'>
                            <div className='grid grid-cols-3 *:pl-2 first:p!-0 *:w-full items-center justify-center'>
                                <div className='product_card_price !pl-0'>
                                    <h6 className='text-[14px]'>Price</h6>
                                    <span className='font-semibold'>{price}</span>
                                </div>
                                <div className='product_card_discount'>
                                    <h6 className='text-[14px]'>Discount</h6>
                                    <span className='font-semibold'>{price}</span>
                                </div>
                                <div className='product_card_stock'>
                                    <h6 className='text-[14px]'>InStock</h6>
                                    <span className='font-semibold'>30</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="my-1 flex items-center justify-between">
                        <div>
                            <span className='text-base text-neutral-800'>By Jospeh sales</span>
                        </div>
                        <Button color='secondary' size='small' baseClassName='tracking-normal z-10 font-medium' variant='outlined'>
                            <svg className='size-5 !stroke-red-800' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-width="1.6" d="M5.5 5.5H20.0539C21.0375 5.5 21.7549 6.43079 21.5044 7.38198L20.3194 11.882C20.1459 12.5408 19.5502 13 18.8689 13H7.75" />
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="1.6" d="M1.25 2H3.37908C4.04381 2 4.62926 2.43749 4.81761 3.07498L7.49958 12.1524C7.66305 12.7057 7.66351 13.2944 7.50091 13.848L6.575 17H17.5" />
                                <circle cx="6.5" cy="19" r="2" stroke="currentColor" stroke-width="1.6" />
                                <circle cx="17.5" cy="19" r="2" stroke="currentColor" stroke-width="1.6" />
                            </svg>
                        </Button>
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

        </div >
    )
}
export default ProductCard
