import myImage from "@/assists/myProfile.png"
import Image from "next/image";

export default function Page() {
    return (
        <div className="space-y-1  relative">
            <div className="lg:w-2/3 md:w-4/5 w-full mx-auto space-y-4 text-center">
                <h2 className="kaushan lg:text-4xl md:text:2xl text-xl  ">My name is Mahmud Hasan Siddique. I am working as a</h2>
                <h1 className="lg:text-8xl md:text-5xl text-4xl londrina font-extrabold text-transparent">Full Stack Developer</h1>
            </div>
            <div>
                <Image src={myImage} alt="" className="w-[26rem] mx-auto"></Image>
            </div>
        </div>
    );
}