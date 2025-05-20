import mongoose, { Mongoose } from "mongoose";


const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error(
    "Please define the MONGO_URI environment variable inside .env.local"
  );
}
interface MongooseCache {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoogse: MongooseCache;
}

let cached = global.mongoogse;

if (!cached) {
  cached = global.mongoogse = { conn: null, promise: null };
}

const dbConnet = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI, {
        dbName: "DevFlow",
      })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw new Error("Failed to connect to MongoDB", error);
        throw error;
      });
  }
  cached.conn = await cached.promise;

  return cached.conn;
};

export default dbConnet;
