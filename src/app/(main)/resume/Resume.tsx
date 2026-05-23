"use client"
import React, { useState } from 'react';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';
import { motion } from 'framer-motion';
import type { IconType } from "react-icons";
import { TbBriefcase, TbCode, TbSchool } from "react-icons/tb";

type ResumeTab = "Skills" | "Experience" | "Education";

type ResumeProps = {
    defaultTab?: ResumeTab;
    tabs?: ResumeTab[];
};

const defaultTabs: ResumeTab[] = ["Education", "Experience", "Skills"];

const tabIcons: Record<ResumeTab, IconType> = {
    Skills: TbCode,
    Experience: TbBriefcase,
    Education: TbSchool,
};

const Resume = ({ defaultTab = "Education", tabs = defaultTabs }: ResumeProps) => {

    const [activeTab, setActiveTab] = useState<ResumeTab>(defaultTab);

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
        <section className='min-w-0'>
            <div
                className='grid gap-1.5 rounded-xl border border-white/10 bg-[#081126] p-1.5'
                style={{ gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))` }}
            >
                {
                    tabs.map((tab) => {
                        const Icon = tabIcons[tab];
                        const isActive = activeTab === tab;

                        return (
                            <motion.button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                aria-pressed={isActive}
                                className={`inline-flex min-w-0 items-center justify-center gap-2 rounded-lg border px-2 py-2.5 text-xs font-semibold transition sm:px-4 sm:text-sm md:text-base ${isActive
                                    ? "border-secondary/50 bg-secondary/20 text-white shadow-[0_0_18px_rgba(109,104,255,0.25)]"
                                    : "border-transparent text-white/60 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                                    }`}
                                whileHover={{ y: -1 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", stiffness: 350, damping: 24 }}
                            >
                                <Icon className={`shrink-0 text-lg ${isActive ? "text-secondary" : "text-white/45"}`} />
                                <span className='truncate'>{tab}</span>
                            </motion.button>
                        );
                    })
                }
            </div>

            <div className='pt-10'>
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    {render()}
                </motion.div>
            </div>
        </section>
    );
};

export default Resume;
