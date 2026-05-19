"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FiLock, FiLogIn, FiMail } from "react-icons/fi";

type LoginResponse = {
  success: boolean;
  message?: string;
};

const LoginFormInner = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const result = (await response.json()) as LoginResponse;

      if (!response.ok) {
        throw new Error(result.message ?? "Login failed.");
      }

      const nextPath = searchParams.get("next");
      router.replace(nextPath?.startsWith("/") ? nextPath : "/admin-panel");
      router.refresh();
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="borderNew mx-auto max-w-md space-y-5 p-5 md:p-8">
      <div className="space-y-2">
        <label htmlFor="email" className="font-semibold">
          Email
        </label>
        <div className="relative">
          <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
            required
            placeholder="admin@example.com"
            className="w-full rounded-md border border-[#AAAAAA] py-3 pl-10 pr-3 text-white outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="font-semibold">
          Password
        </label>
        <div className="relative">
          <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            placeholder="Enter password"
            className="w-full rounded-md border border-[#AAAAAA] py-3 pl-10 pr-3 text-white outline-none focus:border-secondary"
          />
        </div>
      </div>

      {error ? <p className="font-medium text-primary">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="bgcolor inline-flex w-full items-center justify-center gap-2 rounded-md px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiLogIn />
        {isSubmitting ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

const LoginForm = () => (
  <Suspense fallback={<p className="text-center text-white/70">Loading login...</p>}>
    <LoginFormInner />
  </Suspense>
);

export default LoginForm;
