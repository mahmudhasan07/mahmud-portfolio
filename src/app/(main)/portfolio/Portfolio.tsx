"use client"
import React from 'react';
import { FaAppStoreIos } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";

import projects from "@/assists/project.json"

const Portfolio = () => {
    return (
        <section>
            <h1 className='text-5xl font-bold my-5 text-center'>My Latest Projects</h1>

            <div>
                {

                    projects.map((item, idx) =>

                        <div className='borderNew2 p-3'>
                            <img src="" alt="" />
                            <div>
                                <p className='cursor-pointer flex gap-2 font-semibold text-xl'>{item?.['appStore-link'] ?
                                    <p className='cursor-pointer flex gap-1 font-semibold text-base'><span className='my-auto text-xl'><FaAppStoreIos /></span>App Store</p>
                                    : <p></p>
                                }</p>
                                <p>{item?.['playStore-link'] ?
                                    <p className='cursor-pointer flex gap-1 font-semibold text-base'><span className='my-auto text-xl'><FaGooglePlay /></span>Play Store</p>
                                    : <p></p>
                                }</p>
                                <p>{item?.['website-link'] ?
                                    <p className='cursor-pointer flex gap-1 font-semibold text-base'><span className='my-auto text-xl'><CgWebsite /></span>Website</p>
                                    : <p></p>
                                }</p>
                            </div>
                            <h2 className='text-2xl font-semibold'>{item.title}</h2>
                        </div>

                    )
                }

            </div>

        </section>
    );
};

export default Portfolio;