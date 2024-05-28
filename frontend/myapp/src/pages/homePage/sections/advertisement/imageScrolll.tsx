import React, { lazy } from 'react'
import closetClothes from "../../../../assets/icons/closet-clothes-furniture-2-svgrepo-com.svg"
import devicesIcon from "../../../../assets/icons/devices-svgrepo-com.svg"
import foodDinnerIcon from "../../../../assets/icons/food-dinner-svgrepo-com.svg"
import gemIcon from "../../../../assets/icons/gem-svgrepo-com.svg"
import phoneMobileIcon from "../../../../assets/icons/phone-mobile-user-svgrepo-com.svg"
import shoeIcon from "../../../../assets/icons/sports-shoes-1-svgrepo-com.svg"
import Button from '../../../../components/Button/button'
const ImageScrolll = () => {
    const scrollContent = [{
        id: 1,
        src: closetClothes,
        category: "Clothes",
    },
    {
        id: 2,
        src: devicesIcon,
        category: "Devices",
    },
    {
        id: 3,
        src: foodDinnerIcon,
        category: "Food",
    },
    {
        id: 4,
        src: gemIcon,
        category: "Jewelries",
    },
    {
        id: 5,
        src: phoneMobileIcon,
        category: "Mobile Phone"
    },
    {
        id: 6,
        src: shoeIcon,
        category: "Shoe"
    }
    ]
    console.log(scrollContent)
    return (
        <div className=' border-t border-b border-black'>
            <div className="flex flex-row justify-evenly items-start">
                {scrollContent.map((d)=> <div key={d.id} className='flex flex-col items-center justify-center'>
                    <Button color='secondary' size='large' icon={d.src}>{d.category}</Button>
                </div>)}
            </div>
        </div>
    )
}

export default ImageScrolll
