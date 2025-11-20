"use client"
import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
import myImage from "@/assists/myProfile1.png"
import { IoLogoGithub } from "react-icons/io";
import Image from 'next/image';
import { motion } from 'framer-motion';

const Contact = () => {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page refresh

        const formData = new FormData(e.currentTarget); // get all form inputs
        const data = Object.fromEntries(formData.entries()); // convert to object

        console.log(data); // log all values
    };

    return (
        <section className=''>
            <h1 className='lg:text-5xl md:text-4xl text-3xl londrina font-bold text-center mb-7'>Contact With Me</h1>
            <section className=" flex md:flex-nowrap flex-wrap justify-center lg:gap-8 md:gap-4 gap-3 h-full md:pb-0 pb-14">

                {/* Left Contact Information */}
                <motion.div
                    className="md:w-1/3 borderNew p-5"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <Image src={myImage} alt="My Image" className='mb-2 mx-auto' />
                    <h1 className="text-2xl font-bold mb-1">Mahmud Hasan Siddique</h1>
                    <h3>Full Stack Developer</h3>
                    <p className='my-3'>Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB | Mongoose | Prisma | MySQL | JavaScript | Problem-solving. Creating the Future, One Line of Code at a Time.</p>

                    <div>
                        <p className='text-[#7C797A] font-semibold'>Phone: <span className='text-white font-normal'>01625598782</span></p>
                        <p className='text-[#7C797A] font-semibold'>Email: <span className='text-white font-normal'>mahmudhasan.hb@gmail.com</span></p>
                    </div>

                    <div className='space-y-2'>
                        <p className='font-semibold text-lg'>Find Me On:</p>
                        <div className='flex gap-3'>
                            <FaFacebookF className='borderNew p-2 text-4xl' />
                            <FaLinkedinIn className='borderNew p-2 text-4xl' />
                            <IoLogoGithub className='borderNew p-2 text-4xl' />
                        </div>
                    </div>
                </motion.div>

                {/* Right Form */}
                <motion.div
                    className='md:w-2/3 w-full rounded-lg p-8 shadow-lg borderNew'
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <form onSubmit={handleSubmit} className="rounded-lg gap-4 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className='space-y-2'>
                                <label className='font-semibold'>Your Name *</label> <br />
                                <input placeholder="First Name" name='name' required className="p-3 inputColor rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-semibold'>Phone number *</label> <br />
                                <input placeholder="Phone Number" name='phone' required className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className='font-semibold'>Email *</label> <br />
                            <input placeholder="Email" required name='email' className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                        </div>

                        <div className="space-y-2">
                            <label className='font-semibold'>Subject *</label> <br />
                            <input placeholder="Subject" type='text' name='subject' required className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                        </div>

                        <div className="space-y-2">
                            <label className='font-semibold'>Additional Details *</label> <br />
                            <textarea placeholder="Additional Details" name="description" className="p-3 rounded-md border-[#AAAAAA] border w-full h-28"></textarea>
                        </div>

                        <motion.button
                            type="submit"
                            className="bg-primary px-10 font-semibold text-white py-3 rounded hover:bg-blue-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ type: 'spring', stiffness: 300 }}
                        >
                            Send Message
                        </motion.button>
                    </form>
                </motion.div>
            </section>

            {/* Toast Notification */}
            <ToastContainer />
        </section>
    );
};

export default Contact;
