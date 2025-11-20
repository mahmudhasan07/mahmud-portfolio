"use client"
import { motion } from "framer-motion";
import myImage from "@/assists/myProfile.png";
import Image from "next/image";

export default function Home() {
    return (
        <div className="space-y-1 mt-2 relative">
            <div className="lg:w-2/3 md:w-4/5 w-full mx-auto space-y-4 text-center">
                <motion.h2
                    className="kaushan lg:text-3xl md:text-2xl text-xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    My name is Mahmud Hasan Siddique. I am working as a
                </motion.h2>
                <motion.h1
                    className="lg:text-7xl md:text-5xl text-4xl londrina font-extrabold text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    Full Stack Developer
                </motion.h1>
            </div>
            <div className="">
                <motion.div
                     initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <Image src={myImage} alt="Mahmud Hasan Siddique" className="w-[28rem] mx-auto" />
                </motion.div>
            </div>
        </div>
    );
}
