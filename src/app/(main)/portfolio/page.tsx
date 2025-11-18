import { Metadata } from "next";
import Portfolio from "./Portfolio";

export const metadata: Metadata = {
  title: "Portfolio - Mahmud Hasan Siddique",
  description:
    "Explore the portfolio of Mahmud Hasan Siddique, a Full Stack Developer specializing in React, Next.js, Node.js, Express, MongoDB, Prisma, and modern web application development. Skilled in building scalable APIs, responsive UIs, and complete end-to-end solutions.",
};
export default function Page() {
    return (
        <div>
            <Portfolio></Portfolio>
        </div>
    );
}