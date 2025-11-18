import { Metadata } from "next";
import Resume from "./Resume";

export const metadata: Metadata = {
  title: "Resume - Mahmud Hasan Siddique",
  description:
    "Resume of Mahmud Hasan Siddique – Full Stack Developer experienced in React, Next.js, Node.js, Express, MongoDB, and Prisma. Includes professional experience, technical skills, education, and project achievements.",
};


export default function Page() {
    return (
        <div>
            <Resume></Resume>
        </div>
    );
}