"use client"
import React from 'react';
import type { IconType } from "react-icons";
import {
  SiAmazoncognito,
  SiAmazondynamodb,
  SiAmazons3,
  SiAuth0,
  SiAxios,
  SiCloudinary,
  SiCss3,
  SiDigitalocean,
  SiExpress,
  SiFirebase,
  SiFramer,
  SiHostinger,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMongoose,
  SiMongodb,
  SiMui,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTypescript,
  SiVercel,
  SiVuedotjs,
} from "react-icons/si";
import {
  TbApi,
  TbCloudUpload,
  TbCode,
  TbServer,
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
      { name: "JavaScript", Icon: SiJavascript, iconClass: "text-yellow-300" },
      { name: "HTML", Icon: SiHtml5, iconClass: "text-orange-500" },
      { name: "CSS", Icon: SiCss3, iconClass: "text-sky-400" },
      { name: "React", Icon: SiReact, iconClass: "text-cyan-300" },
      { name: "Vue", Icon: SiVuedotjs, iconClass: "text-emerald-400" },
      { name: "Next.js", Icon: SiNextdotjs, iconClass: "text-white" },
      { name: "Redux", Icon: SiRedux, iconClass: "text-violet-400" },
      { name: "Axios", Icon: SiAxios, iconClass: "text-violet-300" },
      { name: "Material-UI", Icon: SiMui, iconClass: "text-sky-400" },
      { name: "Framer Motion", Icon: SiFramer, iconClass: "text-pink-400" },
      { name: "TanStack Query", Icon: SiReactquery, iconClass: "text-rose-400" },
    ],
  },
  {
    title: "Auth & Security",
    accent: "bg-rose-400",
    skills: [
      { name: "JWT", Icon: SiJsonwebtokens, iconClass: "text-pink-400" },
      { name: "Firebase", Icon: SiFirebase, iconClass: "text-amber-400" },
      { name: "Auth0", Icon: SiAuth0, iconClass: "text-orange-400" },
      { name: "AWS Cognito", Icon: SiAmazoncognito, iconClass: "text-orange-300" },
    ],
  },
  {
    title: "Backend",
    accent: "bg-emerald-400",
    skills: [
      { name: "Node.js", Icon: SiNodedotjs, iconClass: "text-emerald-400" },
      { name: "Express.js", Icon: SiExpress, iconClass: "text-white" },
      { name: "TypeScript", Icon: SiTypescript, iconClass: "text-sky-400" },
      { name: "REST APIs", Icon: TbApi, iconClass: "text-slate-300" },
      { name: "Prisma ORM", Icon: SiPrisma, iconClass: "text-white" },
      { name: "MongoDB", Icon: SiMongodb, iconClass: "text-emerald-400" },
      { name: "Mongoose", Icon: SiMongoose, iconClass: "text-red-400" },
      { name: "MySQL", Icon: SiMysql, iconClass: "text-sky-300" },
      { name: "PostgreSQL", Icon: SiPostgresql, iconClass: "text-sky-300" },
      { name: "DynamoDB", Icon: SiAmazondynamodb, iconClass: "text-blue-400" },
    ],
  },
  {
    title: "Cloud & DevOps",
    accent: "bg-amber-400",
    skills: [
      { name: "AWS S3", Icon: SiAmazons3, iconClass: "text-orange-300" },
      { name: "Cloudinary", Icon: SiCloudinary, iconClass: "text-sky-300" },
      { name: "Multer", Icon: TbCloudUpload, iconClass: "text-cyan-300" },
      { name: "Vercel", Icon: SiVercel, iconClass: "text-white" },
      { name: "VPS Hosting", Icon: TbServer, iconClass: "text-emerald-300" },
      { name: "DigitalOcean", Icon: SiDigitalocean, iconClass: "text-sky-400" },
      { name: "Hostinger", Icon: SiHostinger, iconClass: "text-violet-400" },
    ],
  },
];


const Skills = () => {
  return (
    <div className="flex min-w-0 w-full flex-col gap-5 lg:flex-1">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative mb-5 flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
            <TbCode />
          </span>
          <h2 className="text-2xl font-bold">Tech Stack</h2>
        </div>

        <div className="relative space-y-3">
          {stackGroups.map((group) => (
            <div
              key={group.title}
              className="min-w-0 rounded-xl border border-white/10 bg-white/[0.03] p-3 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className={`${group.accent} h-2 w-2 rounded-full`} />
                <h3 className="font-semibold text-white/85">{group.title}</h3>
              </div>

              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-5">
                {group.skills.map(({ name, Icon, iconClass }) => (
                  <div
                    key={name}
                    className="flex min-w-0 items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-2 py-2"
                  >
                    <div className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-white/5 text-base">
                      <Icon className={iconClass} />
                    </div>
                    <p className="min-w-0 text-xs font-medium leading-tight text-white/70">
                      {name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
