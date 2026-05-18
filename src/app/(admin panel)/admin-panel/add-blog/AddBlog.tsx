"use client";

import { ChangeEvent, FormEvent, useEffect, useId, useRef, useState } from "react";
import { FiImage, FiUploadCloud, FiX } from "react-icons/fi";

const TINY_API_KEY = "y5ptvwx6va2ot9598uiaqpyk2utb8tcqbwookld4l6jpwkwh";
const TINY_SCRIPT_ID = "tiny-cloud-script";

type TinyEditor = {
  getContent: () => string;
  on: (events: string, callback: () => void) => void;
  remove: () => void;
};

type TinyMCE = {
  get?: (id: string) => TinyEditor | null;
  init: (options: {
    selector: string;
    height: number;
    menubar: boolean;
    plugins: string;
    toolbar: string;
    branding: boolean;
    promotion: boolean;
    placeholder: string;
    content_style: string;
    setup: (editor: TinyEditor) => void;
  }) => Promise<TinyEditor[]>;
};

type PreviewImage = {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  previewUrl: string;
};

declare global {
  interface Window {
    tinymce?: TinyMCE;
  }
}

const AddBlog = () => {
  const reactId = useId();
  const editorId = `blog-description-${reactId.replace(/:/g, "")}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState<PreviewImage[]>([]);
  const [editorReady, setEditorReady] = useState(false);
  const [descriptionError, setDescriptionError] = useState("");
  const selectedImagesRef = useRef<PreviewImage[]>([]);

  useEffect(() => {
    let isMounted = true;
    let initializedEditor: TinyEditor | null = null;

    const initEditor = async () => {
      if (!window.tinymce || !isMounted) {
        return;
      }

      window.tinymce.get?.(editorId)?.remove();

      const editors = await window.tinymce.init({
        selector: `#${editorId}`,
        height: 360,
        menubar: false,
        plugins:
          "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table help wordcount",
        toolbar:
          "undo redo | blocks | bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media table | removeformat preview code",
        branding: false,
        promotion: false,
        placeholder: "Write your blog description...",
        content_style:
          "body { font-family: Inter, Arial, sans-serif; font-size: 16px; line-height: 1.7; color: #111827; }",
        setup: (editor) => {
          initializedEditor = editor;
          editor.on("init change keyup undo redo", () => {
            setDescription(editor.getContent());
            setDescriptionError("");
          });
        },
      });

      if (isMounted) {
        initializedEditor = editors[0] ?? initializedEditor;
        setEditorReady(true);
      }
    };

    const existingScript = document.getElementById(TINY_SCRIPT_ID);
    let scriptElement: HTMLScriptElement | null = null;

    if (window.tinymce) {
      void initEditor();
    } else if (existingScript) {
      existingScript.addEventListener("load", initEditor);
    } else {
      const script = document.createElement("script");
      script.id = TINY_SCRIPT_ID;
      script.src = `https://cdn.tiny.cloud/1/${TINY_API_KEY}/tinymce/7/tinymce.min.js`;
      script.referrerPolicy = "origin";
      script.addEventListener("load", initEditor);
      document.head.appendChild(script);
      scriptElement = script;
    }

    return () => {
      isMounted = false;
      existingScript?.removeEventListener("load", initEditor);
      scriptElement?.removeEventListener("load", initEditor);
      initializedEditor?.remove();
      window.tinymce?.get?.(editorId)?.remove();
    };
  }, [editorId]);

  useEffect(() => {
    selectedImagesRef.current = selectedImages;
  }, [selectedImages]);

  useEffect(() => {
    return () => {
      selectedImagesRef.current.forEach((image) => URL.revokeObjectURL(image.previewUrl));
    };
  }, []);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []).filter((file) =>
      file.type.startsWith("image/")
    );

    const images = files.map((file, index) => ({
      id: `${file.name}-${file.lastModified}-${index}-${Date.now()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedImages((currentImages) => [...currentImages, ...images]);
    event.target.value = "";
  };

  const removeImage = (id: string) => {
    setSelectedImages((currentImages) => {
      const imageToRemove = currentImages.find((image) => image.id === id);

      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.previewUrl);
      }

      return currentImages.filter((image) => image.id !== id);
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!description.replace(/<[^>]*>/g, "").trim()) {
      setDescriptionError("Description is required.");
      return;
    }

    const blogValues = {
      title,
      description,
      images: selectedImages.map(({ file, previewUrl, ...image }) => ({
        ...image,
        lastModified: file.lastModified,
      })),
      imageFiles: selectedImages.map((image) => image.file),
    };

    console.log("Blog values:", blogValues);
  };

  return (
    <section className="pb-24">
      <h1 className="londrina mb-7 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Add Blog
      </h1>

      <form onSubmit={handleSubmit} className="borderNew mx-auto max-w-5xl space-y-6 p-4 md:p-8">
        <div className="space-y-2">
          <label htmlFor="blog-title" className="font-semibold">
            Title *
          </label>
          <input
            id="blog-title"
            name="title"
            type="text"
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter blog title"
            className="w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <label htmlFor={editorId} className="font-semibold">
              Description *
            </label>
            <span className="text-sm text-white/60">
              {editorReady ? "Editor ready" : "Loading editor..."}
            </span>
          </div>
          <textarea
            id={editorId}
            name="description"
            value={description}
            onChange={(event) => {
              setDescription(event.target.value);
              setDescriptionError("");
            }}
            aria-required="true"
            className="min-h-72 w-full rounded-md border border-[#AAAAAA] p-3 text-white outline-none focus:border-secondary"
          />
          {descriptionError ? (
            <p className="text-sm font-medium text-primary">{descriptionError}</p>
          ) : null}
        </div>

        <div className="space-y-3">
          <label className="font-semibold">Images *</label>

          <label
            htmlFor="blog-images"
            className="flex min-h-40 cursor-pointer flex-col items-center justify-center gap-3 rounded-md border border-dashed border-white/50 bg-black/35 p-6 text-center transition hover:border-secondary hover:bg-secondary/10"
          >
            <FiUploadCloud className="text-4xl text-secondary" />
            <span className="font-semibold">Choose blog images</span>
            <span className="text-sm text-white/60">PNG, JPG, WEBP, or GIF files</span>
          </label>

          <input
            id="blog-images"
            name="images"
            type="file"
            accept="image/*"
            multiple
            required={selectedImages.length === 0}
            onChange={handleImageChange}
            className="sr-only"
          />

          {selectedImages.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {selectedImages.map((image) => (
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
                      onClick={() => removeImage(image.id)}
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

        <button
          type="submit"
          className="bgcolor inline-flex items-center justify-center rounded-md px-10 py-3 font-semibold text-white transition hover:opacity-90"
        >
          Add Blog
        </button>
      </form>
    </section>
  );
};

export default AddBlog;
