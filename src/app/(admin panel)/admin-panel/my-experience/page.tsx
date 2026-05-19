import { Metadata } from "next";
import ManageExperience from "./ManageExperience";

export const metadata: Metadata = {
  title: "My Experience | Admin Panel",
  description: "Manage experience items from the admin panel.",
};

export default function Page() {
  return <ManageExperience />;
}
