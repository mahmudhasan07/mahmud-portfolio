import { Db, MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

type MongoGlobal = typeof globalThis & {
  mongoClientPromise?: Promise<MongoClient>;
};

const globalForMongo = globalThis as MongoGlobal;

export const getMongoClient = () => {
  if (!uri) {
    throw new Error("MONGODB_URI is missing from environment variables.");
  }

  if (!globalForMongo.mongoClientPromise) {
    const client = new MongoClient(uri);
    globalForMongo.mongoClientPromise = client.connect();
  }

  return globalForMongo.mongoClientPromise;
};

export const getDatabase = async (): Promise<Db> => {
  const client = await getMongoClient();
  return client.db();
};
