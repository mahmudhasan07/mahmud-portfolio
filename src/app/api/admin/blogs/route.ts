import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import {
  getFormFiles,
  getRequiredFormString,
  jsonError,
} from "@/lib/requestHelpers";
import { uploadFilesToCloudinary } from "@/lib/cloudinary";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    const blogs = await db.collection("blogs").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ success: true, data: blogs });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch blogs.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const title = getRequiredFormString(formData, "title");
    const description = getRequiredFormString(formData, "description");
    const imageFiles = getFormFiles(formData, "images");

    if (imageFiles.length === 0) {
      return jsonError("At least one blog image is required.");
    }

    const images = await uploadFilesToCloudinary(imageFiles, "blogs");
    const now = new Date();
    const blog = {
      title,
      description,
      images,
      createdAt: now,
      updatedAt: now,
    };

    const db = await getDatabase();
    const result = await db.collection("blogs").insertOne(blog);

    return NextResponse.json(
      { success: true, message: "Blog created successfully.", data: { _id: result.insertedId, ...blog } },
      { status: 201 }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to create blog.", 500);
  }
}
