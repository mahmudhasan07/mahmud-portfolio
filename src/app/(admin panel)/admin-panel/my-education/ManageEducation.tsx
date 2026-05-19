"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiEdit3, FiRefreshCw, FiSave, FiTrash2, FiX } from "react-icons/fi";

type EducationItem = {
  _id: string;
  title: string;
  institution: string;
  description: string;
  session: string;
  endDate: string;
  cgpa: string;
  outOf: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

const emptyEdit: EducationItem = {
  _id: "",
  title: "",
  institution: "",
  description: "",
  session: "",
  endDate: "",
  cgpa: "",
  outOf: "",
};

const ManageEducation = () => {
  const [items, setItems] = useState<EducationItem[]>([]);
  const [editingItem, setEditingItem] = useState<EducationItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadEducation = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/education", { cache: "no-store" });
      const result = (await response.json()) as ApiResponse<EducationItem[]>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to load education.");
      }

      setItems(result.data ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load education.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadEducation();
  }, []);

  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setEditingItem((currentItem) => ({
      ...(currentItem ?? emptyEdit),
      [name]: value,
    }));
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/education/${editingItem._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingItem),
      });
      const result = (await response.json()) as ApiResponse<EducationItem>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to update education.");
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item._id === editingItem._id ? result.data ?? item : item))
      );
      setEditingItem(null);
      setMessage(result.message ?? "Education updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update education.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this education item?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/education/${id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to delete education.");
      }

      setItems((currentItems) => currentItems.filter((item) => item._id !== id));
      setMessage(result.message ?? "Education deleted successfully.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete education.");
    }
  };

  return (
    <section className="pb-24">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="londrina text-3xl font-bold md:text-4xl lg:text-5xl">
          My Education
        </h1>
        <button
          type="button"
          onClick={loadEducation}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-semibold transition hover:border-secondary hover:text-secondary"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {message ? <p className="mb-4 font-medium text-green-400">{message}</p> : null}
      {error ? <p className="mb-4 font-medium text-primary">{error}</p> : null}

      {editingItem ? (
        <form onSubmit={handleUpdate} className="borderNew mb-6 space-y-4 p-4 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Update Education</h2>
            <button
              type="button"
              onClick={() => setEditingItem(null)}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              <FiX />
              Cancel
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="title"
              value={editingItem.title}
              onChange={handleEditChange}
              required
              placeholder="Degree title"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <input
              name="institution"
              value={editingItem.institution}
              onChange={handleEditChange}
              required
              placeholder="Institution"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <textarea
            name="description"
            value={editingItem.description}
            onChange={handleEditChange}
            required
            placeholder="Description"
            className="min-h-32 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />

          <div className="grid gap-4 md:grid-cols-4">
            <input
              name="session"
              value={editingItem.session}
              onChange={handleEditChange}
              required
              placeholder="Session"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <input
              name="endDate"
              value={editingItem.endDate}
              onChange={handleEditChange}
              required
              placeholder="End date"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <input
              name="cgpa"
              value={editingItem.cgpa}
              onChange={handleEditChange}
              required
              placeholder="CGPA"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <input
              name="outOf"
              value={editingItem.outOf}
              onChange={handleEditChange}
              required
              placeholder="Out of"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <button
            type="submit"
            disabled={isSaving}
            className="bgcolor inline-flex items-center gap-2 rounded-md px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <FiSave />
            {isSaving ? "Saving..." : "Save Update"}
          </button>
        </form>
      ) : null}

      {isLoading ? (
        <p className="text-white/70">Loading education...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item._id} className="rounded-md border border-white/15 bg-black/35 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{item.title}</h2>
                  <p className="text-white/70">{item.institution}</p>
                  <p className="mt-2 text-sm text-white/60">
                    {item.session} - {item.endDate} | CGPA {item.cgpa} / {item.outOf}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(item)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-secondary hover:text-secondary"
                  >
                    <FiEdit3 />
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item._id)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-primary hover:bg-primary"
                  >
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
              <p className="mt-4 text-white/75">{item.description}</p>
            </article>
          ))}
          {items.length === 0 ? <p className="text-white/70">No education items found.</p> : null}
        </div>
      )}
    </section>
  );
};

export default ManageEducation;
