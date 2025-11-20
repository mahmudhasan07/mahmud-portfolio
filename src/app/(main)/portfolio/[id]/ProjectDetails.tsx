"use client";
import Image from "next/image";
import React, { useState } from "react";
import projects from "@/assists/project.json";
import { useParams } from "next/navigation";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Link from "next/link";
import { motion } from "framer-motion";

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
      <div className="text-white flex items-center justify-center">
        <h2 className="text-2xl">Project Not Found</h2>
      </div>
    );
  }

  // Zoom toggle on double-click
  const handleDoubleClick = () => {
    if (!zoomed) {
      setZoomed(true);
    } else {
      setZoomed(false);
      setPosition({ x: 0, y: 0 }); // reset position when zooming out
    }
  };

  // Drag start
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!zoomed) return;
    setDragging(true);
    setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  // Drag move
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const newX = e.clientX - start.x;
    const newY = e.clientY - start.y;
    setPosition({ x: newX, y: newY });
  };

  // Drag end
  const handleMouseUp = () => setDragging(false);

  // Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const topSectionVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const leftColVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const rightColVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const blockVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const listItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className="text-white"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <motion.h1
        className="lg:text-5xl md:text-4xl text-3xl londrina font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        Project Details
      </motion.h1>

      {/* Top Section */}
      <motion.div
        className="flex flex-col md:flex-row gap-10 items-start mt-12"
        variants={topSectionVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2"
          variants={leftColVariants}
        >
          <div
            className="relative w-full h-96 overflow-hidden border rounded-xl border-gray-800 cursor-zoom-in"
            onDoubleClick={handleDoubleClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <Image
              src={data.images[activeImage]}
              alt={data.title}
              width={900}
              height={500}
              className={`transition-transform duration-150 ease-in-out object-contain h-full w-full ${
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
          </div>

          {/* Thumbnails */}
          {data?.images?.length > 1 && (
            <div className="mt-4 grid grid-cols-3 gap-2">
              {data.images.map((imgSrc, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 250, damping: 18 }}
                  className="rounded-xl"
                  onClick={() => setActiveImage(index)}
                >
                  <Image
                    src={imgSrc}
                    alt={data.title}
                    width={900}
                    height={500}
                    className={`rounded-xl shadow-lg border h-24 object-contain border-gray-800 cursor-pointer ${
                      activeImage === index ? "ring-2 ring-blue-500" : ""
                    }`}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Info Section */}
        <motion.div
          className="w-full md:w-1/2 space-y-4"
          variants={rightColVariants}
        >
          <h2 className="text-3xl font-bold">{data?.title}</h2>
          <p className="text-gray-300 text-sm">{data?.date}</p>
          <p className="text-gray-400 leading-relaxed">{data?.description}</p>
          <p className="text-gray-400 leading-relaxed">
            <span className="font-semibold text-white">Role: </span>
            {data?.role}
          </p>

          {/* Links */}
          <div className="flex flex-wrap gap-3 justify-start p-2 rounded-md">
            {data?.["appStore-link"] && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={data["appStore-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors"
                >
                  <FaAppStoreIos className="text-xl" /> App Store
                </Link>
              </motion.div>
            )}
            {data?.["playStore-link"] && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={data["playStore-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-green-600 transition-colors"
                >
                  <FaGooglePlay className="text-xl" /> Play Store
                </Link>
              </motion.div>
            )}
            {data?.["website-link"] && (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href={data["website-link"]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-purple-600 transition-colors"
                >
                  <CgWebsite className="text-xl" /> Website
                </Link>
              </motion.div>
            )}
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mt-6">
              Technologies Used:
            </h3>
            <motion.ul
              className="flex flex-wrap gap-3 mt-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08 },
                },
              }}
            >
              {data?.technologies?.map((tech, index) => (
                <motion.li
                  key={index}
                  variants={listItemVariants}
                  className="bg-gray-800 px-3 py-1 rounded-lg text-sm"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 260, damping: 18 }}
                >
                  {tech}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-12"
        variants={blockVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-bold mb-4">Features Section</h3>
        <motion.ol
          className="list-decimal pl-6 space-y-2 text-gray-300"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {data?.features?.map((feature, index) => (
            <motion.li key={index} variants={listItemVariants}>
              {feature}
            </motion.li>
          ))}
        </motion.ol>
      </motion.div>

      {/* Responsibilities Section */}
      <motion.div
        className="mt-12 mb-20"
        variants={blockVariants}
        initial="hidden"
        animate="visible"
      >
        <h3 className="text-2xl font-bold mb-4">Responsibilities</h3>
        <motion.ul
          className="list-disc pl-6 space-y-2 text-gray-300"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {data?.responsibilities?.map((res, index) => (
            <motion.li key={index} variants={listItemVariants}>
              {res}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetails;
