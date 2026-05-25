"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type EducationForm = {
  title: string;
  institution: string;
  description: string;
  session: string;
  endDate: string;
  cgpa: string;
  outOf: string;
};

const initialForm: EducationForm = {
  title: "",
  institution: "",
  description: "",
  session: "",
  endDate: "",
  cgpa: "",
  outOf: "",
};

const AddEducation = () => {
  const [form, setForm] = useState<EducationForm>(initialForm);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const educationValues = {
      title: form.title,
      institution: form.institution,
      description: form.description,
      session: form.session,
      endDate: form.endDate,
      cgpa: form.cgpa,
      outOf: form.outOf,
    };

    console.log("Education values:", educationValues);

    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError("");

    try {
      const response = await fetch("/api/admin/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(educationValues),
      });
      const result = (await response.json()) as {
        message?: string;
        data?: unknown;
      };

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to create education.");
      }

      console.log("Saved education:", result.data);
      setSubmitMessage(result.message ?? "Education created successfully.");
      setForm(initialForm);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to create education.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="pb-24">
      <h1 className="londrina mb-7 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Add Education
      </h1>

      <form
        onSubmit={handleSubmit}
        className="borderNew mx-auto max-w-5xl space-y-6 p-4 md:p-8"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="font-semibold">
              Degree Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleFieldChange}
              placeholder="Bachelor of Science (B.Sc.) in Computer Science and Engineering"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="institution" className="font-semibold">
              Institution *
            </label>
            <input
              id="institution"
              name="institution"
              type="text"
              required
              value={form.institution}
              onChange={handleFieldChange}
              placeholder="National University, Bangladesh"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="font-semibold">
            Description *
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={form.description}
            onChange={handleFieldChange}
            placeholder="Write the education description"
            className="min-h-36 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label htmlFor="session" className="font-semibold">
              Session *
            </label>
            <input
              id="session"
              name="session"
              type="text"
              required
              value={form.session}
              onChange={handleFieldChange}
              placeholder="2019 - 2020"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="endDate" className="font-semibold">
              End Date *
            </label>
            <input
              id="endDate"
              name="endDate"
              type="text"
              required
              value={form.endDate}
              onChange={handleFieldChange}
              placeholder="2023"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="cgpa" className="font-semibold">
              CGPA *
            </label>
            <input
              id="cgpa"
              name="cgpa"
              type="text"
              required
              value={form.cgpa}
              onChange={handleFieldChange}
              placeholder="2.99"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="outOf" className="font-semibold">
              Out Of *
            </label>
            <input
              id="outOf"
              name="outOf"
              type="text"
              required
              value={form.outOf}
              onChange={handleFieldChange}
              placeholder="4.00"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bgcolor inline-flex items-center justify-center rounded-md px-10 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Saving..." : "Add Education"}
        </button>
        {submitMessage ? (
          <p className="font-medium text-green-400">{submitMessage}</p>
        ) : null}
        {submitError ? (
          <p className="font-medium text-primary">{submitError}</p>
        ) : null}
      </form>
    </section>
  );
};

export default AddEducation;
