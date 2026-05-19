import crypto from "crypto";

type CloudinaryUpload = {
  url: string;
  secureUrl: string;
  publicId: string;
  originalFilename?: string;
  format?: string;
  resourceType?: string;
  width?: number;
  height?: number;
  bytes?: number;
};

const normalizeFolder = (folder: string) =>
  folder
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean)
    .join("/");

const getCloudinaryConfig = () => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    throw new Error("Cloudinary environment variables are missing.");
  }

  return {
    cloudName,
    apiKey,
    apiSecret,
    baseFolder: process.env.CLOUDINARY_UPLOAD_FOLDER ?? "portfolio",
  };
};

const createSignature = (params: Record<string, string>, apiSecret: string) => {
  const signatureBase = Object.keys(params)
    .sort()
    .map((key) => `${key}=${params[key]}`)
    .join("&");

  return crypto.createHash("sha1").update(`${signatureBase}${apiSecret}`).digest("hex");
};

export const uploadFileToCloudinary = async (
  file: File,
  folderName: string
): Promise<CloudinaryUpload> => {
  const { cloudName, apiKey, apiSecret, baseFolder } = getCloudinaryConfig();
  const timestamp = Math.round(Date.now() / 1000).toString();
  const folder = normalizeFolder(`${baseFolder}/${folderName}`);
  const signature = createSignature({ folder, timestamp }, apiSecret);
  const formData = new FormData();

  formData.append("file", file, file.name);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("folder", folder);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Cloudinary upload failed: ${errorText}`);
  }

  const upload = await response.json();

  return {
    url: upload.url,
    secureUrl: upload.secure_url,
    publicId: upload.public_id,
    originalFilename: upload.original_filename,
    format: upload.format,
    resourceType: upload.resource_type,
    width: upload.width,
    height: upload.height,
    bytes: upload.bytes,
  };
};

export const uploadFilesToCloudinary = async (files: File[], folderName: string) =>
  Promise.all(files.map((file) => uploadFileToCloudinary(file, folderName)));
