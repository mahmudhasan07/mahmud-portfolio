import { Metadata } from "next";
import Blogs from "./Blogs";
import { baseUrl } from "@/Interfaces/BaseUrl";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blogs - Mahmud Hasan Siddique | Full Stack Developer",
  description:
    "Read articles and development notes by Mahmud Hasan Siddique about JavaScript, React, Next.js, Node.js, and modern full stack web development.",
  keywords: [
    "Mahmud Hasan Siddique Blog",
    "Mahmud Hasan Blogs",
    "JavaScript Developer Blog",
    "React Developer Blog",
    "Next.js Blog",
    "Full Stack Developer Blog",
    "Web Development Articles",
  ],
  openGraph: {
    title: "Blogs - Mahmud Hasan Siddique",
    description:
      "Explore web development articles, JavaScript notes, and full stack engineering thoughts from Mahmud Hasan Siddique.",
    url: `${baseUrl}/blogs`,
    siteName: "Mahmud Hasan Siddique Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blogs - Mahmud Hasan Siddique",
    description:
      "Read web development articles and full stack engineering notes from Mahmud Hasan Siddique.",
  },
};

export default function Page() {
  return <Blogs />;
}
