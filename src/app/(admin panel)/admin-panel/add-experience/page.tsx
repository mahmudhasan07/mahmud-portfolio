import { Metadata } from "next";
import AddExperience from "./AddExperience";

export const metadata: Metadata = {
  title: "Add Experience | Admin Panel",
  description: "Create a new experience item from the admin panel.",
};

export default function Page() {
  return <AddExperience />;
}
