import { Metadata } from "next";
import Contact from "./Contact";

export const metadata: Metadata = {
    title: "Contact Me - Mahmud Hasan Siddique",
    description: "Get in touch with Mahmud Hasan Siddique for collaborations, inquiries, or just to say hello. Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB | Mongoose | Prisma | MySQL | JavaScript | Problem-solving.",
    
};


export default function Page() {
    return (
        <div>
            <Contact></Contact>
        </div>
    );
}