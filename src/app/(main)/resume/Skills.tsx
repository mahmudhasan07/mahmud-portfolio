"use client"
import React from 'react';
import skillsDataJson from '@/assists/Skills.json';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  image: string;
}

interface SkillsData {
  skills: {
    Languages: Skill[];
    Frameworks: Skill[];
    "Backend Development": Skill[];
    Database: Skill[];
    "Tools and Libraries": Skill[];
    "Security and Authentication": Skill[];
  };
}

const Skills = () => {
  const skillsData: SkillsData['skills'] = skillsDataJson.skills;

  return (
    <div className="my-5">
      <h2 className="lg:text-4xl md:text-3xl text-2xl londrina font-bold my-8">Skills</h2>

      {Object.keys(skillsData).map((category) => {
        const skills = skillsData[category as keyof typeof skillsData]; // ✅ cast here
        return (
          <motion.div
            key={category}
            className="mb-5 px-5 py-2 borderNew2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.5, staggerChildren: 0.1 },
                },
              }}
            >
              {skills.map((skill) => (
                <motion.div
                  key={skill.name}
                  className="flex flex-col bg-gray-600/50 items-center p-4 rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-2"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-20 h-16 object-contain mb-2"
                  />
                  <p className="text-center text-sm font-medium">{skill.name}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Skills;
