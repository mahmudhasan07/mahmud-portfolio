"use client"

import Link from "next/link";
import React from "react";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { motion } from "framer-motion";
import {
  TbArrowRight,
  TbCalendar,
  TbCode,
  TbExternalLink,
  TbPhoto,
} from "react-icons/tb";
import projects from "@/assists/project.json";

const formatTitle = (title: string) => title.toLowerCase().replace(/\s+/g, "-");

const Portfolio = () => {
  return (
    <section className="pb-16">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
          <TbCode />
        </span>
        <h1 className="text-2xl font-bold md:text-3xl">My Latest Projects</h1>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((item, idx) => {
          const detailsHref = `/portfolio/${formatTitle(item.title)}`;
          const technologies = item.technologies?.slice(0, 4) ?? [];

          return (
            <motion.article
              key={item.title}
              className="group relative flex flex-col h-full rounded-2xl border border-white/10 bg-[#030816]/70 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 24 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: idx * 0.05 }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#081126]">
                {item?.images?.[0] ? (
                  <img
                  id="projectimage"
                    src={item.images[0]}
                    alt={item.title}
                    className="h-64 w-full object-cover object-top "
                  />
                ) : (
                  <div className="grid h-64 place-items-center text-white/40">
                    <TbPhoto className="text-4xl" />
                  </div>
                )}
              </div>
              <div className="relative mt-4 flex-1 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h2 className="text-xl font-semibold leading-tight text-white">
                      {item.title}
                    </h2>
                    <p className="mt-1 flex items-center gap-2 text-xs text-white/50">
                      <TbCalendar className="text-secondary" />
                      {item.date}
                    </p>
                  </div>

                  <Link
                    href={detailsHref}
                    aria-label={`View ${item.title} details`}
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-secondary/30 bg-secondary/10 text-lg text-secondary transition hover:bg-secondary hover:text-white"
                  >
                    <TbArrowRight />
                  </Link>
                </div>

                <p className="text-sm leading-6 text-white/65">
                  {item.description.substring(0, 120)}...
                </p>

                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-white/10 bg-[#081126] px-2 py-1 text-xs font-medium text-white/60"
                    >
                      {tech.replace(/\s*\([^)]*\)/g, "")}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 border-t border-white/10 pt-3">
                  {item?.["appStore-link"] && (
                    <Link
                      href={item["appStore-link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                    >
                      <FaAppStoreIos className="text-base" />
                      App Store
                      <TbExternalLink className="text-sm" />
                    </Link>
                  )}

                  {item?.["playStore-link"] && (
                    <Link
                      href={item["playStore-link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                    >
                      <FaGooglePlay className="text-base" />
                      Play Store
                      <TbExternalLink className="text-sm" />
                    </Link>
                  )}

                  {item?.["website-link"] && (
                    <Link
                      href={item["website-link"]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-xs font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
                    >
                      <CgWebsite className="text-base" />
                      Website
                      <TbExternalLink className="text-sm" />
                    </Link>
                  )}
                </div>

                <Link
                  href={detailsHref}
                  className="flex w-full mt-auto items-center justify-center gap-2 rounded-lg border border-secondary/50 bg-secondary px-4 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(109,104,255,0.3)] transition hover:bg-secondary/80"
                >
                  More Details
                  <TbArrowRight className="text-lg" />
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};

export default Portfolio;
