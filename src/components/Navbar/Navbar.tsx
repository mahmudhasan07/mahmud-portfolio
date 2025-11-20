"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { TiHome } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { CiMemoPad } from "react-icons/ci";
import { MdContacts } from "react-icons/md";

const Navbar = () => {

    const path = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const routes = [
        { route: "/", name: "Home", icon : <TiHome />  },
        { route: "/portfolio", name: "Portfolio", icon : <GrProjects /> },
        { route: "/resume", name: "Resume", icon : <CiMemoPad /> },
        { route: "/contact", name: "Contact Me", icon : <MdContacts /> },
    ];

    return (
        <div className='text-white borderNew backdrop-blur-sm bg-black/30 md:px-12 px-8 py-3 rounded-lg w-fit mx-auto'>
            <div className='space-x-3 flex gap-1'>
                {routes.map((item, idx) => (
                    <motion.div
                        key={item.route}
                        className={`relative inline-block`}
                        onHoverStart={() => setHoveredIndex(idx)}
                        onHoverEnd={() => setHoveredIndex(-1)}
                    >
                        <Link
                            href={item.route}
                            className={`px-3 py-1 font-semibold text-lg text-white relative block ${path === item.route ? "bg-[#6D68FF] rounded-lg" : ""}`}
                        >
                            <AnimatePresence>
                                {hoveredIndex === idx && (
                                    <motion.span
                                        className="absolute inset-0 h-full w-full bg-[#6D68FF] block rounded-lg"
                                        layoutId="hoverBackground"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: 1,
                                            transition: { duration: 0.15 },
                                        }}
                                        exit={{
                                            opacity: 0,
                                            transition: { duration: 0.15, delay: 0.2 },
                                        }}
                                    />
                                )}
                            </AnimatePresence>
                            <div className='relative z-50 flex gap-1'>
                                {/* Show icon only for mobile screens */}
                                <div className="block md:text-xl text-2xl my-auto">
                                    {item.icon}
                                </div>
                                {/* Show text and icon for larger screens */}
                                <div className="hidden sm:block text-nowrap">
                                    {item.name}
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
