import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import bgImage from "@/assists/bg.png";
import myImage from "@/assists/myProfile1.png";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmud Hasan Siddique",
  description: "Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB | Mongoose | Prisma | MySQL | JavaScript | Problem-solving. Creating the Future, One Line of Code at a Time.",
  icons: {
    icon: myImage.src as string
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Kaushan+Script&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 min-h-screen">
          <Image src={bgImage} alt="" className="h-full object-none"></Image>
        </div>
        <div className="relative container text-white top-16">
          {children}
        </div>
        <div className="relative text-white container top-6 bottom-0 ">
          <Navbar></Navbar>
        </div>
      </body>
    </html>
  );
}
