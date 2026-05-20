"use client";

import Image from "next/image";
import React from "react";
import banner from "@/assists/banner.png";
import myImage from "@/assists/myProfile11.png";

const Profile = () => {
  return (
    <section className="relative w-[40%] overflow-hidden rounded-3xl border border-white/20 bg-gray-100/10 p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur backdrop-saturate-150">
      {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_42%,rgba(109,104,255,0.16))]" />
      <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" /> */}

      <div className="relative">
        <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-inner">
          <Image
            src={banner}
            className="h-56 w-full object-cover opacity-90"
            alt="profile banner"
          />
        </div>

        <div className="relative -mt-10 flex justify-center">
          <div className="rounded-full border-4 border-white/25 bg-white/20 p-1 shadow-xl backdrop-blur-md">
            <Image
              src={myImage}
              className="h-36 w-36 rounded-full object-cover"
              alt="profile image"
            />
          </div>
        </div>
      </div>
<div>
    <h1 className="londrina text-transparent text-center text-3xl font-semibold">Mahmud Hasan Siddique</h1>
    <h2 className="text-center text-white/80 text-xl font-semibold">Full Stack Developer</h2>
   <p className='my-3'>Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB | Mongoose | Prisma | MySQL | JavaScript | Problem-solving. Creating the Future, One Line of Code at a Time.</p>
  <div>
   <p className='text-[#7C797A] font-semibold'>Phone: <span className='text-white font-normal'>01625598782</span></p>
<p className='text-[#7C797A] font-semibold'>Email: <span className='text-white font-normal'>mahmudhasan.hb@gmail.com</span></p>
                    </div>
</div>
      
    </section>
  );
};

export default Profile;
