import { Metadata } from "next";
import AddProject from "./AddProject";

export const metadata: Metadata = {
  title: "Add Project | Admin Panel",
  description: "Create a new portfolio project from the admin panel.",
};

export default function Page() {
  return <AddProject />;
}
