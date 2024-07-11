import React, { forwardRef, MutableRefObject, useEffect } from 'react'
import { AvailableCardController, handleScrollCardPosition } from '../../utils/scrollHorizontal';
interface ScrollBtnType {
    ref: React.RefObject<HTMLDivElement>,
    availableCardController: AvailableCardController
}
const ScrollButton = forwardRef<HTMLDivElement, ScrollBtnType>(({availableCardController}, ref)=>{
    const divRef = ref as React.RefObject<HTMLDivElement>;
    useEffect(()=>{
        console.log(divRef, "Refernce")
    }, [divRef])
    if (divRef.current && divRef.current.scrollWidth > divRef.current.clientWidth) {
        return (
            <div aria-hidden={false}>
                <span onClick={(e) => handleScrollCardPosition(e, divRef, availableCardController)} data-direction="left" className={`absolute top-1/3 ${availableCardController == "right" && "opacity-20 backdrop-blur-md"} -left-5 shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99]`}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-lg">
                        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z" clipRule="evenodd" />
                    </svg>
                </span>
                <span onClick={(e) => handleScrollCardPosition(e, divRef, availableCardController)} data-direction="right" className={`absolute top-1/3 ${availableCardController == "left" && "opacity-20 backdrop-blur-md"} -right-5  shadow-lg shadow-neutral-500 cursor-pointer  bg-white rounded-full inline-flex items-center justify-center p-2 hover:bg-gray-300 active:scale-[0.99] `}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-[1em] font-black text-lg">
                        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                    </svg>
                </span>
            </div>
        )
    }
    else {
        return <></>
    }
})

export default ScrollButton

//     ({ ref, availableCardController }: ScrollBtnType) => {
//     console.log(ref, "Refrence")

// }