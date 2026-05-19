import crypto from "crypto";

const ITERATIONS = 120000;
const KEY_LENGTH = 64;
const DIGEST = "sha512";

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, ITERATIONS, KEY_LENGTH, DIGEST)
    .toString("hex");

  return `${ITERATIONS}:${salt}:${hash}`;
};

export const verifyPassword = (password: string, storedHash: string) => {
  const [iterationsValue, salt, originalHash] = storedHash.split(":");
  const iterations = Number(iterationsValue);

  if (!iterations || !salt || !originalHash) {
    return false;
  }

  const hash = crypto
    .pbkdf2Sync(password, salt, iterations, KEY_LENGTH, DIGEST)
    .toString("hex");
  const hashBuffer = Buffer.from(hash, "hex");
  const originalHashBuffer = Buffer.from(originalHash, "hex");

  if (hashBuffer.length !== originalHashBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(hashBuffer, originalHashBuffer);
};
