"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TiHome } from "react-icons/ti";
import { GrProjects } from "react-icons/gr";
import { MdContacts } from "react-icons/md";
import { TbArticle, TbCode, TbMenu2, TbX } from "react-icons/tb";

const Navbar = () => {
  const path = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const routes = [
    { route: "/", name: "Home", icon: <TiHome /> },
    { route: "/portfolio", name: "Portfolio", icon: <GrProjects /> },
    { route: "/blogs", name: "Blogs", icon: <TbArticle /> },
    { route: "/contact", name: "Contact Me", icon: <MdContacts /> },
  ];

  const isActiveRoute = (route: string) =>
    route === "/" ? path === route : path.startsWith(route);

  return (
    <section className="fixed left-0 right-0 top-3 z-50 px-3 text-white sm:px-5">
      <div className="container relative rounded-xl border border-white/10 bg-[#030816]/80 px-3 py-2 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 sm:px-4">
        <div className="flex min-w-0 items-center justify-between gap-3">
          <Link
            href="/"
            onClick={() => setIsMenuOpen(false)}
            className="flex min-w-0 items-center gap-2"
            aria-label="Go to home"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
              <TbCode />
            </span>
            <h1 className="londrina truncate text-xl font-bold sm:text-2xl lg:text-[1.65rem]">
              Mahmud Hasan Siddique
            </h1>
          </Link>

          <div className="hidden items-center justify-end gap-1 md:flex">
            {routes.map((item, idx) => (
              <motion.div
                key={item.route}
                className="relative"
                onHoverStart={() => setHoveredIndex(idx)}
                onHoverEnd={() => setHoveredIndex(-1)}
              >
                <Link
                  href={item.route}
                  className={`relative block rounded-lg px-3 py-2 font-semibold transition lg:px-4 ${
                    isActiveRoute(item.route)
                      ? "text-secondary"
                      : "text-white hover:text-white"
                  }`}
                >
                  <AnimatePresence>
                    {hoveredIndex === idx && (
                      <motion.span
                        className="absolute inset-0 block h-full w-full rounded-lg bg-secondary"
                        layoutId="hoverBackground"
                        initial={{ opacity: 0 }}
                        animate={{
                          opacity: isActiveRoute(item.route) ? 0.16 : 1,
                          transition: { duration: 0.15 },
                        }}
                        exit={{
                          opacity: 0,
                          transition: { duration: 0.15, delay: 0.2 },
                        }}
                      />
                    )}
                  </AnimatePresence>
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="text-xl">{item.icon}</span>
                    <span className="whitespace-nowrap">{item.name}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            aria-label={
              isMenuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isMenuOpen}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-2xl text-white transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary md:hidden"
          >
            {isMenuOpen ? <TbX /> : <TbMenu2 />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
              className="absolute left-3 right-3 top-[calc(100%+0.5rem)] overflow-hidden rounded-xl border border-white/10 bg-[#030816]/95 p-2 shadow-[0_20px_70px_rgba(0,0,0,0.35)] backdrop-blur backdrop-saturate-150 sm:left-4 sm:right-4 md:hidden"
            >
              <nav className="grid gap-1">
                {routes.map((item) => (
                  <Link
                    key={item.route}
                    href={item.route}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-3 text-base font-semibold transition ${
                      isActiveRoute(item.route)
                        ? "bg-secondary/15 text-secondary"
                        : "text-white/80 hover:bg-white/[0.04] hover:text-white"
                    }`}
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-secondary/20 bg-secondary/10 text-xl text-secondary">
                      {item.icon}
                    </span>
                    <span>{item.name}</span>
                  </Link>
                ))}
              </nav>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Navbar;
