'use client';
import React from 'react';

import bgImage from "@/assists/newbg.jpg"
import Image from 'next/image';

const Home2 = () => {
    return (
        <div>
            <div className="absolute top-0 left-0 right-0 h-full">
          <Image src={bgImage} height={0} width={3000} alt="" className="h-full"></Image>
        </div>
        </div>
    );
};

export default Home2;