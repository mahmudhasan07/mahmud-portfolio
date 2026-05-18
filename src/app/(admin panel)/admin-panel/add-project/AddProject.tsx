"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiImage, FiPlus, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

type PreviewImage = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
};

type TextListKey = "responsibilities" | "features" | "technologies";

type ProjectForm = {
  title: string;
  date: string;
  websiteLink: string;
  playStoreLink: string;
  appStoreLink: string;
  description: string;
  role: string;
  responsibilities: string[];
  features: string[];
  technologies: string[];
};

const initialForm: ProjectForm = {
  title: "",
  date: "",
  websiteLink: "",
  playStoreLink: "",
  appStoreLink: "",
  description: "",
  role: "",
  responsibilities: [""],
  features: [""],
  technologies: [""],
};

const createPreviewImage = (file: File, index = 0): PreviewImage => ({
  id: `${file.name}-${file.lastModified}-${index}-${Date.now()}`,
  file,
  name: file.name,
  size: file.size,
  type: file.type,
  previewUrl: URL.createObjectURL(file),
});

const getImageInfo = ({ file, previewUrl, ...image }: PreviewImage) => ({
  ...image,
  lastModified: file.lastModified,
});

const AddProject = () => {
  const [form, setForm] = useState<ProjectForm>(initialForm);
  const [thumbnail, setThumbnail] = useState<PreviewImage | null>(null);
  const [projectImages, setProjectImages] = useState<PreviewImage[]>([]);
  const thumbnailRef = useRef<PreviewImage | null>(null);
  const projectImagesRef = useRef<PreviewImage[]>([]);

  useEffect(() => {
    thumbnailRef.current = thumbnail;
  }, [thumbnail]);

  useEffect(() => {
    projectImagesRef.current = projectImages;
  }, [projectImages]);

  useEffect(() => {
    return () => {
      if (thumbnailRef.current) {
        URL.revokeObjectURL(thumbnailRef.current.previewUrl);
      }

      projectImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  };

  const handleListChange = (key: TextListKey, index: number, value: string) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: currentForm[key].map((item, itemIndex) =>
        itemIndex === index ? value : item
      ),
    }));
  };

  const addListItem = (key: TextListKey) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]: [...currentForm[key], ""],
    }));
  };

  const removeListItem = (key: TextListKey, index: number) => {
    setForm((currentForm) => ({
      ...currentForm,
      [key]:
        currentForm[key].length === 1
          ? [""]
          : currentForm[key].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const handleThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    setThumbnail((currentThumbnail) => {
      if (currentThumbnail) {
        URL.revokeObjectURL(currentThumbnail.previewUrl);
      }

      return createPreviewImage(file);
    });

    event.target.value = "";
  };

  const removeThumbnail = () => {
    setThumbnail((currentThumbnail) => {
      if (currentThumbnail) {
        URL.revokeObjectURL(currentThumbnail.previewUrl);
      }

      return null;
    });
  };

  const handleProjectImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/")
    );

    const images = files.map((file, index) => createPreviewImage(file, index));
    setProjectImages((currentImages) => [...currentImages, ...images]);
    event.target.value = "";
  };

  const removeProjectImage = (id: string) => {
    setProjectImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== id);
    });
  };

  const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const projectValues = {
      title: form.title,
      date: form.date,
      "website-link": form.websiteLink,
      "playStore-link": form.playStoreLink,
      "appStore-link": form.appStoreLink,
      thumbnail: thumbnail ? getImageInfo(thumbnail) : null,
      thumbnailFile: thumbnail?.file ?? null,
      images: projectImages.map(getImageInfo),
      imageFiles: projectImages.map((image) => image.file),
      description: form.description,
      role: form.role,
      responsibilities: cleanList(form.responsibilities),
      features: cleanList(form.features),
      technologies: cleanList(form.technologies),
    };

    console.log("Project values:", projectValues);
  };

  const renderTextList = (key: TextListKey, label: string, placeholder: string) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label className="font-semibold">{label} *</label>
        <button
          type="button"
          onClick={() => addListItem(key)}
          className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-secondary hover:text-secondary"
        >
          <FiPlus />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {form[key].map((item, index) => (
          <div key={`${key}-${index}`} className="flex gap-2">
            <input
              type="text"
              required={index === 0}
              value={item}
              onChange={(event) => handleListChange(key, index, event.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
            <button
              type="button"
              onClick={() => removeListItem(key, index)}
              aria-label={`Remove ${label} ${index + 1}`}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/20 text-white transition hover:border-primary hover:bg-primary"
            >
              <FiTrash2 />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="pb-24">
      <h1 className="londrina mb-7 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Add Project
      </h1>

      <form onSubmit={handleSubmit} className="borderNew mx-auto max-w-6xl space-y-6 p-4 md:p-8">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="font-semibold">
              Title *
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              value={form.title}
              onChange={handleFieldChange}
              placeholder="Nivaii"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="date" className="font-semibold">
              Date *
            </label>
            <input
              id="date"
              name="date"
              type="text"
              required
              value={form.date}
              onChange={handleFieldChange}
              placeholder="January 2026"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label htmlFor="websiteLink" className="font-semibold">
              Website Link
            </label>
            <input
              id="websiteLink"
              name="websiteLink"
              type="url"
              value={form.websiteLink}
              onChange={handleFieldChange}
              placeholder="https://example.com"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="playStoreLink" className="font-semibold">
              Play Store Link
            </label>
            <input
              id="playStoreLink"
              name="playStoreLink"
              type="url"
              value={form.playStoreLink}
              onChange={handleFieldChange}
              placeholder="https://play.google.com/..."
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="appStoreLink" className="font-semibold">
              App Store Link
            </label>
            <input
              id="appStoreLink"
              name="appStoreLink"
              type="url"
              value={form.appStoreLink}
              onChange={handleFieldChange}
              placeholder="https://apps.apple.com/..."
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_360px]">
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
              placeholder="Write the project description"
              className="min-h-44 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="role" className="font-semibold">
              Role *
            </label>
            <input
              id="role"
              name="role"
              type="text"
              required
              value={form.role}
              onChange={handleFieldChange}
              placeholder="Backend Developer"
              className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
            />
          </div>
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Thumbnail Image *</label>

          {thumbnail ? (
            <div className="overflow-hidden rounded-md border border-white/15 bg-black/40">
              <div className="relative aspect-video bg-black/60">
                <img
                  src={thumbnail.previewUrl}
                  alt={thumbnail.name}
                  className="h-full w-full object-cover"
                />
                <button
                  type="button"
                  onClick={removeThumbnail}
                  aria-label={`Remove ${thumbnail.name}`}
                  className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-primary"
                >
                  <FiX />
                </button>
              </div>
              <div className="flex items-start gap-2 p-3">
                <FiImage className="mt-1 shrink-0 text-secondary" />
                <div className="min-w-0">
                  <p className="truncate font-medium">{thumbnail.name}</p>
                  <p className="text-sm text-white/60">
                    {(thumbnail.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <label
              htmlFor="thumbnail"
              className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/50 bg-black/35 p-6 text-center transition hover:border-secondary hover:bg-secondary/10"
            >
              <FiUploadCloud className="text-4xl text-secondary" />
              <span className="font-semibold">Choose thumbnail image</span>
              <span className="text-sm text-white/60">One main preview image for the project</span>
            </label>
          )}

          <input
            id="thumbnail"
            name="thumbnail"
            type="file"
            accept="image/*"
            required={!thumbnail}
            onChange={handleThumbnailChange}
            className="sr-only"
          />
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Project Images *</label>

          <label
            htmlFor="images"
            className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/50 bg-black/35 p-6 text-center transition hover:border-secondary hover:bg-secondary/10"
          >
            <FiUploadCloud className="text-4xl text-secondary" />
            <span className="font-semibold">Choose project gallery images</span>
            <span className="text-sm text-white/60">Upload all screenshots or project images</span>
          </label>

          <input
            id="images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required={projectImages.length === 0}
            onChange={handleProjectImagesChange}
            className="sr-only"
          />

          {projectImages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projectImages.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded-md border border-white/15 bg-black/40"
                >
                  <div className="relative aspect-video bg-black/60">
                    <img
                      src={image.previewUrl}
                      alt={image.name}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeProjectImage(image.id)}
                      aria-label={`Remove ${image.name}`}
                      className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white transition hover:bg-primary"
                    >
                      <FiX />
                    </button>
                  </div>
                  <div className="flex items-start gap-2 p-3">
                    <FiImage className="mt-1 shrink-0 text-secondary" />
                    <div className="min-w-0">
                      <p className="truncate font-medium">{image.name}</p>
                      <p className="text-sm text-white/60">
                        {(image.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {renderTextList("responsibilities", "Responsibilities", "Responsibility")}
        {renderTextList("features", "Features", "Feature")}
        {renderTextList("technologies", "Technologies", "Technology")}

        <button
          type="submit"
          className="bgcolor inline-flex items-center justify-center rounded-md px-10 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Add Project
        </button>
      </form>
    </section>
  );
};

export default AddProject;
