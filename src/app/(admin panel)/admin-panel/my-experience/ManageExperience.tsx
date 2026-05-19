"use client";

import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FiEdit3, FiPlus, FiRefreshCw, FiSave, FiTrash2, FiX } from "react-icons/fi";

type PositionItem = {
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  skills: string[];
};

type ExperienceItem = {
  _id: string;
  company: string;
  location: string;
  positions: PositionItem[];
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type PositionField = keyof Omit<PositionItem, "skills">;

const emptyPosition: PositionItem = {
  title: "",
  employmentType: "",
  startDate: "",
  endDate: "",
  duration: "",
  description: "",
  skills: [""],
};

const emptyExperience: ExperienceItem = {
  _id: "",
  company: "",
  location: "",
  positions: [{ ...emptyPosition, skills: [""] }],
};

const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);

const ManageExperience = () => {
  const [items, setItems] = useState<ExperienceItem[]>([]);
  const [editingItem, setEditingItem] = useState<ExperienceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadExperience = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/experiences", { cache: "no-store" });
      const result = (await response.json()) as ApiResponse<ExperienceItem[]>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to load experiences.");
      }

      setItems(result.data ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load experiences.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadExperience();
  }, []);

  const handleCompanyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingItem((currentItem) => ({
      ...(currentItem ?? emptyExperience),
      [name]: value,
    }));
  };

  const handlePositionChange = (
    positionIndex: number,
    field: PositionField,
    value: string
  ) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions: item.positions.map((position, index) =>
          index === positionIndex ? { ...position, [field]: value } : position
        ),
      };
    });
  };

  const handleSkillChange = (positionIndex: number, skillIndex: number, value: string) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions: item.positions.map((position, index) =>
          index === positionIndex
            ? {
                ...position,
                skills: position.skills.map((skill, currentSkillIndex) =>
                  currentSkillIndex === skillIndex ? value : skill
                ),
              }
            : position
        ),
      };
    });
  };

  const addPosition = () => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions: [...item.positions, { ...emptyPosition, skills: [""] }],
      };
    });
  };

  const removePosition = (positionIndex: number) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions:
          item.positions.length === 1
            ? [{ ...emptyPosition, skills: [""] }]
            : item.positions.filter((_, index) => index !== positionIndex),
      };
    });
  };

  const addSkill = (positionIndex: number) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions: item.positions.map((position, index) =>
          index === positionIndex ? { ...position, skills: [...position.skills, ""] } : position
        ),
      };
    });
  };

  const removeSkill = (positionIndex: number, skillIndex: number) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyExperience;

      return {
        ...item,
        positions: item.positions.map((position, index) =>
          index === positionIndex
            ? {
                ...position,
                skills:
                  position.skills.length === 1
                    ? [""]
                    : position.skills.filter((_, indexToRemove) => indexToRemove !== skillIndex),
              }
            : position
        ),
      };
    });
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    const payload = {
      ...editingItem,
      positions: editingItem.positions.map((position) => ({
        ...position,
        skills: cleanList(position.skills),
      })),
    };

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/experiences/${editingItem._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const result = (await response.json()) as ApiResponse<ExperienceItem>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to update experience.");
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item._id === editingItem._id ? result.data ?? item : item))
      );
      setEditingItem(null);
      setMessage(result.message ?? "Experience updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update experience.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this experience item?")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/experiences/${id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to delete experience.");
      }

      setItems((currentItems) => currentItems.filter((item) => item._id !== id));
      setMessage(result.message ?? "Experience deleted successfully.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete experience.");
    }
  };

  return (
    <section className="pb-24">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="londrina text-3xl font-bold md:text-4xl lg:text-5xl">
          My Experience
        </h1>
        <button
          type="button"
          onClick={loadExperience}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-semibold transition hover:border-secondary hover:text-secondary"
        >
          <FiRefreshCw />
          Refresh
        </button>
      </div>

      {message ? <p className="mb-4 font-medium text-green-400">{message}</p> : null}
      {error ? <p className="mb-4 font-medium text-primary">{error}</p> : null}

      {editingItem ? (
        <form onSubmit={handleUpdate} className="borderNew mb-6 space-y-5 p-4 md:p-6">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Update Experience</h2>
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
              name="company"
              value={editingItem.company}
              onChange={handleCompanyChange}
              required
              placeholder="Company"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <input
              name="location"
              value={editingItem.location}
              onChange={handleCompanyChange}
              required
              placeholder="Location"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h3 className="font-bold">Positions</h3>
              <button
                type="button"
                onClick={addPosition}
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm transition hover:border-secondary hover:text-secondary"
              >
                <FiPlus />
                Add Position
              </button>
            </div>

            {editingItem.positions.map((position, positionIndex) => (
              <div key={`edit-position-${positionIndex}`} className="space-y-4 rounded-md border border-white/15 bg-black/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <h4 className="font-semibold">Position {positionIndex + 1}</h4>
                  <button
                    type="button"
                    onClick={() => removePosition(positionIndex)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm transition hover:border-primary hover:bg-primary"
                  >
                    <FiTrash2 />
                    Remove
                  </button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <input
                    value={position.title}
                    onChange={(event) => handlePositionChange(positionIndex, "title", event.target.value)}
                    required
                    placeholder="Title"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                  <input
                    value={position.employmentType}
                    onChange={(event) => handlePositionChange(positionIndex, "employmentType", event.target.value)}
                    required
                    placeholder="Employment type"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-3">
                  <input
                    type="month"
                    value={position.startDate}
                    onChange={(event) => handlePositionChange(positionIndex, "startDate", event.target.value)}
                    required
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                  <input
                    value={position.endDate}
                    onChange={(event) => handlePositionChange(positionIndex, "endDate", event.target.value)}
                    required
                    placeholder="End date"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                  <input
                    value={position.duration}
                    onChange={(event) => handlePositionChange(positionIndex, "duration", event.target.value)}
                    required
                    placeholder="Duration"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>

                <textarea
                  value={position.description}
                  onChange={(event) => handlePositionChange(positionIndex, "description", event.target.value)}
                  required
                  placeholder="Description"
                  className="min-h-28 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <label className="font-semibold">Skills</label>
                    <button
                      type="button"
                      onClick={() => addSkill(positionIndex)}
                      className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm transition hover:border-secondary hover:text-secondary"
                    >
                      <FiPlus />
                      Add Skill
                    </button>
                  </div>

                  <div className="grid gap-3 md:grid-cols-2">
                    {position.skills.map((skill, skillIndex) => (
                      <div key={`edit-skill-${positionIndex}-${skillIndex}`} className="flex gap-2">
                        <input
                          value={skill}
                          onChange={(event) => handleSkillChange(positionIndex, skillIndex, event.target.value)}
                          required={skillIndex === 0}
                          placeholder={`Skill ${skillIndex + 1}`}
                          className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                        />
                        <button
                          type="button"
                          onClick={() => removeSkill(positionIndex, skillIndex)}
                          className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/20 transition hover:border-primary hover:bg-primary"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
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
        <p className="text-white/70">Loading experiences...</p>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <article key={item._id} className="rounded-md border border-white/15 bg-black/35 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{item.company}</h2>
                  <p className="text-white/70">{item.location}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem({ ...item, positions: item.positions.map((position) => ({ ...position, skills: [...position.skills] })) })}
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

              <div className="mt-4 space-y-3">
                {item.positions.map((position, index) => (
                  <div key={`${item._id}-${index}`} className="rounded-md border border-white/10 p-4">
                    <h3 className="font-semibold">{position.title}</h3>
                    <p className="text-sm text-white/60">
                      {position.employmentType} | {position.startDate} - {position.endDate} | {position.duration}
                    </p>
                    <p className="mt-2 text-white/75">{position.description}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {position.skills.map((skill) => (
                        <span key={skill} className="rounded-md border border-white/15 px-2 py-1 text-sm text-white/70">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
          {items.length === 0 ? <p className="text-white/70">No experience items found.</p> : null}
        </div>
      )}
    </section>
  );
};

export default ManageExperience;
