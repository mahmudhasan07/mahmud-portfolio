"use client";

import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { FiEdit3, FiImage, FiRefreshCw, FiSave, FiTrash2, FiUploadCloud, FiX } from "react-icons/fi";

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

type BlogItem = {
  _id: string;
  title: string;
  description: string;
  images: CloudinaryImage[];
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

const stripHtml = (html: string) => html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

const createPreviewImage = (file: File, index: number): PreviewImage => ({
  id: `${file.name}-${file.lastModified}-${index}-${Date.now()}`,
  file,
  name: file.name,
  size: file.size,
  previewUrl: URL.createObjectURL(file),
});

const ManageBlogs = () => {
  const [items, setItems] = useState<BlogItem[]>([]);
  const [editingItem, setEditingItem] = useState<BlogItem | null>(null);
  const [newImages, setNewImages] = useState<PreviewImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const newImagesRef = useRef<PreviewImage[]>([]);

  useEffect(() => {
    newImagesRef.current = newImages;
  }, [newImages]);

  useEffect(() => {
    return () => {
      newImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  const loadBlogs = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/blogs", { cache: "no-store" });
      const result = (await response.json()) as ApiResponse<BlogItem[]>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to load blogs.");
      }

      setItems(result.data ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Failed to load blogs.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadBlogs();
  }, []);

  const startEdit = (item: BlogItem) => {
    newImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setNewImages([]);
    setEditingItem({ ...item, images: [...(item.images ?? [])] });
  };

  const cancelEdit = () => {
    newImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    setNewImages([]);
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

    if (editingItem.images.length === 0 && newImages.length === 0) {
      setError("At least one blog image is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", editingItem.title);
    formData.append("description", editingItem.description);
    formData.append("existingImages", JSON.stringify(editingItem.images));
    newImages.forEach((image) => {
      formData.append("images", image.file);
    });

    setIsSaving(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/blogs/${editingItem._id}`, {
        method: "PATCH",
        body: formData,
      });
      const result = (await response.json()) as ApiResponse<BlogItem>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to update blog.");
      }

      setItems((currentItems) =>
        currentItems.map((item) => (item._id === editingItem._id ? result.data ?? item : item))
      );
      cancelEdit();
      setMessage(result.message ?? "Blog updated successfully.");
    } catch (updateError) {
      setError(updateError instanceof Error ? updateError.message : "Failed to update blog.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this blog? This also removes its Cloudinary images.")) {
      return;
    }

    setMessage("");
    setError("");

    try {
      const response = await fetch(`/api/admin/blogs/${id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as ApiResponse<null>;

      if (!response.ok) {
        throw new Error(result.message ?? "Failed to delete blog.");
      }

      setItems((currentItems) => currentItems.filter((item) => item._id !== id));
      setMessage(result.message ?? "Blog deleted successfully.");
    } catch (deleteError) {
      setError(deleteError instanceof Error ? deleteError.message : "Failed to delete blog.");
    }
  };

  return (
    <section className="pb-24">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <h1 className="londrina text-3xl font-bold md:text-4xl lg:text-5xl">My Blogs</h1>
        <button
          type="button"
          onClick={loadBlogs}
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
            <h2 className="text-xl font-bold">Update Blog</h2>
            <button
              type="button"
              onClick={cancelEdit}
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 transition hover:border-primary hover:text-primary"
            >
              <FiX />
              Cancel
            </button>
          </div>

          <input
            name="title"
            value={editingItem.title}
            onChange={handleEditChange}
            required
            placeholder="Blog title"
            className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />

          <textarea
            name="description"
            value={editingItem.description}
            onChange={handleEditChange}
            required
            placeholder="Blog description"
            className="min-h-44 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />

          <div className="space-y-3">
            <p className="font-semibold">Current Images</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {editingItem.images.map((image) => (
                <div key={image.publicId} className="overflow-hidden rounded-md border border-white/15 bg-black/40">
                  <div className="relative aspect-video bg-black/60">
                    <img src={image.secureUrl || image.url} alt={image.originalFilename ?? "Blog image"} className="h-full w-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(image.publicId)}
                      className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 transition hover:bg-primary"
                    >
                      <FiX />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label htmlFor="new-blog-images" className="flex min-h-32 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/50 bg-black/35 p-6 text-center transition hover:border-secondary hover:bg-secondary/10">
              <FiUploadCloud className="text-3xl text-secondary" />
              <span className="font-semibold">Add more blog images</span>
            </label>
            <input id="new-blog-images" type="file" accept="image/*" multiple onChange={handleNewImagesChange} className="sr-only" />

            {newImages.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {newImages.map((image) => (
                  <div key={image.id} className="overflow-hidden rounded-md border border-white/15 bg-black/40">
                    <div className="relative aspect-video bg-black/60">
                      <img src={image.previewUrl} alt={image.name} className="h-full w-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeNewImage(image.id)}
                        className="absolute right-2 top-2 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/80 transition hover:bg-primary"
                      >
                        <FiX />
                      </button>
                    </div>
                    <p className="truncate p-3 text-sm text-white/70">{image.name}</p>
                  </div>
                ))}
              </div>
            ) : null}
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
        <p className="text-white/70">Loading blogs...</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <article key={item._id} className="overflow-hidden rounded-md border border-white/15 bg-black/35">
              <div className="aspect-video bg-black/50">
                {item.images?.[0] ? (
                  <img src={item.images[0].secureUrl || item.images[0].url} alt={item.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-4xl text-white/30">
                    <FiImage />
                  </div>
                )}
              </div>
              <div className="space-y-3 p-5">
                <h2 className="text-xl font-bold">{item.title}</h2>
                <p className="line-clamp-3 text-sm leading-6 text-white/70">{stripHtml(item.description)}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(item)}
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
            </article>
          ))}
          {items.length === 0 ? <p className="text-white/70">No blogs found.</p> : null}
        </div>
      )}
    </section>
  );
};

export default ManageBlogs;
