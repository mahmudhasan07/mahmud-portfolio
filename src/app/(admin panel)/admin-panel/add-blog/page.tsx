import { Metadata } from "next";
import AddBlog from "./AddBlog";

export const metadata: Metadata = {
  title: "Add Blog | Admin Panel",
  description: "Create a new portfolio blog post from the admin panel.",
};

export default function Page() {
  return <AddBlog />;
}
