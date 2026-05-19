import { Metadata } from "next";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | Mahmud Portfolio",
  description: "Login to the admin panel.",
};

export default function Page() {
  return (
    <section className="pb-24">
      <div className="mb-8 text-center">
        <h1 className="londrina mb-3 text-3xl font-bold md:text-4xl lg:text-5xl">
          Admin Login
        </h1>
        <p className="mx-auto max-w-xl text-white/70">
          Sign in to manage portfolio content.
        </p>
      </div>

      <LoginForm />
    </section>
  );
}
