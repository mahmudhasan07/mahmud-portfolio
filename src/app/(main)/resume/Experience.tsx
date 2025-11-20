"use client"
import React from "react";
import experiences from "@/assists/Experience.json";
import { motion } from "framer-motion";

const Experience = () => {
  return (
    <section className="text-white">
      <h2 className="lg:text-4xl md:text-3xl text-2xl londrina font-bold my-8">Experience</h2>
      {experiences.map((exp, index) => (
        <motion.div
          key={index}
          className="mb-8 border-b borderNew2 p-5"
          initial={{ opacity: 0, y: 50 }}  // Starts with opacity 0 and moved down
          animate={{ opacity: 1, y: 0 }}   // Fades in and slides up
          transition={{ duration: 0.6, delay: index * 0.2 }}  // Staggered delay based on index
        >
          <h3 className="text-2xl font-semibold">{exp.company}</h3>
          <p className="text-base text-gray-500">{exp.location}</p>

          {exp.positions.map((pos, idx) => (
            <motion.div
              key={idx}
              className="mt-3 ml-4"
              initial={{ opacity: 0, y: 20 }}  // Starts with opacity 0 and slightly below
              animate={{ opacity: 1, y: 0 }}   // Fades in and slides up
              transition={{ duration: 0.5, delay: idx * 0.1 }}  // Slight delay for each position
            >
              <h4 className="text-xl font-medium">
                {pos.title}{" "}
                <span className="text-sm text-gray-500">({pos.employmentType})</span>
              </h4>
              <p className="text-sm text-gray-600">
                {pos.startDate} – {pos.endDate} • {pos.duration}
              </p>
              <p className="mt-2">{pos.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pos.skills.map((skill, sIdx) => (
                  <span key={sIdx} className="bgcolor px-2 py-1 rounded text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      ))}
    </section>
  );
};

export default Experience;
