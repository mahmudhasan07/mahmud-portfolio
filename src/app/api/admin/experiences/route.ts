import { NextResponse } from "next/server";
import { getDatabase } from "@/lib/mongodb";
import {
  getRequiredJsonString,
  jsonError,
} from "@/lib/requestHelpers";

export const runtime = "nodejs";

const parsePositions = (body: Record<string, unknown>) => {
  const positions = body.positions;

  if (!Array.isArray(positions) || positions.length === 0) {
    throw new Error("At least one position is required.");
  }

  return positions.map((position, index) => {
    if (!position || typeof position !== "object") {
      throw new Error(`Position ${index + 1} is invalid.`);
    }

    const positionBody = position as Record<string, unknown>;
    const skills = positionBody.skills;

    if (!Array.isArray(skills) || skills.length === 0) {
      throw new Error(`Position ${index + 1} needs at least one skill.`);
    }

    return {
      title: getRequiredJsonString(positionBody, "title"),
      employmentType: getRequiredJsonString(positionBody, "employmentType"),
      startDate: getRequiredJsonString(positionBody, "startDate"),
      endDate: getRequiredJsonString(positionBody, "endDate"),
      duration: getRequiredJsonString(positionBody, "duration"),
      description: getRequiredJsonString(positionBody, "description"),
      skills: skills
        .map((skill) => (typeof skill === "string" ? skill.trim() : ""))
        .filter(Boolean),
    };
  });
};

export async function GET() {
  try {
    const db = await getDatabase();
    const experiences = await db
      .collection("experiences")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, data: experiences });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch experiences.", 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const now = new Date();
    const experience = {
      company: getRequiredJsonString(body, "company"),
      location: getRequiredJsonString(body, "location"),
      positions: parsePositions(body),
      createdAt: now,
      updatedAt: now,
    };

    const db = await getDatabase();
    const result = await db.collection("experiences").insertOne(experience);

    return NextResponse.json(
      {
        success: true,
        message: "Experience created successfully.",
        data: { _id: result.insertedId, ...experience },
      },
      { status: 201 }
    );
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to create experience.", 500);
  }
}
