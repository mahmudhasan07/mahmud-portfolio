import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import {
  getRequiredJsonString,
  jsonError,
} from "@/lib/requestHelpers";

export const runtime = "nodejs";

export async function GET() {
  try {
    const db = await getDatabase();
    const education = await db
      .collection("education")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: education });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch education.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const now = new Date();
    const education = {
      title: getRequiredJsonString(body, "title"),
      institution: getRequiredJsonString(body, "institution"),
      description: getRequiredJsonString(body, "description"),
      session: getRequiredJsonString(body, "session"),
      endDate: getRequiredJsonString(body, "endDate"),
      cgpa: getRequiredJsonString(body, "cgpa"),
      outOf: getRequiredJsonString(body, "outOf"),
      createdAt: now,
      updatedAt: now,
    };

    const db = await getDatabase();
    const result = await db.collection("education").insertOne(education);

    return NextResponse.json(
      {
        success: true,
        message: "Education created successfully.",
        data: { _id: result.insertedId, ...education },
      },
      { status: 201 }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to create education.", 500);
  }
}
