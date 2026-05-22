"use client";

import Image from "next/image";
import React from "react";
import banner from "@/assists/banner.png";
import myImage from "@/assists/myProfile11.png";
import resumeImage from "@/assists/resume.png";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import type { IconType } from "react-icons";
import {
  SiExpress,
  SiGit,
  SiGithub,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostman,
  SiPrisma,
  SiReact,
  SiSocketdotio,
  SiTailwindcss,
  SiVercel,
} from "react-icons/si";
import {
  TbApi,
  TbArrowRight,
  TbCode,
  TbDownload,
  TbRocket,
  TbSend,
} from "react-icons/tb";

type StackGroup = {
  title: string;
  accent: string;
  skills: {
    name: string;
    Icon: IconType;
    iconClass: string;
  }[];
};

const stackGroups: StackGroup[] = [
  {
    title: "Frontend",
    accent: "bg-sky-400",
    skills: [
      { name: "React", Icon: SiReact, iconClass: "text-cyan-300" },
      { name: "Next.js", Icon: SiNextdotjs, iconClass: "text-white" },
      { name: "Tailwind", Icon: SiTailwindcss, iconClass: "text-sky-300" },
      { name: "JavaScript", Icon: SiJavascript, iconClass: "text-yellow-300" },
    ],
  },
  {
    title: "Backend",
    accent: "bg-emerald-400",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, iconClass: "text-emerald-400" },
      { name: "Express.js", Icon: SiExpress, iconClass: "text-white" },
      { name: "REST API", Icon: TbApi, iconClass: "text-slate-300" },
      { name: "Socket.io", Icon: SiSocketdotio, iconClass: "text-white" },
    ],
  },
  {
    title: "Database",
    accent: "bg-violet-400",
    skills: [
      { name: "MongoDB", Icon: SiMongodb, iconClass: "text-emerald-400" },
      { name: "MySQL", Icon: SiMysql, iconClass: "text-sky-300" },
      { name: "Prisma", Icon: SiPrisma, iconClass: "text-white" },
    ],
  },
  {
    title: "Tools",
    accent: "bg-amber-400",
    skills: [
      { name: "Git", Icon: SiGit, iconClass: "text-orange-500" },
      { name: "GitHub", Icon: SiGithub, iconClass: "text-white" },
      { name: "Vercel", Icon: SiVercel, iconClass: "text-white" },
      { name: "Postman", Icon: SiPostman, iconClass: "text-orange-500" },
    ],
  },
];

const Profile = () => {
  return (
    <section className="flex w-full flex-col gap-5 overflow-x-hidden pb-16 lg:flex-row lg:items-stretch">
      {/* left side content */}
      <div className="relative min-w-0 w-full space-y-3 overflow-hidden rounded-3xl border border-white/20 bg-black/40 p-4 text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur backdrop-saturate-150 lg:w-[38%]">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_42%,rgba(109,104,255,0.16))]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" />

        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-inner">
            <Image
              src={banner}
              className="h-60 w-full object-cover opacity-90"
              alt="profile banner"
            />
          </div>

          <div className="relative -mt-10 flex justify-center">
            <div className="rounded-full border-4 border-white/25 bg-gray-700/40 p-1 shadow-xl backdrop-blur-md">
              <Image
                src={myImage}
                className="h-48 w-48 rounded-full object-cover"
                alt="profile image"
              />
            </div>
          </div>
        </div>

        <div className="relative">
          <h1 className="londrina break-words text-center text-3xl font-extrabold text-transparent sm:text-4xl">
            Mahmud Hasan Siddique
          </h1>
          <h2 className="text-center text-xl font-semibold text-white/80">
            Full Stack Developer
          </h2>
          <p className="my-3">
            Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB
            | Mongoose | Prisma | MySQL | JavaScript | Problem-solving.
            Creating the Future, One Line of Code at a Time.
          </p>
          <div>
            <p className="font-semibold text-[#7C797A]">
              Phone: <span className="font-normal text-white">01625598782</span>
            </p>
            <p className="font-semibold text-[#7C797A]">
              Email:{" "}
              <span className="font-normal text-white">
                mahmudhasan.hb@gmail.com
              </span>
            </p>
          </div>
        </div>

        <div className="relative space-y-2">
          <p className="text-lg font-semibold">Find Me On:</p>
          <div className="flex gap-3">
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://www.facebook.com/mahmudnirob.t"
            >
              <FaFacebookF className="borderNew p-2 text-4xl" />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://www.linkedin.com/in/mahmud-hasan-siddique-8873b221a/"
            >
              <FaLinkedinIn className="borderNew p-2 text-4xl" />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://github.com/mahmudhasan07"
            >
              <IoLogoGithub className="borderNew p-2 text-4xl" />
            </Link>
            <Link
              target="_blank"
              rel="noreferrer"
              href="https://wa.me/8801625598782"
            >
              <FaWhatsapp className="borderNew p-2 text-4xl" />
            </Link>
          </div>
        </div>
      </div>

      {/* right side content */}
      <div className="flex min-w-0 w-full flex-col gap-5 lg:flex-1">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur-md">
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative mb-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
              <TbCode />
            </span>
            <h2 className="text-2xl font-bold">Tech Stack</h2>
          </div>

          <div className="relative grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {stackGroups.map((group) => (
              <div
                key={group.title}
                className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10"
              >
                <div className="mb-4 flex items-center gap-2">
                  <span className={`${group.accent} h-2 w-2 rounded-full`} />
                  <h3 className="text-sm font-semibold text-white/85">
                    {group.title}
                  </h3>
                </div>

                <div className="flex items-start justify-between gap-1">
                  {group.skills.map(({ name, Icon, iconClass }) => (
                    <div key={name} className="min-w-fit space-y-2 text-center">
                      <div className="mx-auto grid h-8 w-8 place-items-center rounded-lg border border-white/10 bg-[#081126] text-lg shadow-inner">
                        <Icon className={iconClass} />
                      </div>
                      <p className="whitespace-nowrap text-[7px] font-medium leading-none text-white/70">
                        {name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/75 p-6 shadow-[0_20px_70px_rgba(0,0,0,0.3)] backdrop-blur-md">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(109,104,255,0.22),transparent_34%),linear-gradient(135deg,rgba(245,27,27,0.08),transparent_40%)]" />
          <div className="pointer-events-none absolute right-10 top-6 hidden h-40 w-56 md:block">
            <span className="absolute bottom-6 left-3 h-px w-40 -rotate-12 bg-secondary/50" />
            <span className="absolute bottom-12 left-0 h-px w-32 -rotate-12 bg-primary/40" />
            <span className="absolute bottom-1 left-16 h-px w-28 -rotate-12 bg-cyan-300/40" />
            <span className="absolute bottom-4 left-20 h-14 w-14 rotate-45 rounded-full bg-primary/30 blur-xl" />
            <TbRocket className="absolute right-8 top-4 rotate-[-36deg] text-[6.5rem] text-secondary drop-shadow-[0_0_18px_rgba(109,104,255,0.9)]" />
            <TbSend className="absolute bottom-8 left-6 rotate-[-20deg] text-5xl text-secondary/70" />
          </div>

          <div className="relative max-w-xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl border border-fuchsia-400/30 bg-fuchsia-400/10 text-xl text-fuchsia-300">
                <TbRocket />
              </span>
              <h2 className="text-xl font-bold sm:text-2xl">
                Let&apos;s Build Something Amazing
              </h2>
            </div>
            <p className="max-w-md leading-7 text-white/70">
              I&apos;m always open to discussing new projects, creative ideas or
              opportunities to be part of your visions.
            </p>

            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/portfolio"
                className="inline-flex items-center gap-2 rounded-lg border border-secondary/50 bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(109,104,255,0.45)] transition hover:bg-secondary/80"
              >
                View Projects <TbArrowRight className="text-lg" />
              </Link>
              <a
                href={resumeImage.src}
                download="Mahmud-Hasan-Siddique-Resume.png"
                className="inline-flex items-center gap-2 rounded-lg border border-secondary/40 bg-[#07122b] px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-secondary hover:bg-secondary/15"
              >
                <TbDownload className="text-lg" /> Download Resume
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-lg border border-secondary/40 bg-[#07122b] px-6 py-3 text-sm font-semibold text-white/90 transition hover:border-secondary hover:bg-secondary/15"
              >
                <TbSend className="text-lg" /> Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};

export default Profile;
