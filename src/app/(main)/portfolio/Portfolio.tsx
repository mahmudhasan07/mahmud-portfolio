"use client"
import React from 'react';
import { FaAppStoreIos } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

import projects from "@/assists/project.json"
import Link from 'next/link';

const Portfolio = () => {

    const handleNavigation = (title: string) => {
        const formattedTitle = title.toLowerCase().replace(/\s+/g, '-');
        window.location.href = `/portfolio/${formattedTitle}`;
    }

    return (
        <section className='relative'>
            <h1 className='text-5xl font-bold my-6 text-center text-black'>My Latest Projects</h1>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
                {

                    projects.map((item, idx) =>

                        <div key={idx} className='borderNew2 p-3 space-y-2 relative'>
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
                            <h2 className='text-2xl font-semibold'>{item.title}</h2>
                            <p className=''>{item.description.substring(0, 90)}...</p>
                            <button onClick={()=> handleNavigation(item?.title)} className='bgcolor py-2 px-4 font-semibold  w-full rounded-lg'>More Details</button>
                        </div>

                    )
                }

            </div>

        </section>
    );
};

export default Portfolio;