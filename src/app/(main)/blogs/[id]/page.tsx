import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ObjectId } from "mongodb";
import {
  TbArrowLeft,
  TbArticle,
  TbCalendar,
  TbPhoto,
} from "react-icons/tb";
import { baseUrl } from "@/Interfaces/BaseUrl";
import type { CloudinaryUpload } from "@/lib/cloudinary";
import { getDatabase } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

type BlogDocument = {
  _id: ObjectId;
  title?: string;
  description?: string;
  images?: CloudinaryUpload[];
  createdAt?: Date | string;
  updatedAt?: Date | string;
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

const formatDate = (date?: Date | string) => {
  if (!date) {
    return "Recently published";
  }

  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
};

const getBlogId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return new ObjectId(id);
};

const getBlog = async (id: string) => {
  const _id = getBlogId(id);

  if (!_id) {
    return null;
  }

  const db = await getDatabase();

  return db.collection<BlogDocument>("blogs").findOne({ _id });
};

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    return {
      title: "Blog Not Found - Mahmud Hasan Siddique",
    };
  }

  const firstImage = blog.images?.[0];
  const title = blog.title ?? "Blog Details";
  const description =
    stripHtml(blog.description ?? "").slice(0, 155) ||
    "Read a blog post by Mahmud Hasan Siddique.";

  return {
    title: `${title} | Mahmud Hasan Siddique`,
    description,
    openGraph: {
      title,
      description,
      url: `${baseUrl}/blogs/${id}`,
      siteName: "Mahmud Hasan Siddique Portfolio",
      type: "article",
      images: firstImage?.secureUrl
        ? [
            {
              url: firstImage.secureUrl,
              width: firstImage.width ?? 1200,
              height: firstImage.height ?? 630,
              alt: firstImage.originalFilename ?? title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: firstImage?.secureUrl ? [firstImage.secureUrl] : undefined,
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const blog = await getBlog(id);

  if (!blog) {
    notFound();
  }

  const title = blog.title ?? "Untitled blog";
  const images = blog.images ?? [];
  const firstImage = images[0];
  const publishedDate = formatDate(blog.createdAt);

  return (
    <article className="pb-16 text-white">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2 text-sm font-semibold text-white/70 transition hover:border-secondary/40 hover:bg-secondary/10 hover:text-secondary"
        >
          <TbArrowLeft />
          Blogs
        </Link>

        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-secondary/30 bg-secondary/10 text-xl text-secondary">
            <TbArticle />
          </span>
          <h1 className="text-2xl font-bold md:text-3xl">Blog Details</h1>
        </div>
      </div>

      <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-[#030816]/70 p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 md:p-6">
        <div className="pointer-events-none absolute -right-20 -top-20 h-44 w-44 rounded-full bg-secondary/20 blur-3xl" />

        <div className="relative">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-medium text-white/55">
            <span className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-[#081126] px-3 py-2">
              <TbCalendar className="text-secondary" />
              {publishedDate}
            </span>
          </div>

          <h2 className="max-w-4xl text-3xl font-bold leading-tight md:text-4xl">
            {title}
          </h2>
        </div>

        <div className="relative mt-6 overflow-hidden rounded-xl border border-white/10 bg-[#081126]">
          {firstImage ? (
            <img
              src={firstImage.secureUrl || firstImage.url}
              alt={firstImage.originalFilename ?? title}
              className="max-h-[560px] w-full object-cover object-top"
            />
          ) : (
            <div className="grid min-h-80 place-items-center text-white/40">
              <TbPhoto className="text-5xl" />
            </div>
          )}
        </div>

        {images.length > 1 ? (
          <div className="relative mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
            {images.slice(1).map((image) => (
              <div
                key={image.publicId}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#081126]"
              >
                <img
                  src={image.secureUrl || image.url}
                  alt={image.originalFilename ?? title}
                  className="h-36 w-full object-cover object-top"
                />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      <section className="mt-5 rounded-2xl border border-white/10 bg-[#030816]/70 p-5 shadow-[0_20px_70px_rgba(0,0,0,0.25)] backdrop-blur backdrop-saturate-150 md:p-7">
        {blog.description ? (
          <div
            className="max-w-none text-base leading-8 text-white/75 [&_a]:text-secondary [&_a]:underline [&_blockquote]:my-5 [&_blockquote]:border-l-4 [&_blockquote]:border-secondary [&_blockquote]:bg-secondary/10 [&_blockquote]:px-5 [&_blockquote]:py-3 [&_blockquote]:text-white/80 [&_code]:rounded [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-primary [&_h1]:mb-4 [&_h1]:mt-7 [&_h1]:text-3xl [&_h1]:font-bold [&_h2]:mb-4 [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-bold [&_h3]:mb-3 [&_h3]:mt-6 [&_h3]:text-xl [&_h3]:font-bold [&_img]:my-5 [&_img]:rounded-xl [&_li]:mb-2 [&_ol]:my-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mb-4 [&_strong]:text-white [&_table]:my-5 [&_table]:w-full [&_table]:border-collapse [&_td]:border [&_td]:border-white/10 [&_td]:p-3 [&_th]:border [&_th]:border-white/10 [&_th]:p-3 [&_ul]:my-4 [&_ul]:list-disc [&_ul]:pl-6"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          />
        ) : (
          <p className="text-white/70">No description available.</p>
        )}
      </section>
    </article>
  );
}
