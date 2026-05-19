import { NextResponse } from "next/server";
import { uploadFileToCloudinary, uploadFilesToCloudinary } from "@/lib/cloudinary";
import { getDatabase } from "@/lib/mongodb";
import {
  getFormFiles,
  getOptionalFormString,
  getRequiredFormString,
  jsonError,
  parseStringArray,
} from "@/lib/requestHelpers";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    const projects = await db
      .collection("projects")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: projects });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch projects.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const thumbnailFiles = getFormFiles(formData, "thumbnail");
    const imageFiles = getFormFiles(formData, "images");

    if (thumbnailFiles.length === 0) {
      return jsonError("Project thumbnail image is required.");
    }

    if (imageFiles.length === 0) {
      return jsonError("At least one project image is required.");
    }

    const [thumbnail, images] = await Promise.all([
      uploadFileToCloudinary(thumbnailFiles[0], "projects/thumbnails"),
      uploadFilesToCloudinary(imageFiles, "projects/gallery"),
    ]);

    const now = new Date();
    const project = {
      title: getRequiredFormString(formData, "title"),
      date: getRequiredFormString(formData, "date"),
      "website-link": getOptionalFormString(formData, "website-link"),
      "playStore-link": getOptionalFormString(formData, "playStore-link"),
      "appStore-link": getOptionalFormString(formData, "appStore-link"),
      thumbnail,
      images,
      description: getRequiredFormString(formData, "description"),
      role: getRequiredFormString(formData, "role"),
      responsibilities: parseStringArray(formData, "responsibilities"),
      features: parseStringArray(formData, "features"),
      technologies: parseStringArray(formData, "technologies"),
      createdAt: now,
      updatedAt: now,
    };

    if (project.responsibilities.length === 0) {
      return jsonError("At least one responsibility is required.");
    }

    if (project.features.length === 0) {
      return jsonError("At least one feature is required.");
    }

    if (project.technologies.length === 0) {
      return jsonError("At least one technology is required.");
    }

    const db = await getDatabase();
    const result = await db.collection("projects").insertOne(project);

    return NextResponse.json(
      {
        success: true,
        message: "Project created successfully.",
        data: { _id: result.insertedId, ...project },
      },
      { status: 201 }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to create project.", 500);
  }
}
