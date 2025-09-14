"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { use } from 'react';

const Navbar = () => {

    const path = usePathname();

    const routes = [
        {route : "/", name: "Home"},
        {route : "/Portfolio", name: "Portfolio"},
        {route : "/resume", name: "Resume"},
        {route : "/contact", name: "Contact Me"},
    ]

    return (
        <div className='relative text-white borderNew backdrop-blur-sm bg-black/30 px-12 py-4 rounded-lg w-fit mx-auto'>
            <div className='space-x-3'>
                {
                    routes.map((item) => 
                        <Link href={item.route} className={`px-3 py-2 font-semibold text-lg text-white  ${path === item.route ? "bg-[#6D68FF] rounded-lg" : ""}`} key={item.route}>{item.name}</Link>
                    )
                }
            </div>
        </div>    
);
};

export default Navbar;