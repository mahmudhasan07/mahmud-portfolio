import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import { getRequiredJsonString, jsonError } from "@/lib/requestHelpers";

export const runtime = "nodejs";

type RouteContext = {
  params: Promise<{ id: string }>;
};

const getObjectId = (id: string) => {
  if (!ObjectId.isValid(id)) {
    throw new Error("Invalid education id.");
  }

  return new ObjectId(id);
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const education = await db.collection("education").findOne({ _id: getObjectId(id) });

    if (!education) {
      return jsonError("Education not found.", 404);
    }

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch education.", 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const body = (await request.json()) as Record<string, unknown>;
    const db = await getDatabase();
    const update = {
      title: getRequiredJsonString(body, "title"),
      institution: getRequiredJsonString(body, "institution"),
      description: getRequiredJsonString(body, "description"),
      session: getRequiredJsonString(body, "session"),
      endDate: getRequiredJsonString(body, "endDate"),
      cgpa: getRequiredJsonString(body, "cgpa"),
      outOf: getRequiredJsonString(body, "outOf"),
      updatedAt: new Date(),
    };
    const result = await db.collection("education").updateOne({ _id }, { $set: update });

    if (result.matchedCount === 0) {
      return jsonError("Education not found.", 404);
    }

    const updatedEducation = await db.collection("education").findOne({ _id });

    return NextResponse.json({
      success: true,
      message: "Education updated successfully.",
      data: updatedEducation,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to update education.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const result = await db.collection("education").deleteOne({ _id: getObjectId(id) });

    if (result.deletedCount === 0) {
      return jsonError("Education not found.", 404);
    }

    return NextResponse.json({
      success: true,
      message: "Education deleted successfully.",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to delete education.", 500);
  }
}
