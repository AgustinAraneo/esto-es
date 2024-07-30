import Image from 'next/image'
import React from 'react'

export const Navbar = () => {
    return (
        <div className='lg:py-3 lg:pl-[48px] py-2 pl-4 bg-white'>
            <Image src={'/logo.webp'} alt='logo' width={50} height={0} />
        </div>
    )
}

