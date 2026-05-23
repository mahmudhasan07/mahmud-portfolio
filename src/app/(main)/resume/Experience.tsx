"use client"
import React from "react";
import experiences from "@/assists/Experience.json";
import { motion } from "framer-motion";
import { TbBriefcase, TbBuilding, TbCalendar, TbMapPin } from "react-icons/tb";

const accentClasses = ["bg-emerald-400", "bg-sky-400", "bg-amber-400"];

const Experience = () => {
  return (
    <section className="flex min-w-0 w-full flex-col gap-5 text-white lg:flex-1">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative mb-5 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
            <TbBriefcase />
          </span>
          <h2 className="text-2xl font-bold">Experience</h2>
        </div>

        <div className="relative space-y-3">
          {experiences.map((exp, index) => {
            const accentClass = accentClasses[index % accentClasses.length];

            return (
              <motion.article
                key={index}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: index * 0.12 }}
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                      <span className={`${accentClass} h-2 w-2 rounded-full`} />
                      <h3 className="text-lg font-semibold leading-tight text-white md:text-xl">
                        {exp.company}
                      </h3>
                    </div>

                    <p className="flex items-center gap-2 text-xs text-white/55">
                      <TbMapPin className="shrink-0 text-base text-secondary" />
                      {exp.location}
                    </p>
                  </div>

                  <div className="flex w-fit shrink-0 items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-medium text-white/65">
                    <TbBuilding className="text-base text-secondary" />
                    {exp.positions.length} Role{exp.positions.length > 1 ? "s" : ""}
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {exp.positions.map((pos, idx) => (
                    <motion.div
                      key={idx}
                      className="rounded-lg border border-white/10 bg-[#081126] p-3"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.12 + idx * 0.08 }}
                    >
                      <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                        <div className="min-w-0">
                          <h4 className="text-base font-semibold leading-tight text-white">
                            {pos.title}
                          </h4>
                          <p className="mt-1 text-xs font-medium text-secondary">
                            {pos.employmentType}
                          </p>
                        </div>

                        <p className="flex w-fit shrink-0 items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 py-1 text-xs text-white/55">
                          <TbCalendar className="shrink-0 text-base text-secondary" />
                          <span>
                            {pos.startDate} - {pos.endDate} | {pos.duration}
                          </span>
                        </p>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-white/70">
                        {pos.description}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {pos.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="rounded-md border border-secondary/20 bg-secondary/10 px-2 py-1 text-xs font-medium text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Experience;
