"use client"

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { FaFacebookF, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";
import { IoLogoGithub } from "react-icons/io";
import type { IconType } from "react-icons";
import {
  TbMail,
  TbMapPin,
  TbPhone,
  TbRocket,
  TbSend,
  TbUserCode,
} from "react-icons/tb";
import myImage from "@/assists/myProfile1.png";

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
  {
    label: "Location",
    value: "Dhaka, Bangladesh",
    href: "https://www.google.com/maps/search/Dhaka,+Bangladesh",
    Icon: TbMapPin,
  },
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

const inputClass =
  "w-full rounded-lg border border-white/10 bg-[#081126] px-3 py-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-secondary/60 focus:bg-secondary/10";

const Contact = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    console.log(data);
  };

  return (
    <section className="pb-16">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
          <TbSend />
        </span>
        <h1 className="text-2xl font-bold md:text-3xl">Contact With Me</h1>
      </div>

      <div className="grid gap-5 lg:grid-cols-[0.9fr_1.4fr]">
        <motion.aside
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

          <div className="relative flex flex-col items-center text-center">
            <div className="rounded-full border-4 border-white/20 bg-gray-700/40 p-1 shadow-xl backdrop-blur-md">
              <Image
                src={myImage}
                alt="Mahmud Hasan Siddique"
                className="h-36 w-36 rounded-full object-cover"
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold">Mahmud Hasan Siddique</h2>
            <p className="mt-1 text-sm font-semibold text-secondary">
              Full Stack Developer
            </p>
            <p className="mt-3 text-sm leading-6 text-white/70">
              I build responsive frontends, secure APIs, dashboards, and full
              web products with React, Next.js, Node.js, Express, MongoDB,
              Prisma, MySQL, and modern cloud tools.
            </p>
          </div>

          <div className="relative mt-5 space-y-2">
            {contactMethods.map(({ label, value, href, Icon }) => (
              <Link
                key={label}
                href={href}
                target={label === "Location" ? "_blank" : undefined}
                rel={label === "Location" ? "noreferrer" : undefined}
                className="flex min-w-0 items-center gap-3 rounded-lg border border-white/10 bg-[#081126] px-3 py-3 transition hover:border-secondary/40 hover:bg-secondary/10"
              >
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-secondary/30 bg-secondary/10 text-lg text-secondary">
                  <Icon />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold text-white/45">
                    {label}
                  </span>
                  <span className="block break-words text-sm font-medium text-white/80">
                    {value}
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <div className="relative mt-5">
            <p className="mb-2 text-sm font-semibold text-white/70">
              Find Me On
            </p>
            <div className="flex flex-wrap gap-2">
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
        </motion.aside>

        <motion.div
          className="relative min-w-0 overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />

          <div className="relative mb-5 flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
              <TbRocket />
            </span>
            <div>
              <h2 className="text-xl font-bold md:text-2xl">
                Let&apos;s Talk About Your Project
              </h2>
              <p className="mt-1 text-sm text-white/55">
                Send the details and I&apos;ll review the scope.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="relative space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/75">
                  Your Name *
                </label>
                <input
                  placeholder="Mahmud Hasan"
                  name="name"
                  required
                  className={inputClass}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-white/75">
                  Phone Number *
                </label>
                <input
                  placeholder="+880..."
                  name="phone"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/75">
                Email *
              </label>
              <input
                placeholder="you@example.com"
                required
                name="email"
                type="email"
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/75">
                Subject *
              </label>
              <input
                placeholder="Project collaboration"
                type="text"
                name="subject"
                required
                className={inputClass}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-white/75">
                Additional Details *
              </label>
              <textarea
                placeholder="Tell me about the goal, timeline, and important features..."
                name="description"
                required
                className={`${inputClass} min-h-32 resize-y`}
              />
            </div>

            <motion.button
              type="submit"
              className="inline-flex items-center gap-2 rounded-lg border border-secondary/50 bg-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_20px_rgba(109,104,255,0.35)] transition hover:bg-secondary/80"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 24 }}
            >
              <TbUserCode className="text-lg" />
              Send Message
            </motion.button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
