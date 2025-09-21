import React from "react";
import experiences from "@/assists/Experience.json";

const Experience = () => {
  return (
    <section className="text-white">
      <h2 className="text-4xl font-bold my-5">Experience</h2>
      {experiences.map((exp, index) => (
        <div key={index} className="mb-8 border-b borderNew2 p-5">
          <h3 className="text-2xl font-semibold">{exp.company}</h3>
          <p className="text-base text-gray-500">{exp.location}</p>

          {exp.positions.map((pos, idx) => (
            <div key={idx} className="mt-3 ml-4">
              <h4 className="text-xl font-medium">
                {pos.title}{" "}
                <span className="text-sm text-gray-500">
                  ({pos.employmentType})
                </span>
              </h4>
              <p className="text-sm text-gray-600">
                {pos.startDate} – {pos.endDate} • {pos.duration}
              </p>
              <p className="mt-2">{pos.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {pos.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="bgcolor px-2 py-1 rounded text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Experience;
