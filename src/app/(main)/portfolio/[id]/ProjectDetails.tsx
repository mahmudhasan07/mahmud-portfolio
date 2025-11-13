import Image from 'next/image';
import React from 'react';
import projects from "@/assists/project.json"

const ProjectDetails = () => {


    return (
        <div className="text-white bg-black min-h-screen py-10 px-6 md:px-20">
            {/* Top Section */}
            <div className="flex flex-col md:flex-row gap-10 items-start">
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

                    {/* Links */}
                    <div className="flex gap-5 mt-4">
                        {data["website-link"] && (
                            <a
                                href={data["website-link"]}
                                target="_blank"
                                className="flex items-center gap-2 text-blue-400 hover:underline"
                            >
                                <FaGlobe /> Live Link
                            </a>
                        )}
                        {data["appStore-link"] && (
                            <a
                                href={data["appStore-link"]}
                                target="_blank"
                                className="flex items-center gap-2 text-blue-400 hover:underline"
                            >
                                <FaAppStoreIos /> App Store
                            </a>
                        )}
                        {data["playStore-link"] && (
                            <a
                                href={data["playStore-link"]}
                                target="_blank"
                                className="flex items-center gap-2 text-blue-400 hover:underline"
                            >
                                <FaGithub /> Play Store
                            </a>
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
                    {data.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ol>
            </div>

            {/* Responsibilities Section */}
            <div className="mt-12">
                <h3 className="text-2xl font-bold mb-4">Responsibilities</h3>
                <ul className="list-disc pl-6 space-y-2 text-gray-300">
                    {data.responsibilities.map((res, index) => (
                        <li key={index}>{res}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ProjectDetails;