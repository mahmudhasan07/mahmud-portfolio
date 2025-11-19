import { Metadata } from "next";
import Portfolio from "./Portfolio";
import { baseUrl } from "@/Interfaces/BaseUrl";

export const metadata: Metadata = {
  title: "Portfolio - Mahmud Hasan Siddique | Full Stack Web Developer",
  description:
    "Browse the professional portfolio of Mahmud Hasan Siddique, a Full Stack Developer specializing in React, Next.js, Node.js (MVC), Express, MongoDB, Prisma, MySQL, and scalable web application development. View real projects, UI designs, backend systems, and full end-to-end solutions.",
  keywords: [
    "Mahmud Hasan Siddique Portfolio",
    "Mahmud Hasan",
    "Full Stack Developer Portfolio",
    "React Developer Portfolio",
    "Next.js Developer Bangladesh",
    "Node.js Developer",
    "Web Developer Projects",
    "JavaScript Developer Portfolio",
    "Prisma MongoDB Developer",
  ],

  openGraph: {
    title: "Portfolio - Mahmud Hasan Siddique | Full Stack Developer",
    description:
      "Explore real-world projects built using React, Next.js, Node.js, Express, MongoDB, Prisma, and more. Discover scalable APIs, responsive UIs, and production-ready applications by Mahmud Hasan Siddique.",
    url: `${baseUrl}/portfolio`,
    siteName: "Mahmud Hasan Siddique Portfolio",
    type: "website",
    images: [
      {
        url: "https://res.cloudinary.com/daudgshta/image/upload/v1763525401/portfolio/portfolio_txeace.png", // <-- replace
        width: 1200,
        height: 630,
        alt: "Portfolio Preview - Full Stack Developer Mahmud Hasan Siddique",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Mahmud Hasan Siddique",
    description:
      "Explore the web development projects and solutions created by Full Stack Developer Mahmud Hasan Siddique.",
    images: ["https://res.cloudinary.com/daudgshta/image/upload/v1763525401/portfolio/portfolio_txeace.png"], // <-- replace
  },
};

export default function Page() {
  return (
    <div>
      <Portfolio />
    </div>
  );
}
