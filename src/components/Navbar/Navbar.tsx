"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { use } from 'react';

const Navbar = () => {

    const path = usePathname();

    const routes = [
        {route : "/", name: "Home"},
        {route : "/Portfolio", name: "Portfolio"},
        {route : "/contact", name: "Resume"},
        {route : "/contact", name: "Contact Me"},
    ]

    return (
        <div className='relative  '>
            <div>
                {
                    routes.map((item) => 
                        <Link href={item.route} className={`px-2 py-1  ${path === item.route ? "bg-gray-200" : ""} hover:bg-gray-200`} key={item.route}></Link>
                    )
                }
            </div>
        </div>    
);
};

export default Navbar;