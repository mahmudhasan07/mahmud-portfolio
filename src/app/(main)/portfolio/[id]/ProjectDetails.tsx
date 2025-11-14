"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import projects from "@/assists/project.json";
import { useParams } from 'next/navigation';
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Link from 'next/link';

const ProjectDetails = () => {
   const { id : title } = useParams();
    const data = projects.find(proj => proj.title.toLowerCase().replace(/\s+/g, '-') === title);

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
    const handleMouseDown = (e : any) => {
        if (!zoomed) return;
        setDragging(true);
        setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    // Drag move
    const handleMouseMove = (e : any) => {
        if (!dragging) return;
        const newX = e.clientX - start.x;
        const newY = e.clientY - start.y;
        setPosition({ x: newX, y: newY });
    };

    // Drag end
    const handleMouseUp = () => setDragging(false);

    return (
        <div className="text-white">
            <h1 className='text-5xl font-bold my-6 text-center'>Project Details</h1>

            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-10 items-start mt-12">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
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
                                transform: `scale(${zoomed ? 2.5 : 1}) translate(${position.x / (zoomed ? 2 : 1)}px, ${position.y / (zoomed ? 2 : 1)}px)`,
                                userSelect: 'none', // prevent text/image selection while dragging
                            }}
                            draggable={false} // prevent default drag behavior
                        />
                    </div>

                    {/* Thumbnails */}
                    {data?.images?.length > 1 && (
                        <div className="mt-4 grid grid-cols-3 gap-2">
                            {data?.images.map((imgSrc, index) => (
                                <Image
                                    key={index}
                                    src={imgSrc}
                                    alt={data.title}
                                    width={900}
                                    height={500}
                                    onClick={() => setActiveImage(index)}
                                    className={`rounded-xl shadow-lg border h-24 object-contain border-gray-800 cursor-pointer ${
                                        activeImage === index ? "ring-2 ring-blue-500" : ""
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h2 className="text-3xl font-bold">{data?.title}</h2>
                    <p className="text-gray-300 text-sm">{data?.date}</p>
                    <p className="text-gray-400 leading-relaxed">{data?.description}</p>
                    <p className="text-gray-400 leading-relaxed"><span className='font-semibold text-white'>Role: </span>{data?.role}</p>

                    {/* Links */}
                    <div className="flex gap-3 justify-start p-2 rounded-md">
                        {data?.['appStore-link'] && (
                            <Link href={data['appStore-link']} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors">
                                <FaAppStoreIos className="text-xl" /> App Store
                            </Link>
                        )}
                        {data?.['playStore-link'] && (
                            <Link href={data['playStore-link']} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-green-600 transition-colors">
                                <FaGooglePlay className="text-xl" /> Play Store
                            </Link>
                        )}
                        {data?.['website-link'] && (
                            <Link href={data['website-link']} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-purple-600 transition-colors">
                                <CgWebsite className="text-xl" /> Website
                            </Link>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-lg font-semibold mt-6">Technologies Used:</h3>
                        <ul className="flex flex-wrap gap-3 mt-2">
                            {data?.technologies?.map((tech, index) => (
                                <li key={index} className="bg-gray-800 px-3 py-1 rounded-lg text-sm">{tech}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Features Section</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-300">
                    {data?.features?.map((feature, index) => <li key={index}>{feature}</li>)}
                </ol>
            </div>

            {/* Responsibilities Section */}
            <div className="mt-12 mb-20">
                <h3 className="text-2xl font-bold mb-4">Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    {data?.responsibilities?.map((res, index) => <li key={index}>{res}</li>)}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDetails;
