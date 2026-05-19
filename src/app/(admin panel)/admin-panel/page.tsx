import { Metadata } from "next";
import Link from "next/link";
import {
  FiArrowRight,
  FiBookOpen,
  FiBriefcase,
  FiEdit3,
  FiFolder,
  FiGrid,
  FiLayers,
} from "react-icons/fi";

export const metadata: Metadata = {
  title: "Admin Panel | Mahmud Portfolio",
  description: "Admin dashboard for managing portfolio content.",
};

const adminRoutes = [
  {
    title: "Add Blog",
    description: "Create a new blog post with editor content and images.",
    href: "/admin-panel/add-blog",
    icon: FiEdit3,
  },
  {
    title: "Add Project",
    description: "Add a portfolio project with links, images, and details.",
    href: "/admin-panel/add-project",
    icon: FiFolder,
  },
  {
    title: "Add Education",
    description: "Add education history, institution, session, and CGPA.",
    href: "/admin-panel/add-education",
    icon: FiBookOpen,
  },
  {
    title: "Add Experience",
    description: "Add company experience, positions, dates, and skills.",
    href: "/admin-panel/add-experience",
    icon: FiBriefcase,
  },
  {
    title: "My Blogs",
    description: "View and manage existing blog posts.",
    href: "/admin-panel/my-blogs",
    icon: FiLayers,
  },
  {
    title: "My Projects",
    description: "View and manage existing portfolio projects.",
    href: "/admin-panel/my-projects",
    icon: FiGrid,
  },
];

export default function AdminPanelPage() {
  return (
    <section className="pb-24">
      <div className="mb-8 text-center">
        <h1 className="londrina mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
          Admin Panel
        </h1>
        <p className="mx-auto max-w-2xl text-white/70">
          Choose where you want to go and manage your portfolio content.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminRoutes.map((route) => {
          const Icon = route.icon;

          return (
            <Link
              key={route.href}
              href={route.href}
              className="group rounded-md border border-white/15 bg-black/35 p-5 text-white backdrop-blur-sm transition hover:-translate-y-1 hover:border-secondary hover:bg-secondary/10"
            >
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-md border border-white/15 bg-black/50 text-2xl text-secondary">
                  <Icon />
                </span>
                <FiArrowRight className="text-2xl text-white/50 transition group-hover:translate-x-1 group-hover:text-secondary" />
              </div>

              <h2 className="mb-2 text-xl font-bold">{route.title}</h2>
              <p className="text-sm leading-6 text-white/65">{route.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
