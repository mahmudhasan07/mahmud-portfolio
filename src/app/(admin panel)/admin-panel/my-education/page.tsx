import { Metadata } from "next";
import ManageEducation from "./ManageEducation";

export const metadata: Metadata = {
  title: "My Education | Admin Panel",
  description: "Manage education items from the admin panel.",
};

export default function Page() {
  return <ManageEducation />;
}
