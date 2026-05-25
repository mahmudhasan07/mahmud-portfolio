"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiHome } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { MdContacts } from "react-icons/md";
import { TbCode } from "react-icons/tb";

const Navbar = () => {
  const path = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(-1);

  const routes = [
    { route: "/", name: "Home", icon: <TiHome /> },
    { route: "/portfolio", name: "Portfolio", icon: <GrProjects /> },
    // { route: "/resume", name: "Resume", icon : <CiMemoPad /> },
    { route: "/contact", name: "Contact Me", icon: <MdContacts /> },
  ];

  return (
    <section className="text-white fixed z-50 border border-white/10 bg-[#030816]/70  shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 py-3 rounded-lg w-full mx-auto">
      <div className="flex justify-between container">
        <div className="flex gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
            <TbCode />
          </span>
          <h1 className="text-center londrina text-xl font-bold md:text-2xl">
            Mahmud Hasan Siddique
          </h1>
        </div>
        <div className="space-x-3 flex justify-center gap-1 flex-1">
          {routes.map((item, idx) => (
            <motion.div
              key={item.route}
              className={`relative inline-block`}
              onHoverStart={() => setHoveredIndex(idx)}
              onHoverEnd={() => setHoveredIndex(-1)}
            >
              <Link
                href={item.route}
                className={`px-3 py-1 font-semibold relative block ${path === item.route ? "text-secondary rounded-lg" : " text-white"}`}
              >
                <AnimatePresence>
                  {hoveredIndex === idx && (
                    <motion.span
                      className="absolute inset-0 h-full w-full bg-[#6D68FF] block rounded-lg"
                      layoutId="hoverBackground"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                        transition: { duration: 0.15 },
                      }}
                      exit={{
                        opacity: 0,
                        transition: { duration: 0.15, delay: 0.2 },
                      }}
                    />
                  )}
                </AnimatePresence>
                <div className="relative z-50 flex gap-1">
                  {/* Show icon only for mobile screens */}
                  <div className="block md:text-xl text-2xl my-auto">
                    {item.icon}
                  </div>
                  {/* Show text and icon for larger screens */}
                  <div className="hidden sm:block text-nowrap">{item.name}</div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Navbar;
