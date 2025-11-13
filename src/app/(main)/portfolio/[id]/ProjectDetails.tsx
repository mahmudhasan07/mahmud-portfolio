"use client";
import Image from 'next/image';
import React, { use } from 'react';
import projects from "@/assists/project.json"
import { useParams } from 'next/navigation';
import { FaAppStoreIos } from "react-icons/fa";
import { FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import Link from 'next/link';

const ProjectDetails = () => {

    const title = useParams().id;
    const data = projects.find(proj => proj.title.toLowerCase().replace(/\s+/g, '-') === title);
    if (!data) {
        return <div className="text-white flex items-center justify-center">
            <h2 className="text-2xl">Project Not Found</h2>
        </div>;
    }


    return (
        <div className="text-white ">
            <h1 className='text-5xl font-bold my-6 text-center'>Project Details</h1>
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-10 items-start mt-12">
                {/* Image Section */}
                <div className="w-full md:w-1/2">
                    <Image
                        src="/images/levaro-screenshot.png" // change to your image path
                        alt="Levaro Project"
                        width={900}
                        height={500}
                        className="rounded-xl shadow-lg border border-gray-800"
                    />
                </div>

                {/* Info Section */}
                <div className="w-full md:w-1/2 space-y-4">
                    <h2 className="text-3xl font-bold">{data.title}</h2>
                    <p className="text-gray-300 text-sm">{data.date}</p>
                    <p className="text-gray-400 leading-relaxed">{data.description}</p>
                    <p className="text-gray-400 leading-relaxed"><span className='font-semibold text-white'>Role: </span>{data.role}</p>


                    {/* Links */}
                    <div className="flex gap-3 justify-start p-2 rounded-md">
                        {data?.['appStore-link'] && (
                            <Link
                                href={data['appStore-link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-blue-600 transition-colors"
                            >
                                <FaAppStoreIos className="text-xl" />
                                <span>App Store</span>
                            </Link>
                        )}

                        {data?.['playStore-link'] && (
                            <Link
                                href={data['playStore-link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-green-600 transition-colors"
                            >
                                <FaGooglePlay className="text-xl" />
                                <span>Play Store</span>
                            </Link>
                        )}

                        {data?.['website-link'] && (
                            <Link
                                href={data['website-link']}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 font-semibold text-lg cursor-pointer hover:text-purple-600 transition-colors"
                            >
                                <CgWebsite className="text-xl" />
                                <span>Website</span>
                            </Link>
                        )}
                    </div>

                    {/* Technologies */}
                    <div>
                        <h3 className="text-lg font-semibold mt-6">Technologies Used:</h3>
                        <ul className="flex flex-wrap gap-3 mt-2">
                            {data.technologies.map((tech, index) => (
                                <li
                                    key={index}
                                    className="bg-gray-800 px-3 py-1 rounded-lg text-sm"
                                >
                                    {tech}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Features Section</h3>
                <ol className="list-decimal pl-6 space-y-2 text-gray-300">
                    {data?.features && data?.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ol>
            </div>

            {/* Responsibilities Section */}
            <div className="mt-12 mb-28">
                <h3 className="text-2xl font-bold mb-4">Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    {data?.responsibilities && data?.responsibilities.map((res, index) => (
                        <li key={index}>{res}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDetails;