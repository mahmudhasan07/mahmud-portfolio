"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiEdit3, FiImage, FiPlus, FiRefreshCw, FiSave, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

type CloudinaryImage = {
  url?: string;
  secureUrl: string;
  publicId: string;
  originalFilename?: string;
  format?: string;
  resourceType?: string;
  width?: number;
  height?: number;
  bytes?: number;
};

type ProjectItem = {
  _id: string;
  title: string;
  date: string;
  "website-link": string;
  "playStore-link": string;
  "appStore-link": string;
  thumbnail: CloudinaryImage | null;
  images: CloudinaryImage[];
  description: string;
  role: string;
  responsibilities: string[];
  features: string[];
  technologies: string[];
};

type PreviewImage = {
  id: string;
  file: File;
  name: string;
  size: number;
  previewUrl: string;
};

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data?: T;
};

type ListField = "responsibilities" | "features" | "technologies";

const emptyProject: ProjectItem = {
  _id: "",
  title: "",
  date: "",
  "website-link": "",
  "playStore-link": "",
  "appStore-link": "",
  thumbnail: null,
  images: [],
  description: "",
  role: "",
  responsibilities: [""],
  features: [""],
  technologies: [""],
};

const createPreviewImage = (file: File, index: number): PreviewImage => ({
  id: `${file.name}-${file.lastModified}-${index}-${Date.now()}`,
  file,
  name: file.name,
  size: file.size,
  previewUrl: URL.createObjectURL(file),
});

const cleanList = (items: string[]) => items.map((item) => item.trim()).filter(Boolean);

const ManageProjects = () => {
  const [items, setItems] = useState<ProjectItem[]>([]);
  const [editingItem, setEditingItem] = useState<ProjectItem | null>(null);
  const [newThumbnail, setNewThumbnail] = useState<PreviewImage | null>(null);
  const [newImages, setNewImages] = useState<PreviewImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const newThumbnailRef = useRef<PreviewImage | null>(null);
  const newImagesRef = useRef<PreviewImage[]>([]);

  useEffect(() => {
    newThumbnailRef.current = newThumbnail;
  }, [newThumbnail]);

  useEffect(() => {
    newImagesRef.current = newImages;
  }, [newImages]);

  useEffect(() => {
    return () => {
      if (newThumbnailRef.current) {
        URL.revokeObjectURL(newThumbnailRef.current.previewUrl);
      }

      newImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  const clearNewImages = () => {
    if (newThumbnail) {
      URL.revokeObjectURL(newThumbnail.previewUrl);
    }

    newImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setNewThumbnail(null);
    setNewImages([]);
  };

  const loadProjects = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/projects", { cache: "no-store" });
      const result = (await response.json()) as ApiResponse<ProjectItem[]>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to load projects.");
      }

      setItems(result.data ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load projects.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadProjects();
  }, []);

  const startEdit = (item: ProjectItem) => {
    clearNewImages();
    setEditingItem({
      ...item,
      images: [...(item.images ?? [])],
      responsibilities: [...(item.responsibilities?.length ? item.responsibilities : [""])],
      features: [...(item.features?.length ? item.features : [""])],
      technologies: [...(item.technologies?.length ? item.technologies : [""])],
    });
  };

  const cancelEdit = () => {
    clearNewImages();
    setEditingItem(null);
  };

  const handleEditChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;

    setEditingItem((currentItem) =>
      currentItem ? { ...currentItem, [name]: value } : currentItem
    );
  };

  const handleListChange = (field: ListField, index: number, value: string) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyProject;

      return {
        ...item,
        [field]: item[field].map((listItem, itemIndex) =>
          itemIndex === index ? value : listItem
        ),
      };
    });
  };

  const addListItem = (field: ListField) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyProject;

      return {
        ...item,
        [field]: [...item[field], ""],
      };
    });
  };

  const removeListItem = (field: ListField, index: number) => {
    setEditingItem((currentItem) => {
      const item = currentItem ?? emptyProject;

      return {
        ...item,
        [field]:
          item[field].length === 1
            ? [""]
            : item[field].filter((_, itemIndex) => itemIndex !== index),
      };
    });
  };

  const removeExistingImage = (publicId: string) => {
    setEditingItem((currentItem) =>
      currentItem
        ? {
            ...currentItem,
            images: currentItem.images.filter((image) => image.publicId !== publicId),
          }
        : currentItem
    );
  };

  const removeExistingThumbnail = () => {
    setEditingItem((currentItem) => (currentItem ? { ...currentItem, thumbnail: null } : currentItem));
  };

  const handleNewThumbnailChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file || !file.type.startsWith("image/")) {
      return;
    }

    if (newThumbnail) {
      URL.revokeObjectURL(newThumbnail.previewUrl);
    }

    setNewThumbnail(createPreviewImage(file, 0));
    event.target.value = "";
  };

  const handleNewImagesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/")
    );

    setNewImages((currentImages) => [
      ...currentImages,
      ...files.map((file, index) => createPreviewImage(file, index)),
    ]);
    event.target.value = "";
  };

  const removeNewImage = (id: string) => {
    setNewImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== id);
    });
  };

  const handleUpdate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!editingItem) {
      return;
    }

    if (!editingItem.thumbnail && !newThumbnail) {
      setError("Project thumbnail image is required.");
      return;
    }

    if (editingItem.images.length === 0 && newImages.length === 0) {
      setError("At least one project image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editingItem.title);
    formData.append("date", editingItem.date);
    formData.append("website-link", editingItem["website-link"] ?? "");
    formData.append("playStore-link", editingItem["playStore-link"] ?? "");
    formData.append("appStore-link", editingItem["appStore-link"] ?? "");
    formData.append("description", editingItem.description);
    formData.append("role", editingItem.role);
    formData.append("responsibilities", JSON.stringify(cleanList(editingItem.responsibilities)));
    formData.append("features", JSON.stringify(cleanList(editingItem.features)));
    formData.append("technologies", JSON.stringify(cleanList(editingItem.technologies)));
    formData.append("existingThumbnail", JSON.stringify(editingItem.thumbnail));
    formData.append("existingImages", JSON.stringify(editingItem.images));

    if (newThumbnail) {
      formData.append("thumbnail", newThumbnail.file);
    }

    newImages.forEach((image) => {
      formData.append("images", image.file);
    });

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/projects/${editingItem._id}`, {
        method: "PATCH",
        body: formData,
      });
      const result = (await response.json()) as ApiResponse<ProjectItem>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to update project.");
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item._id === editingItem._id ? result.data ?? item : item))
      );
      cancelEdit();
      setMessage(result.message ?? "Project updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update project.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this project? This also removes its Cloudinary images.")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to delete project.");
      }

      setItems((currentItems) => currentItems.filter((item) => item._id !== id));
      setMessage(result.message ?? "Project deleted successfully.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete project.");
    }
  };

  const renderListEditor = (field: ListField, label: string) => {
    if (!editingItem) {
      return null;
    }

    return (
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <label className="font-semibold">{label}</label>
          <button
            type="button"
            onClick={() => addListItem(field)}
            className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm transition hover:border-secondary hover:text-secondary"
          >
            <FiPlus />
            Add
          </button>
        </div>
        <div className="space-y-3">
          {editingItem[field].map((value, index) => (
            <div key={`${field}-${index}`} className="flex gap-2">
              <input
                value={value}
                onChange={(event) => handleListChange(field, index, event.target.value)}
                required={index === 0}
                placeholder={`${label} ${index + 1}`}
                className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
              />
              <button
                type="button"
                onClick={() => removeListItem(field, index)}
                className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-md border border-white/20 transition hover:border-primary hover:bg-primary"
              >
                <FiTrash2 />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="pb-24">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="londrina text-3xl font-bold md:text-4xl lg:text-5xl">My Projects</h1>
        <button
          type="button"
          onClick={loadProjects}
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
            <h2 className="text-xl font-bold">Update Project</h2>
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              <FiX />
              Cancel
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <input name="title" value={editingItem.title} onChange={handleEditChange} required placeholder="Title" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
            <input name="date" value={editingItem.date} onChange={handleEditChange} required placeholder="Date" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <input name="website-link" value={editingItem["website-link"] ?? ""} onChange={handleEditChange} placeholder="Website link" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
            <input name="playStore-link" value={editingItem["playStore-link"] ?? ""} onChange={handleEditChange} placeholder="Play Store link" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
            <input name="appStore-link" value={editingItem["appStore-link"] ?? ""} onChange={handleEditChange} placeholder="App Store link" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
          </div>

          <textarea name="description" value={editingItem.description} onChange={handleEditChange} required placeholder="Description" className="min-h-36 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />
          <input name="role" value={editingItem.role} onChange={handleEditChange} required placeholder="Role" className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary" />

          <div className="space-y-3">
            <p className="font-semibold">Thumbnail</p>
            {(newThumbnail || editingItem.thumbnail) ? (
              <div className="max-w-md overflow-hidden rounded-md border border-white/15 bg-black/40">
                <div className="relative aspect-video bg-black/60">
                  <img src={newThumbnail?.previewUrl ?? editingItem.thumbnail?.secureUrl ?? editingItem.thumbnail?.url} alt="Project thumbnail" className="h-full w-full object-cover" />
                  <button
                    type="button"
                    onClick={() => {
                      if (newThumbnail) {
                        URL.revokeObjectURL(newThumbnail.previewUrl);
                        setNewThumbnail(null);
                      } else {
                        removeExistingThumbnail();
                      }
                    }}
                    className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 transition hover:bg-primary"
                  >
                    <FiX />
                  </button>
                </div>
              </div>
            ) : null}
            <label htmlFor="new-thumbnail" className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/50 bg-black/35 p-5 text-center transition hover:border-secondary hover:bg-secondary/10">
              <FiUploadCloud className="text-3xl text-secondary" />
              <span className="font-semibold">Replace thumbnail</span>
            </label>
            <input id="new-thumbnail" type="file" accept="image/*" onChange={handleNewThumbnailChange} className="sr-only" />
          </div>

          <div className="space-y-3">
            <p className="font-semibold">Current Project Images</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {editingItem.images.map((image) => (
                <div key={image.publicId} className="overflow-hidden rounded-md border border-white/15 bg-black/40">
                  <div className="relative aspect-video bg-black/60">
                    <img src={image.secureUrl || image.url} alt={image.originalFilename ?? "Project image"} className="h-full w-full object-cover" />
                    <button type="button" onClick={() => removeExistingImage(image.publicId)} className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 transition hover:bg-primary">
                      <FiX />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <label htmlFor="new-project-images" className="flex min-h-28 cursor-pointer flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/50 bg-black/35 p-5 text-center transition hover:border-secondary hover:bg-secondary/10">
              <FiUploadCloud className="text-3xl text-secondary" />
              <span className="font-semibold">Add project images</span>
            </label>
            <input id="new-project-images" type="file" accept="image/*" multiple onChange={handleNewImagesChange} className="sr-only" />
            {newImages.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {newImages.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded-md border border-white/15 bg-black/40">
                    <div className="relative aspect-video bg-black/60">
                      <img src={image.previewUrl} alt={image.name} className="h-full w-full object-cover" />
                      <button type="button" onClick={() => removeNewImage(image.id)} className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 transition hover:bg-primary">
                        <FiX />
                      </button>
                    </div>
                    <p className="truncate p-3 text-sm text-white/70">{image.name}</p>
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          {renderListEditor("responsibilities", "Responsibilities")}
          {renderListEditor("features", "Features")}
          {renderListEditor("technologies", "Technologies")}

          <button type="submit" disabled={isSaving} className="bgcolor inline-flex items-center gap-2 rounded-md px-8 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60">
            <FiSave />
            {isSaving ? "Saving..." : "Save Update"}
          </button>
        </form>
      ) : null}

      {isLoading ? (
        <p className="text-white/70">Loading projects...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-md border border-white/15 bg-black/35">
              <div className="aspect-video bg-black/50">
                {item.thumbnail ? (
                  <img src={item.thumbnail.secureUrl || item.thumbnail.url} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-white/30">
                    <FiImage />
                  </div>
                )}
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="text-sm text-white/60">{item.date} | {item.role}</p>
                <p className="line-clamp-3 text-sm leading-6 text-white/70">{item.description}</p>
                <div className="flex gap-2">
                  <button type="button" onClick={() => startEdit(item)} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-secondary hover:text-secondary">
                    <FiEdit3 />
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(item._id)} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-primary hover:bg-primary">
                    <FiTrash2 />
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
          {items.length === 0 ? <p className="text-white/70">No projects found.</p> : null}
        </div>
      )}
    </section>
  );
};

export default ManageProjects;
