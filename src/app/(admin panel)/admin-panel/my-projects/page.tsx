import { Metadata } from "next";
import ManageProjects from "./ManageProjects";

export const metadata: Metadata = {
  title: "My Projects | Admin Panel",
  description: "Manage portfolio projects from the admin panel.",
};

export default function Page() {
  return <ManageProjects />;
}
