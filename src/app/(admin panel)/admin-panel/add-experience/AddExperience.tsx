"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { FiPlus, FiTrash2 } from "react-icons/fi";

type PositionForm = {
  title: string;
  employmentType: string;
  startDate: string;
  endDate: string;
  duration: string;
  description: string;
  skills: string[];
};

type ExperienceForm = {
  company: string;
  location: string;
  positions: PositionForm[];
};

type PositionField = keyof Omit<PositionForm, "skills">;

const emptyPosition: PositionForm = {
  title: "",
  employmentType: "",
  startDate: "",
  endDate: "",
  duration: "",
  description: "",
  skills: [""],
};

const initialForm: ExperienceForm = {
  company: "",
  location: "",
  positions: [emptyPosition],
};

const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);

const AddExperience = () => {
  const [form, setForm] = useState<ExperienceForm>(initialForm);

  const handleCompanyFieldChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handlePositionFieldChange = (
    positionIndex: number,
    field: PositionField,
    value: string
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      positions: currentForm.positions.map((position, index) =>
        index === positionIndex ? { ...position, [field]: value } : position
      ),
    }));
  };

  const addPosition = () => {
    setForm((currentForm) => ({
      ...currentForm,
      positions: [...currentForm.positions, { ...emptyPosition, skills: [""] }],
    }));
  };

  const removePosition = (positionIndex: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      positions:
        currentForm.positions.length === 1
          ? [{ ...emptyPosition, skills: [""] }]
          : currentForm.positions.filter((_, index) => index !== positionIndex),
    }));
  };

  const handleSkillChange = (
    positionIndex: number,
    skillIndex: number,
    value: string
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      positions: currentForm.positions.map((position, index) =>
        index === positionIndex
          ? {
              ...position,
              skills: position.skills.map((skill, currentSkillIndex) =>
                currentSkillIndex === skillIndex ? value : skill
              ),
            }
          : position
      ),
    }));
  };

  const addSkill = (positionIndex: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      positions: currentForm.positions.map((position, index) =>
        index === positionIndex
          ? { ...position, skills: [...position.skills, ""] }
          : position
      ),
    }));
  };

  const removeSkill = (positionIndex: number, skillIndex: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      positions: currentForm.positions.map((position, index) =>
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
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const experienceValues = {
      company: form.company,
      location: form.location,
      positions: form.positions.map((position) => ({
        title: position.title,
        employmentType: position.employmentType,
        startDate: position.startDate,
        endDate: position.endDate,
        duration: position.duration,
        description: position.description,
        skills: cleanList(position.skills),
      })),
    };

    console.log("Experience values:", experienceValues);
  };

  return (
    <section className="pb-24">
      <h1 className="londrina mb-7 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Add Experience
      </h1>

      <form onSubmit={handleSubmit} className="borderNew mx-auto max-w-6xl space-y-6 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="company" className="font-semibold">
              Company *
            </label>
            <input
              id="company"
              name="company"
              type="text"
              required
              value={form.company}
              onChange={handleCompanyFieldChange}
              placeholder="SM Technology"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="location" className="font-semibold">
              Location *
            </label>
            <input
              id="location"
              name="location"
              type="text"
              required
              value={form.location}
              onChange={handleCompanyFieldChange}
              placeholder="Dhaka, Bangladesh"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-bold">Positions</h2>
            <button
              type="button"
              onClick={addPosition}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-secondary hover:text-secondary"
            >
              <FiPlus />
              Add Position
            </button>
          </div>

          {form.positions.map((position, positionIndex) => (
            <div
              key={`position-${positionIndex}`}
              className="space-y-4 rounded-md border border-white/15 bg-black/30 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-semibold">Position {positionIndex + 1}</h3>
                <button
                  type="button"
                  onClick={() => removePosition(positionIndex)}
                  className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-primary hover:bg-primary"
                >
                  <FiTrash2 />
                  Remove
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor={`title-${positionIndex}`} className="font-semibold">
                    Title *
                  </label>
                  <input
                    id={`title-${positionIndex}`}
                    type="text"
                    required
                    value={position.title}
                    onChange={(event) =>
                      handlePositionFieldChange(positionIndex, "title", event.target.value)
                    }
                    placeholder="Full Stack Developer"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`employmentType-${positionIndex}`} className="font-semibold">
                    Employment Type *
                  </label>
                  <input
                    id={`employmentType-${positionIndex}`}
                    type="text"
                    required
                    value={position.employmentType}
                    onChange={(event) =>
                      handlePositionFieldChange(
                        positionIndex,
                        "employmentType",
                        event.target.value
                      )
                    }
                    placeholder="Full-time"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <label htmlFor={`startDate-${positionIndex}`} className="font-semibold">
                    Start Date *
                  </label>
                  <input
                    id={`startDate-${positionIndex}`}
                    type="month"
                    required
                    value={position.startDate}
                    onChange={(event) =>
                      handlePositionFieldChange(positionIndex, "startDate", event.target.value)
                    }
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`endDate-${positionIndex}`} className="font-semibold">
                    End Date *
                  </label>
                  <input
                    id={`endDate-${positionIndex}`}
                    type="text"
                    required
                    value={position.endDate}
                    onChange={(event) =>
                      handlePositionFieldChange(positionIndex, "endDate", event.target.value)
                    }
                    placeholder="Present or 2025-12"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor={`duration-${positionIndex}`} className="font-semibold">
                    Duration *
                  </label>
                  <input
                    id={`duration-${positionIndex}`}
                    type="text"
                    required
                    value={position.duration}
                    onChange={(event) =>
                      handlePositionFieldChange(positionIndex, "duration", event.target.value)
                    }
                    placeholder="1.4 yr"
                    className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor={`description-${positionIndex}`} className="font-semibold">
                  Description *
                </label>
                <textarea
                  id={`description-${positionIndex}`}
                  required
                  value={position.description}
                  onChange={(event) =>
                    handlePositionFieldChange(positionIndex, "description", event.target.value)
                  }
                  placeholder="Write the work description"
                  className="min-h-32 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <label className="font-semibold">Skills *</label>
                  <button
                    type="button"
                    onClick={() => addSkill(positionIndex)}
                    className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-secondary hover:text-secondary"
                  >
                    <FiPlus />
                    Add Skill
                  </button>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  {position.skills.map((skill, skillIndex) => (
                    <div key={`skill-${positionIndex}-${skillIndex}`} className="flex gap-2">
                      <input
                        type="text"
                        required={skillIndex === 0}
                        value={skill}
                        onChange={(event) =>
                          handleSkillChange(positionIndex, skillIndex, event.target.value)
                        }
                        placeholder={`Skill ${skillIndex + 1}`}
                        className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
                      />
                      <button
                        type="button"
                        onClick={() => removeSkill(positionIndex, skillIndex)}
                        aria-label={`Remove skill ${skillIndex + 1}`}
                        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/20 text-white transition hover:border-primary hover:bg-primary"
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
          className="bgcolor inline-flex items-center justify-center rounded-md px-10 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Add Experience
        </button>
      </form>
    </section>
  );
};

export default AddExperience;
