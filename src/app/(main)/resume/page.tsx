import { Metadata } from "next";
import Resume from "./Resume";
import { baseUrl } from "@/Interfaces/BaseUrl";

export const metadata: Metadata = {
    title: "Resume - Mahmud Hasan Siddique | Full Stack Developer CV",
    description:
        "View the professional resume of Mahmud Hasan Siddique, a Full Stack Developer skilled in React, Next.js, Node.js, Express, MongoDB, Prisma, and MySQL. Includes work experience, education, technical skills, projects, and achievements.",
    keywords: [
        "Mahmud Hasan Siddique Resume",
        "Mahmud Hasan CV",
        "Full Stack Developer Resume",
        "React Developer Resume",
        "Next.js Developer CV",
        "Node.js Developer Resume",
        "Bangladesh Web Developer Resume",
        "JavaScript Developer CV",
        "Prisma MongoDB Developer",
    ],

    openGraph: {
        title: "Resume - Mahmud Hasan Siddique | Full Stack Developer",
        description:
            "Professional resume and CV of Full Stack Developer Mahmud Hasan Siddique. Includes experience, skills, education, and major projects built using React, Next.js, Node.js, MongoDB, Prisma, and more.",
        url: `${baseUrl}/resume`,
        siteName: "Mahmud Hasan Siddique Portfolio",
        type: "profile",
        images: [
            {
                url: "https://res.cloudinary.com/daudgshta/image/upload/v1763525401/portfolio/resume_wolbny.png", // <-- replace this
                width: 1200,
                height: 630,
                alt: "Resume of Full Stack Developer Mahmud Hasan Siddique",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Resume - Mahmud Hasan Siddique",
        description:
            "Explore the full resume of Full Stack Developer Mahmud Hasan Siddique, including skills, experience, and education.",
        images: ["https://res.cloudinary.com/daudgshta/image/upload/v1763525401/portfolio/resume_wolbny.png"], // <-- replace
    },
};

export default function Page() {
    return (
        <div>
            <Resume />
        </div>
    );
}
