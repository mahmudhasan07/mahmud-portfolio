import { NextResponse } from "next/server";

export const jsonError = (message: string, status = 400) =>
  NextResponse.json({ success: false, message }, { status });

export const getRequiredFormString = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
};

export const getOptionalFormString = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

const isFile = (value: FormDataEntryValue): value is File =>
  typeof value === "object" &&
  "arrayBuffer" in value &&
  "name" in value &&
  "size" in value;

export const getFormFiles = (formData: FormData, key: string) =>
  formData
    .getAll(key)
    .filter((value): value is File => isFile(value) && value.size > 0);

export const parseStringArray = (formData: FormData, key: string) => {
  const value = formData.get(key);

  if (typeof value !== "string") {
    return [];
  }

  try {
    const parsed = JSON.parse(value);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map((item) => (typeof item === "string" ? item.trim() : ""))
      .filter(Boolean);
  } catch {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
};

export const parseFormJson = <T>(formData: FormData, key: string, fallback: T): T => {
  const value = formData.get(key);

  if (typeof value !== "string" || !value.trim()) {
    return fallback;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
};

export const getRequiredJsonString = (
  body: Record<string, unknown>,
  key: string
) => {
  const value = body[key];

  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${key} is required.`);
  }

  return value.trim();
};

export const getOptionalJsonString = (
  body: Record<string, unknown>,
  key: string
) => {
  const value = body[key];
  return typeof value === "string" ? value.trim() : "";
};

export const getJsonStringArray = (
  body: Record<string, unknown>,
  key: string
) => {
  const value = body[key];

  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => (typeof item === "string" ? item.trim() : ""))
    .filter(Boolean);
};
