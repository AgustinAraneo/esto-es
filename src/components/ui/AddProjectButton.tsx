import React from 'react'
import { Button } from './shadcn/button'
import Link from 'next/link'

export const AddProyectButton = () => {
    return (
        <div className='flex justify-between items-center px-4 border-t-[1px] border-b-[1px] py-1 border-bordes bg-white'>
            <h2 className='text-titulos text-[16px] font-[600] leading-8'>My projects</h2>
            <Link href={'/add'}>
                <Button variant={'primary'} className='flex items-center text-white text-[12px] leading-4'>
                    <span className='text-[20px] leading-none pr-1 '>+</span>
                    Add project
                </Button>
            </Link>
        </div>
    )
}

