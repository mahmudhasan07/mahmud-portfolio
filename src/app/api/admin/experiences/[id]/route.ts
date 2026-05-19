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
    throw new Error("Invalid experience id.");
  }

  return new ObjectId(id);
};

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

    const cleanedSkills = skills
      .map((skill) => (typeof skill === "string" ? skill.trim() : ""))
      .filter(Boolean);

    if (cleanedSkills.length === 0) {
      throw new Error(`Position ${index + 1} needs at least one skill.`);
    }

    return {
      title: getRequiredJsonString(positionBody, "title"),
      employmentType: getRequiredJsonString(positionBody, "employmentType"),
      startDate: getRequiredJsonString(positionBody, "startDate"),
      endDate: getRequiredJsonString(positionBody, "endDate"),
      duration: getRequiredJsonString(positionBody, "duration"),
      description: getRequiredJsonString(positionBody, "description"),
      skills: cleanedSkills,
    };
  });
};

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const experience = await db.collection("experiences").findOne({ _id: getObjectId(id) });

    if (!experience) {
      return jsonError("Experience not found.", 404);
    }

    return NextResponse.json({ success: true, data: experience });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to fetch experience.", 500);
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const _id = getObjectId(id);
    const body = (await request.json()) as Record<string, unknown>;
    const db = await getDatabase();
    const update = {
      company: getRequiredJsonString(body, "company"),
      location: getRequiredJsonString(body, "location"),
      positions: parsePositions(body),
      updatedAt: new Date(),
    };
    const result = await db.collection("experiences").updateOne({ _id }, { $set: update });

    if (result.matchedCount === 0) {
      return jsonError("Experience not found.", 404);
    }

    const updatedExperience = await db.collection("experiences").findOne({ _id });

    return NextResponse.json({
      success: true,
      message: "Experience updated successfully.",
      data: updatedExperience,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to update experience.", 500);
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const db = await getDatabase();
    const result = await db.collection("experiences").deleteOne({ _id: getObjectId(id) });

    if (result.deletedCount === 0) {
      return jsonError("Experience not found.", 404);
    }

    return NextResponse.json({
      success: true,
      message: "Experience deleted successfully.",
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Failed to delete experience.", 500);
  }
}
