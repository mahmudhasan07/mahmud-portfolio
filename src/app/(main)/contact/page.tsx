import { Metadata } from "next";
import Contact from "./Contact";
import { baseUrl } from "@/Interfaces/BaseUrl";

export const metadata: Metadata = {
    title: "Contact Mahmud Hasan Siddique | Full Stack Developer | Get In Touch",
    description:
        "Reach out to Mahmud Hasan Siddique, a Full Stack Developer specializing in React, Next.js, Node.js (MVC), Express, MongoDB, Prisma, and MySQL. For project collaborations, freelance opportunities, or inquiries — contact now.",
    keywords: [
        "Mahmud Hasan Siddique",
        "Mahmud Hasan",
        "Contact Mahmud Hasan",
        "Full Stack Developer Bangladesh",
        "React Developer",
        "Next.js Developer",
        "Node.js Developer Bangladesh",
        "Contact Full Stack Developer",
        "Web Developer Portfolio",
    ],

    openGraph: {
        title: "Contact Mahmud Hasan Siddique | Full Stack Web Developer",
        description:
            "Have a project or idea? Contact Mahmud Hasan Siddique for professional web development using React, Next.js, Node.js, MongoDB, Prisma & modern tech stack.",
        url: `${baseUrl}/contact`,
        siteName: "Mahmud Hasan Siddique Portfolio",
        type: "website",
        images: [
            {
                url: "https://res.cloudinary.com/daudgshta/image/upload/v1763525401/portfolio/conatct_nuwgb3.png", // <-- change this
                width: 1200,
                height: 630,
                alt: "Mahmud Hasan Siddique - Full Stack Developer",
            },
        ],
    },

    twitter: {
        card: "summary_large_image",
        title: "Contact | Mahmud Hasan Siddique",
        description:
            "Get in touch with Full Stack Developer Mahmud Hasan Siddique for collaborations and inquiries.",
        images: ["https://your-domain.com/your-image.jpg"], // <-- change this
    },
};

export default function Page() {
    return (
        <div>
            <Contact />
        </div>
    );
}
