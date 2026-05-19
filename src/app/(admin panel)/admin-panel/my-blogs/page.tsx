import { Metadata } from "next";
import ManageBlogs from "./ManageBlogs";

export const metadata: Metadata = {
  title: "My Blogs | Admin Panel",
  description: "Manage blog posts from the admin panel.",
};

export default function Page() {
  return <ManageBlogs />;
}
