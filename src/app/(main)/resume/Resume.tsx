"use client"
import React, { useState } from 'react';
import Education from './Education';
import Experience from './Experience';
import Skills from './Skills';

const Resume = () => {

    const [activeTab, setActiveTab] = useState("Education");

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

            <div>
                {
                    render()
                }
            </div>
        </section>
    );
};

export default Resume;