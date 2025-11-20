import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import bgImage from "@/assists/bg.png";
import myImage from "@/assists/myProfile1.png";
import Image from "next/image";
import Navbar from "@/components/Navbar/Navbar";
import ParticlesBackground from "@/components/ParticlesBackground/ParticlesBackground";
import { baseUrl } from "@/Interfaces/BaseUrl";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mahmud Hasan Siddique | Full Stack Developer (React, Next.js, Node.js)",
  description:
    "Welcome to the portfolio of Mahmud Hasan Siddique — a Full Stack Developer specializing in React, Next.js, Node.js (MVC), Express, MongoDB, Mongoose, Prisma, MySQL, and JavaScript. Passionate about building scalable systems, intuitive UI, and modern web applications that solve real-world problems.",

  icons: {
    icon: myImage.src as string, // favicon or logo
  },

  keywords: [
    "Mahmud Hasan Siddique",
    "Mahmud Hasan",
    "Full Stack Developer",
    "Full Stack Web Developer Bangladesh",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "JavaScript Developer",
    "Prisma Developer",
    "MongoDB Developer",
    "Web Developer Portfolio",
    "Full Stack Developer Portfolio",
    "Hire Web Developer",
    "Mahmud Hasan Portfolio",
    "Mahmud Hasan Resume",
    "Mahmud Hasan Contact",
  ],

  openGraph: {
    title: "Mahmud Hasan Siddique | Full Stack Web Developer",
    description:
      "Explore the work and skills of Full Stack Developer Mahmud Hasan Siddique — specializing in React, Next.js, Node.js, Express, MongoDB, Prisma, and modern web technologies.",
    url: `${baseUrl}`,
    siteName: "Mahmud Hasan Siddique Portfolio",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/daudgshta/image/upload/v1763525410/portfolio/home_xfkqsh.png", // your OG image
        width: 1200,
        height: 630,
        alt: "Mahmud Hasan Siddique - Full Stack Developer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Mahmud Hasan Siddique | Full Stack Developer",
    description:
      "View the portfolio of Full Stack Developer Mahmud Hasan Siddique and explore projects built with React, Next.js, Node.js, MongoDB & Prisma.",
    images: ["https://res.cloudinary.com/daudgshta/image/upload/v1763525410/portfolio/home_xfkqsh.png"],
  },
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen `}
      >
        <div className="absolute top-0 left-0 right-0 h-full">
          <Image src={bgImage} alt="" className="h-full"></Image>
        </div>
        <ParticlesBackground />

        <div className="relative container text-white pt-12 pb-2">
          {children}
        </div>
        <div className="fixed text-white container mx-auto w-fit left-1/2 -translate-x-1/2  bottom-0 ">
          <Navbar></Navbar>
        </div>
      </body>
    </html>
  );
}
