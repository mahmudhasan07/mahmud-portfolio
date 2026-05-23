"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar/Navbar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isHomePage = pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}

      <main className={`container ${isHomePage ? "pt-5" : "pt-20"}`}>
        {children}
      </main>
    </>
  );
}