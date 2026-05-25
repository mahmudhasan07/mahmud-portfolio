import Link from "next/link";
import { ObjectId } from "mongodb";
import { TbArrowRight, TbArticle, TbCalendar, TbPhoto } from "react-icons/tb";
import type { CloudinaryUpload } from "@/lib/cloudinary";
import { getDatabase } from "@/lib/mongodb";

type BlogDocument = {
  _id: ObjectId;
  title?: string;
  description?: string;
  images?: CloudinaryUpload[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

type BlogCard = {
  _id: string;
  title: string;
  description: string;
  imageUrl?: string;
  imageAlt: string;
  createdAt?: string;
};

const stripHtml = (html: string) =>
  html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&ldquo;|&rdquo;/g, '"')
    .replace(/&#39;|&apos;|&lsquo;|&rsquo;/g, "'")
    .replace(/&mdash;|&ndash;/g, "-")
    .replace(/&hellip;/g, "...")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

const formatDate = (date?: string) => {
  if (!date) {
    return "Recently published";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const getBlogs = async () => {
  try {
    const db = await getDatabase();
    const blogs = await db
      .collection<BlogDocument>("blogs")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return {
      blogs: blogs.map<BlogCard>((blog) => {
        const firstImage = blog.images?.[0];

        return {
          _id: blog._id.toString(),
          title: blog.title ?? "Untitled blog",
          description: stripHtml(blog.description ?? ""),
          imageUrl: firstImage?.secureUrl || firstImage?.url,
          imageAlt: firstImage?.originalFilename ?? blog.title ?? "Blog image",
          createdAt:
            blog.createdAt instanceof Date
              ? blog.createdAt.toISOString()
              : blog.createdAt,
        };
      }),
      error: "",
    };
  } catch (error) {
    return {
      blogs: [],
      error: error instanceof Error ? error.message : "Failed to load blogs.",
    };
  }
};

const Blogs = async () => {
  const { blogs, error } = await getBlogs();

  return (
    <section className="pb-16">
      <div className="mb-5 flex items-center justify-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
          <TbArticle />
        </span>
        <h1 className="text-2xl font-bold md:text-3xl">My Blogs</h1>
      </div>

      {error ? (
        <p className="rounded-xl border border-primary/30 bg-primary/10 p-4 text-center text-sm font-medium text-primary">
          {error}
        </p>
      ) : null}

      {!error && blogs.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-[#030816]/70 p-6 text-center text-white/70">
          No blogs found.
        </p>
      ) : null}

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {blogs.map((blog) => (
          <article
            key={blog._id}
            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-3 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 transition duration-300 hover:-translate-y-1 hover:border-secondary/40 hover:bg-secondary/10"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative overflow-hidden rounded-xl border border-white/10 bg-[#081126]">
              {blog.imageUrl ? (
                <img
                  src={blog.imageUrl}
                  alt={blog.imageAlt}
                  className="h-64 w-full object-cover object-top transition duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="grid h-64 place-items-center text-white/40">
                  <TbPhoto className="text-4xl" />
                </div>
              )}
            </div>

            <div className="relative flex flex-1 flex-col gap-3 p-2 pt-4">
              <p className="flex items-center gap-2 text-xs font-medium text-white/50">
                <TbCalendar className="text-secondary" />
                {formatDate(blog.createdAt)}
              </p>

              <Link href={`/blogs/${blog._id}`} className="block">
                <h2 className="text-xl font-semibold leading-tight text-white transition group-hover:text-secondary">
                  {blog.title}
                </h2>
              </Link>

              <p className="line-clamp-4 text-sm leading-6 text-white/65">
                {blog.description || "No description available."}
              </p>

              <Link
                href={`/blogs/${blog._id}`}
                className="mt-auto inline-flex w-fit items-center gap-2 rounded-lg border border-secondary/40 bg-secondary/10 px-4 py-2 text-sm font-semibold text-secondary transition hover:bg-secondary hover:text-white"
              >
                Read More
                <TbArrowRight />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Blogs;
