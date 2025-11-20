"use client"
import React from 'react';
import { FaAppStoreIos } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { motion } from 'framer-motion';
import projects from "@/assists/project.json"
import Link from 'next/link';

const Portfolio = () => {

    const handleNavigation = (title: string) => {
        const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/portfolio/${formattedTitle}`;
    }

    return (
        <section className='relative'>
            <h1 className='lg:text-5xl md:text-4xl text-3xl londrina font-bold mb-10 text-center'>My Latest Projects</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20'>
                {
                    projects.map((item, idx) =>
                        <motion.div
                            key={idx}
                            className='borderNew2 p-3 space-y-2 relative'
                            whileInView={{ opacity: 1, x: 0 }} // Triggers when the item comes into view
                            initial={{ opacity: 0, x: -100 }} // Initially, the item is hidden and off-screen
                            viewport={{ once: false, amount: 0.2 }} // Trigger when 20% of the component is in view
                            transition={{ duration: 0.6, delay: idx * 0.05 }}
                        >
                            {
                                item?.images && <img id="projectimage" src={item?.images[0] || ""} alt={item.title} className='rounded-lg w-full h-72 object-cover object-top' />
                            }
                            <div className="flex gap-3 justify-start p-2 rounded-md">
                                {item?.['appStore-link'] && (
                                    <Link
                                        href={item['appStore-link']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-semibold text-base cursor-pointer hover:text-blue-600 transition-colors"
                                    >
                                        <FaAppStoreIos className="text-lg" />
                                        <span>App Store</span>
                                    </Link>
                                )}

                                {item?.['playStore-link'] && (
                                    <Link
                                        href={item['playStore-link']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-semibold text-base cursor-pointer hover:text-green-600 transition-colors"
                                    >
                                        <FaGooglePlay className="text-lg" />
                                        <span>Play Store</span>
                                    </Link>
                                )}

                                {item?.['website-link'] && (
                                    <Link
                                        href={item['website-link']}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 font-semibold text-base cursor-pointer hover:text-purple-600 transition-colors"
                                    >
                                        <CgWebsite className="text-lg" />
                                        <span>Website</span>
                                    </Link>
                                )}
                            </div>

                            <motion.h2
                                className='text-2xl font-semibold'
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.4 }}
                            >
                                {item.title}
                            </motion.h2>

                            <motion.p
                                className=''
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                {item.description.substring(0, 90)}...
                            </motion.p>

                            <motion.button
                                onClick={() => handleNavigation(item?.title)}
                                className='bgcolor py-2 px-4 font-semibold w-full rounded-lg'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                More Details
                            </motion.button>
                        </motion.div>
                    )
                }
            </div>
        </section>
    );
};

export default Portfolio;
