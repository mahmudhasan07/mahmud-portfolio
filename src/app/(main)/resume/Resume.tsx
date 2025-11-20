"use client"
import React, { useState } from 'react';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import { motion } from 'framer-motion';

const Resume = () => {

    const [activeTab, setActiveTab] = useState("Education");

    const tabs = ["Education", "Experience", "Skills"];

    const render = () => {
        switch (activeTab) {
            case "Education":
                return <Education />;
            case "Experience":
                return <Experience />;
            case "Skills":
                return <Skills />;
            default:
                return <Education />;
        }
    };

    return (
        <section>
            {/* Tab Navigation */}
            <div className='flex flex-wrap gap-5'>
                {
                    tabs.map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`w-full text-lg py-4 borderNew2  font-semibold ${activeTab === tab ? "text-secondary" : ""}`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {tab}
                        </motion.button>
                    ))
                }
            </div>

            {/* Animated Content */}
            <div className='mt-6 md:pb-0 pb-14'>
                <motion.div
                    key={activeTab}  // Ensures a re-animation when switching tabs
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {render()}
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
