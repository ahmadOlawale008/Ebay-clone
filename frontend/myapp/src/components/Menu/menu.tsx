import React from 'react'
interface productType {
    id: number,
    name: string
}
const products: productType[] = [
    { id: 1, name: "About" },
    { id: 2, name: "Products" },
    { id: 3, name: "Categories" },
    { id: 4, name: "Waitlists" },
    { id: 5, name: "Tech" },

]
const Menu = ({items, subItem}:{items:object, subItem?:object}) => {
    return (
        <div className='absolute bottom-0 left-0'>
            <ul className="inline-flex list-none items-start px-3 py-4">
                {products.map((d)=><li key={d.id}>
                    <a href="">{d.name}</a>
                </li>)}
            </ul>
        </div>
    )
}

export default Menu
