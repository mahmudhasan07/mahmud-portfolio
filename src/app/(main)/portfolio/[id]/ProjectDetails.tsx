"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { motion } from "framer-motion";
import {
  TbArrowLeft,
  TbCalendar,
  TbCode,
  TbExternalLink,
  TbListCheck,
  TbPhoto,
  TbUserCode,
} from "react-icons/tb";
import projects from "@/assists/project.json";

const listItemVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: "easeOut" },
  },
};

const ProjectDetails = () => {
  const { id: title } = useParams();
  const data = projects.find(
    (proj) => proj.title.toLowerCase().replace(/\s+/g, "-") === title
  );

  const [activeImage, setActiveImage] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  if (!data) {
    return (
      <div className="grid min-h-[60vh] place-items-center text-white">
        <div className="rounded-2xl border border-white/10 bg-[#030816]/70 p-6 text-center shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur">
          <h2 className="text-2xl font-bold">Project Not Found</h2>
          <Link
            href="/portfolio"
            className="mt-4 inline-flex items-center gap-2 rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-white"
          >
            <TbArrowLeft />
            Back to Portfolio
          </Link>
        </div>
      </div>
    );
  }

  const handleDoubleClick = () => {
    if (!zoomed) {
      setZoomed(true);
    } else {
      setZoomed(false);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const newX = e.clientX - start.x;
    const newY = e.clientY - start.y;
    setPosition({ x: newX, y: newY });
  };

  const handleMouseUp = () => setDragging(false);

  return (
    <motion.section
      className="pb-16 text-white"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
        >
          <TbArrowLeft />
          Portfolio
        </Link>

        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
            <TbCode />
          </span>
          <h1 className="text-2xl font-bold md:text-3xl">Project Details</h1>
        </div>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

          <div
            className="relative h-[420px] cursor-zoom-in overflow-hidden rounded-xl border border-white/10 bg-[#081126]"
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {data.images?.[activeImage] ? (
              <Image
                src={data.images[activeImage]}
                alt={data.title}
                width={1100}
                height={720}
                className={`h-full w-full object-contain transition-transform duration-150 ease-in-out ${
                  zoomed ? "cursor-zoom-out" : "cursor-zoom-in"
                }`}
                style={{
                  transform: `scale(${zoomed ? 2.5 : 1}) translate(${
                    position.x / (zoomed ? 2 : 1)
                  }px, ${position.y / (zoomed ? 2 : 1)}px)`,
                  userSelect: "none",
                }}
                draggable={false}
              />
            ) : (
              <div className="grid h-full place-items-center text-white/40">
                <TbPhoto className="text-5xl" />
              </div>
            )}
          </div>

          {data?.images?.length > 1 && (
            <div className="relative mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
              {data.images.map((imgSrc, index) => (
                <button
                  key={imgSrc}
                  type="button"
                  onClick={() => {
                    setActiveImage(index);
                    setZoomed(false);
                    setPosition({ x: 0, y: 0 });
                  }}
                  className={`h-20 overflow-hidden rounded-lg border bg-[#081126] transition ${
                    activeImage === index
                      ? "border-secondary ring-2 ring-secondary/30"
                      : "border-white/10 hover:border-secondary/40"
                  }`}
                >
                  <Image
                    src={imgSrc}
                    alt={`${data.title} preview ${index + 1}`}
                    width={260}
                    height={160}
                    className="h-full w-full object-cover object-top"
                  />
                </button>
              ))}
            </div>
          )}
        </motion.div>

        <motion.aside
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative">
            <h2 className="text-2xl font-bold leading-tight md:text-3xl">
              {data.title}
            </h2>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-medium text-white/60">
                <TbCalendar className="text-secondary" />
                {data.date}
              </span>
              <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-medium text-white/60">
                <TbUserCode className="text-secondary" />
                {data.role}
              </span>
            </div>

            <p className="mt-4 text-sm leading-7 text-white/70">
              {data.description}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {data?.["appStore-link"] && (
                <Link
                  href={data["appStore-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                >
                  <FaAppStoreIos className="text-base" />
                  App Store
                  <TbExternalLink className="text-sm" />
                </Link>
              )}
              {data?.["playStore-link"] && (
                <Link
                  href={data["playStore-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                >
                  <FaGooglePlay className="text-base" />
                  Play Store
                  <TbExternalLink className="text-sm" />
                </Link>
              )}
              {data?.["website-link"] && (
                <Link
                  href={data["website-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                >
                  <CgWebsite className="text-base" />
                  Website
                  <TbExternalLink className="text-sm" />
                </Link>
              )}
            </div>

            <div className="mt-6">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-400" />
                <h3 className="font-semibold text-white/85">
                  Technologies Used
                </h3>
              </div>
              <motion.ul
                className="flex flex-wrap gap-2"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.05 } },
                }}
              >
                {data?.technologies?.map((tech) => (
                  <motion.li
                    key={tech}
                    variants={listItemVariants}
                    className="rounded-md border border-secondary/20 bg-secondary/10 px-2 py-1 text-xs font-medium text-white/70"
                  >
                    {tech}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </div>
        </motion.aside>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <motion.section
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.1 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
              <TbListCheck />
            </span>
            <h3 className="text-xl font-bold">Features</h3>
          </div>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {data?.features?.map((feature, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="rounded-lg border border-white/10 bg-[#081126] px-3 py-3 text-sm leading-6 text-white/70"
              >
                {feature}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        <motion.section
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.16 }}
        >
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
              <TbUserCode />
            </span>
            <h3 className="text-xl font-bold">Responsibilities</h3>
          </div>
          <motion.ul
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.05 } },
            }}
          >
            {data?.responsibilities?.map((res, index) => (
              <motion.li
                key={index}
                variants={listItemVariants}
                className="rounded-lg border border-white/10 bg-[#081126] px-3 py-3 text-sm leading-6 text-white/70"
              >
                {res}
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </div>
    </motion.section>
  );
};

export default ProjectDetails;
