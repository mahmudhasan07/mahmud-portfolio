import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import {
  CloudinaryUpload,
  deleteCloudinaryResources,
  uploadFilesToCloudinary,
} from "@/lib/cloudinary";
import { getDatabase } from "@/lib/mongodb";
import {
  getFormFiles,
  getRequiredFormString,
  jsonError,
  parseFormJson,
} from "@/lib/requestHelpers";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

type BlogDocument = {
  images?: CloudinaryUpload[];
};

const getObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid blog id.");
  }

  return new ObjectId(id);
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const blog = await db.collection("blogs").findOne({ _id: getObjectId(id) });

    if (!blog) {
      return jsonError("Blog not found.", 404);
    }

    return NextResponse.json({ success: true, data: blog });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch blog.", 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const formData = await request.formData();
    const db = await getDatabase();
    const existingBlog = await db.collection<BlogDocument>("blogs").findOne({ _id });

    if (!existingBlog) {
      return jsonError("Blog not found.", 404);
    }

    const existingImages = parseFormJson<CloudinaryUpload[]>(
      formData,
      "existingImages",
      []
    );
    const newImages = await uploadFilesToCloudinary(getFormFiles(formData, "images"), "blogs");
    const images = [...existingImages, ...newImages];

    if (images.length === 0) {
      return jsonError("At least one blog image is required.");
    }

    const keptPublicIds = new Set(existingImages.map((image) => image.publicId));
    const removedImages = (existingBlog.images ?? []).filter(
      (image) => !keptPublicIds.has(image.publicId)
    );

    const update = {
      title: getRequiredFormString(formData, "title"),
      description: getRequiredFormString(formData, "description"),
      images,
      updatedAt: new Date(),
    };

    await db.collection("blogs").updateOne({ _id }, { $set: update });
    await deleteCloudinaryResources(removedImages);

    const updatedBlog = await db.collection("blogs").findOne({ _id });

    return NextResponse.json({
      success: true,
      message: "Blog updated successfully.",
      data: updatedBlog,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to update blog.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const db = await getDatabase();
    const existingBlog = await db.collection<BlogDocument>("blogs").findOne({ _id });

    if (!existingBlog) {
      return jsonError("Blog not found.", 404);
    }

    await db.collection("blogs").deleteOne({ _id });
    await deleteCloudinaryResources(existingBlog.images ?? []);

    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully.",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to delete blog.", 500);
  }
}
