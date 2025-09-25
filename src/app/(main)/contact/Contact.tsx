"use client"
import React, { useState } from 'react';
import { FaFacebookF, FaLinkedinIn, FaPhoneVolume } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaMapLocationDot } from "react-icons/fa6";
// import { useBookingMutation } from '@/Redux/Api/bookingApi';
import ShowToastify from '@/utils/ShowToastify';
import { ToastContainer } from 'react-toastify';
import myImage from "@/assists/myProfile1.png"
import { IoLogoGithub } from "react-icons/io";
import Image from 'next/image';

const Contact = () => {

    //   const [bookingFn] = useBookingMutation();


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // prevent page refresh

        const formData = new FormData(e.currentTarget); // get all form inputs
        const data = Object.fromEntries(formData.entries()); // convert to object

        console.log(data); // log all values

        // const { data: res, error } = await bookingFn(data);

        // console.log(res);
        // console.log(error);

        // if (error && ('data' in error || 'response' in error)) {
        //   const data = 'data' in error && error.data as any;
        //   ShowToastify({ error: data?.message });
        // } else {
        //   ShowToastify({ success: res.message });
        // }


    };

    return (
        <section className='py-16'>
            <h1 className='text-5xl font-bold text-center mb-7'>Contact With Me</h1>
            <section className="container mx-auto md:px-7 px-3 flex md:flex-nowrap flex-wrap justify-center lg:gap-8 md:gap-5 gap-3 h-full">
                <div className='md:w-1/3 borderNew p-5'>
                    <Image src={myImage} alt="My Image" className=' mb-2 mx-auto'></Image>
                    <h1 className="text-2xl font-bold mb-1">Mahmud Hasan Siddique</h1>
                    <h3 >Full Stack Developer</h3>
                    <p className='my-3'>Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB | Mongoose | Prisma | MySQL | JavaScript | Problem-solving. Creating the Future, One Line of Code at a Time.</p>

                    <div>
                        <p className='text-[#7C797A] font-semibold'>Phone: <span className='text-white font-normal'>01625598782</span></p>
                        <p className='text-[#7C797A] font-semibold'>Email: <span className='text-white font-normal'>mahmudhasan.hb@gmail.com</span></p>
                    </div>

                    <div className='space-y-2 h-full'>
                        <p className='font-semibold text-lg'>Find Me On:</p>
                        <div className='flex gap-3'>
                            <FaFacebookF className='borderNew p-2 text-4xl' />
                            <FaLinkedinIn className='borderNew p-2 text-4xl' />
                            <IoLogoGithub className='borderNew p-2 text-4xl' />
                        </div>
                    </div>

                </div>

                <div className='md:w-2/3 h-full rounded-lg p-8 shadow-lg borderNew'>
                    {/* add onSubmit here */}
                    <form onSubmit={handleSubmit} className="rounded-lg gap-4 space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className='space-y-2'>
                                <label className='font-semibold'>Your Name *</label> <br />
                                <input placeholder="First Name" name='name' required className="p-3 inputColor rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                            <div className='space-y-2'>
                                <label className='font-semibold'>Phone number *</label> <br />
                                <input placeholder="Last Name" name='email' required className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                        </div>

                        <div className="">
                            <div className='space-y-2'>
                                <label className='font-semibold'>Email *</label> <br />
                                <input placeholder="Phone Number" required name='email' className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                        </div>

                        <div className="">
                            <div className='space-y-2'>
                                <label className='font-semibold'>Subject *</label> <br />
                                <input placeholder="Subject" type='text' name='subject' required className="p-3 rounded-md border-[#AAAAAA] border w-full" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className='font-semibold'>Additional Details *</label> <br />
                            <textarea placeholder="Additional Details" name="description" className="p-3 rounded-md border-[#AAAAAA] border w-full h-28"></textarea>
                        </div>

                        <button type="submit" className="bg-primary px-10 font-semibold text-white py-3 rounded hover:bg-blue-700">
                            Send Message
                        </button>
                    </form>
                </div>
            </section>
            <ToastContainer></ToastContainer>
        </section>
    );
};

export default Contact;
