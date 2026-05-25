"use client";

import Image from "next/image";
import React from "react";
import myImage from "@/assists/myProfile11.png";
import resumeImage from "@/assists/resume.png";
import Link from "next/link";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import {
  TbArrowRight,
  TbDownload,
  TbMail,
  TbPhone,
  TbRocket,
  TbSend,
} from "react-icons/tb";
import Resume from "./resume/Resume";
import { IconType } from "react-icons";
type ContactMethod = {
  label: string;
  value: string;
  href: string;
  Icon: IconType;
};

const contactMethods: ContactMethod[] = [
  {
    label: "Phone",
    value: "01625598782",
    href: "tel:+8801625598782",
    Icon: TbPhone,
  },
  {
    label: "Email",
    value: "mahmudhasan.hb@gmail.com",
    href: "mailto:mahmudhasan.hb@gmail.com",
    Icon: TbMail,
  },
  // {
  //   label: "Location",
  //   value: "Dhaka, Bangladesh",
  //   href: "https://www.google.com/maps/search/Dhaka,+Bangladesh",
  //   Icon: TbMapPin,
  // },
];

const socialLinks = [
  {
    href: "https://www.facebook.com/mahmudnirob.t",
    label: "Facebook",
    Icon: FaFacebookF,
  },
  {
    href: "https://www.linkedin.com/in/mahmud-hasan-siddique-8873b221a/",
    label: "LinkedIn",
    Icon: FaLinkedinIn,
  },
  {
    href: "https://github.com/mahmudhasan07",
    label: "GitHub",
    Icon: IoLogoGithub,
  },
  {
    href: "https://wa.me/8801625598782",
    label: "WhatsApp",
    Icon: FaWhatsapp,
  },
];

const Profile = () => {
  return (
    <section className="flex w-full flex-col gap-5 overflow-x-hidden lg:flex-row lg:items-stretch">
      {/* left side content */}
      <div className="relative min-w-0 w-full space-y-5 overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 lg:w-[40%]">
        {/* <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_42%,rgba(109,104,255,0.16))]" />
        <div className="pointer-events-none absolute -left-20 -top-20 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-16 h-48 w-48 rounded-full bg-secondary/25 blur-3xl" /> */}

        <div className="relative">
          <div className="relative flex justify-center">
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
          <h1 className="londrina text-center text-2xl font-extrabold text-transparent sm:text-3xl">
            Mahmud Hasan Siddique
          </h1>
          <h2 className="text-center text-xl font-semibold text-white/60">
            Full Stack Developer
          </h2>
          <p className="my-3">
            Full Stack Developer | React | Next | Node(MVC) | Express | MongoDB
            | Mongoose | Prisma | MySQL | JavaScript | Problem-solving. Creating
            the Future, One Line of Code at a Time.
          </p>
          <div className="relative mt-5 space-y-2">
            {contactMethods.map(({ label, value, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target={label === "Location" ? "_blank" : undefined}
                rel={label === "Location" ? "noreferrer" : undefined}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-[#081126] p-2 transition hover:border-secondary/40 hover:bg-secondary/10"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-secondary/30 bg-secondary/10 text-secondary">
                  <Icon />
                </span>
                <span className="min-w-0">
                  {/* <span className="block text-xs font-semibold text-white/45">
                    {label}
                  </span> */}
                  <span className="block break-words text-sm font-medium text-white/80">
                    {value}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="relative min-h-[220px] rounded-2xl">
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

        <div className="relative space-y-2">
          <p className="text-lg font-semibold">Find Me On:</p>
          <div className="flex gap-3">
            {socialLinks.map(({ href, label, Icon }) => (
              <Link
                key={label}
                target="_blank"
                rel="noreferrer"
                href={href}
                aria-label={label}
                className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-[#081126] text-lg text-white/75 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
              >
                <Icon />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* right side content */}
      <div className="flex min-w-0 w-full flex-col gap-5 lg:flex-1 rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150">
        <Resume
          defaultTab="Skills"
          tabs={["Skills", "Experience", "Education"]}
        />
      </div>
    </section>
  );
};

export default Profile;
