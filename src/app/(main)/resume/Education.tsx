"use client"
import React from 'react';
import education from '@/assists/Education.json';
import { motion } from 'framer-motion';

const Education = () => {
    return (
        <section>
            <h1 className='lg:text-4xl md:text-3xl text-2xl londrina font-bold my-8'>Education Qualification</h1>

            <div className='space-y-5'>
                {
                    education.map((item, idx) => (
                        <motion.div
                            key={idx}
                            className='space-y-2 p-5 borderNew2 text-start'
                            initial={{ opacity: 0, y: 50 }}  // Initially hidden and moved down
                            animate={{ opacity: 1, y: 0 }}   // Fade in and move up
                            transition={{ duration: 0.5, delay: idx * 0.2 }}  // Staggered delay
                        >
                            <div className='flex justify-between'>
                                <div className='space-y-1'>
                                    <h2 className='text-2xl font-semibold'>{item.title}</h2>
                                    <p className='font-semibold'>{item.institution}</p>
                                    <p><span className='font-semibold'>Session:</span> {item.session}</p>
                                    <p><span className='font-semibold'>Passing Year:</span> {item.endDate}</p>
                                </div>
                                <h1 className='bgcolor w-fit rounded-lg my-auto px-4 py-2 font-semibold'>{item.cgpa}/{item.outOf}</h1>
                            </div>
                            <p>{item.description}</p>
                        </motion.div>
                    ))
                }
            </div>

        </section>
    );
};

export default Education;
