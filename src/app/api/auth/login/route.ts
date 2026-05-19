import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { createAdminToken, AUTH_COOKIE_NAME } from "@/lib/jwt";
import { getDatabase } from "@/lib/mongodb";
import { verifyPassword } from "@/lib/password";
import { AdminUser, ensureSeedAdmin } from "@/lib/seedAdmin";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await ensureSeedAdmin();

    const body = (await request.json()) as { email?: string; password?: string };
    const email = body.email?.trim().toLowerCase();
    const password = body.password ?? "";

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required." },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const admin = await db.collection<AdminUser>("adminUsers").findOne({ email });

    if (!admin || admin.role !== "ADMIN" || !verifyPassword(password, admin.passwordHash)) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      );
    }

    const adminId = admin._id instanceof ObjectId ? admin._id.toString() : String(admin._id);
    const token = await createAdminToken({
      sub: adminId,
      email: admin.email,
      role: "ADMIN",
    });
    const response = NextResponse.json({
      success: true,
      message: "Login successful.",
      data: {
        email: admin.email,
        role: admin.role,
      },
    });

    response.cookies.set(AUTH_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Login failed.",
      },
      { status: 500 }
    );
  }
}
