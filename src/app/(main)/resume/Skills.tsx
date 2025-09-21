import React from 'react';
import skillsDataJson from '@/assists/Skills.json';
// import { SkillsData } from '@/types/skills';

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
      {Object.keys(skillsData).map((category) => {
        const skills = skillsData[category as keyof typeof skillsData]; // ✅ cast here
        return (
          <div key={category} className="mb-5 px-5 py-2 borderNew2">
            <h2 className="text-2xl font-semibold mb-6">{category}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3  md:grid-cols-4 lg:grid-cols-6 gap-6">
              {skills.map((skill) => (
                <div
                  key={skill.name}
                  className="flex flex-col bg-gray-600/50 items-center p-4 rounded-lg shadow hover:shadow-lg transition-transform transform hover:-translate-y-2"
                >
                  <img
                    src={skill.image}
                    alt={skill.name}
                    className="w-20 h-16 object-contain mb-2"
                  />
                  <p className="text-center text-sm font-medium">{skill.name}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Skills;
