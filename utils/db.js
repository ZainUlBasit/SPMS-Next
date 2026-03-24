import mongoose from "mongoose";

/**
 * Reuse a single Mongoose connection across Next.js / Vercel serverless invocations.
 * Without this, cold starts often pay the full MongoDB handshake cost on every request.
 *
 * Note: `useNewUrlParser` / `useUnifiedTopology` were removed in MongoDB Node.js Driver v4+.
 */
const globalForMongoose = globalThis;

if (!globalForMongoose.mongooseCache) {
  globalForMongoose.mongooseCache = { conn: null, promise: null };
}

const mongooseCache = globalForMongoose.mongooseCache;

async function connectDB() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  if (mongooseCache.conn) {
    return mongooseCache.conn;
  }

  if (!mongooseCache.promise) {
    mongooseCache.promise = mongoose
      .connect(uri, {
        // Serverless-friendly defaults; tune via URI query params if needed.
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10_000,
      })
      .then((m) => m);
  }

  try {
    mongooseCache.conn = await mongooseCache.promise;
  } catch (err) {
    mongooseCache.promise = null;
    mongooseCache.conn = null;
    console.error("MongoDB connection error:", err);
    throw err;
  }

  return mongooseCache.conn;
}

export default connectDB;
