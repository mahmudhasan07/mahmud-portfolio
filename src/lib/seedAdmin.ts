import { getDatabase } from "@/lib/mongodb";
import { hashPassword } from "@/lib/password";

export const SEED_ADMIN_EMAIL = "mahmudhasan.hb07@gmail.com";
const SEED_ADMIN_PASSWORD = "Mahmud07@@";

export type AdminUser = {
  _id: unknown;
  email: string;
  passwordHash: string;
  role: "ADMIN";
  seedAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export const ensureSeedAdmin = async () => {
  const db = await getDatabase();
  const adminUsers = db.collection<AdminUser>("adminUsers");

  await adminUsers.createIndex({ email: 1 }, { unique: true });

  const existingSeedAdmin = await adminUsers.findOne({ seedAdmin: true });

  if (existingSeedAdmin) {
    return existingSeedAdmin;
  }

  const existingEmailAdmin = await adminUsers.findOne({
    email: SEED_ADMIN_EMAIL.toLowerCase(),
  });

  if (existingEmailAdmin) {
    await adminUsers.updateOne(
      { _id: existingEmailAdmin._id },
      {
        $set: {
          role: "ADMIN",
          seedAdmin: true,
          updatedAt: new Date(),
        },
      }
    );

    return {
      ...existingEmailAdmin,
      role: "ADMIN" as const,
      seedAdmin: true,
    };
  }

  const now = new Date();
  const seedAdmin = {
    email: SEED_ADMIN_EMAIL.toLowerCase(),
    passwordHash: hashPassword(SEED_ADMIN_PASSWORD),
    role: "ADMIN" as const,
    seedAdmin: true,
    createdAt: now,
    updatedAt: now,
  };

  const result = await adminUsers.insertOne(seedAdmin);

  return {
    _id: result.insertedId,
    ...seedAdmin,
  };
};
