"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = () => {

    const path = usePathname();
    const [hoveredIndex, setHoveredIndex] = useState(-1);

    const routes = [
        { route: "/", name: "Home" },
        { route: "/portfolio", name: "Portfolio" },
        { route: "/resume", name: "Resume" },
        { route: "/contact", name: "Contact Me" },
    ];

    return (
        <div className='text-white borderNew backdrop-blur-sm bg-black/30 px-12 py-4 rounded-lg w-fit mx-auto'>
            <div className='space-x-3'>
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
                            <div className='relative z-50' key={idx}>
                                {item.name}
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Navbar;
