import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import {
  CloudinaryUpload,
  deleteCloudinaryResources,
  uploadFileToCloudinary,
  uploadFilesToCloudinary,
} from "@/lib/cloudinary";
import { getDatabase } from "@/lib/mongodb";
import {
  getFormFiles,
  getOptionalFormString,
  getRequiredFormString,
  jsonError,
  parseFormJson,
  parseStringArray,
} from "@/lib/requestHelpers";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type ProjectDocument = {
  thumbnail?: CloudinaryUpload | null;
  images?: CloudinaryUpload[];
};

const getObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid project id.");
  }

  return new ObjectId(id);
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const project = await db.collection("projects").findOne({ _id: getObjectId(id) });

    if (!project) {
      return jsonError("Project not found.", 404);
    }

    return NextResponse.json({ success: true, data: project });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch project.", 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const formData = await request.formData();
    const db = await getDatabase();
    const existingProject = await db.collection<ProjectDocument>("projects").findOne({ _id });

    if (!existingProject) {
      return jsonError("Project not found.", 404);
    }

    const thumbnailFiles = getFormFiles(formData, "thumbnail");
    const existingThumbnail = parseFormJson<CloudinaryUpload | null>(
      formData,
      "existingThumbnail",
      null
    );
    const thumbnail =
      thumbnailFiles.length > 0
        ? await uploadFileToCloudinary(thumbnailFiles[0], "projects/thumbnails")
        : existingThumbnail;

    if (!thumbnail) {
      return jsonError("Project thumbnail image is required.");
    }

    const existingImages = parseFormJson<CloudinaryUpload[]>(
      formData,
      "existingImages",
      []
    );
    const newImages = await uploadFilesToCloudinary(
      getFormFiles(formData, "images"),
      "projects/gallery"
    );
    const images = [...existingImages, ...newImages];

    if (images.length === 0) {
      return jsonError("At least one project image is required.");
    }

    const responsibilities = parseStringArray(formData, "responsibilities");
    const features = parseStringArray(formData, "features");
    const technologies = parseStringArray(formData, "technologies");

    if (responsibilities.length === 0) {
      return jsonError("At least one responsibility is required.");
    }

    if (features.length === 0) {
      return jsonError("At least one feature is required.");
    }

    if (technologies.length === 0) {
      return jsonError("At least one technology is required.");
    }

    const keptImagePublicIds = new Set(existingImages.map((image) => image.publicId));
    const removedImages = (existingProject.images ?? []).filter(
      (image) => !keptImagePublicIds.has(image.publicId)
    );
    const removedThumbnail =
      existingProject.thumbnail &&
      existingProject.thumbnail.publicId !== thumbnail.publicId
        ? [existingProject.thumbnail]
        : [];

    const update = {
      title: getRequiredFormString(formData, "title"),
      date: getRequiredFormString(formData, "date"),
      "website-link": getOptionalFormString(formData, "website-link"),
      "playStore-link": getOptionalFormString(formData, "playStore-link"),
      "appStore-link": getOptionalFormString(formData, "appStore-link"),
      thumbnail,
      images,
      description: getRequiredFormString(formData, "description"),
      role: getRequiredFormString(formData, "role"),
      responsibilities,
      features,
      technologies,
      updatedAt: new Date(),
    };

    await db.collection("projects").updateOne({ _id }, { $set: update });
    await deleteCloudinaryResources([...removedImages, ...removedThumbnail]);

    const updatedProject = await db.collection("projects").findOne({ _id });

    return NextResponse.json({
      success: true,
      message: "Project updated successfully.",
      data: updatedProject,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to update project.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const db = await getDatabase();
    const existingProject = await db.collection<ProjectDocument>("projects").findOne({ _id });

    if (!existingProject) {
      return jsonError("Project not found.", 404);
    }

    await db.collection("projects").deleteOne({ _id });
    await deleteCloudinaryResources([
      ...(existingProject.images ?? []),
      ...(existingProject.thumbnail ? [existingProject.thumbnail] : []),
    ]);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully.",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to delete project.", 500);
  }
}
