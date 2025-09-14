"use client"
import React, { useState } from 'react';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const Resume = () => {

    const [activeTab, setActiveTab] = useState("Education");

    const tabs = ["Education", "Experience", "Skills"];

    const render = () => {
        switch (activeTab) {
            case "Education":
                return <Education></Education>;
            case "Experience":
                return <Experience></Experience>;
            case "Skills":
                return <Skills></Skills>;
            default:
                return <Education></Education>;
        }
    };

    return (
        <section>
            <div className='flex gap-5'>
                {
                    tabs.map((tab) => (
                        <button key={tab} onClick={() => setActiveTab(tab)} className={`w-full text-xl py-4 borderNew2 font-semibold ${activeTab == tab ? "text-secondary" : ""}`}>{tab}</button>
                    ))
                }
            </div>
            <div className='my-10'>
                {
                    render()
                }
            </div>
        </section>
    );
};

export default Resume;