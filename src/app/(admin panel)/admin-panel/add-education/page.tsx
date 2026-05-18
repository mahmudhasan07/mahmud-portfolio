import { Metadata } from "next";
import AddEducation from "./AddEducation";

export const metadata: Metadata = {
  title: "Add Education | Admin Panel",
  description: "Create a new education item from the admin panel.",
};

export default function Page() {
  return <AddEducation />;
}
